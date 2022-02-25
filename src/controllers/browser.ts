 /**
  * @hidden
  */
/** */
import * as path from 'path';
const fs = require('fs');
const puppeteer = require('puppeteer-extra');
import { puppeteerConfig, useragent, width, height} from '../config/puppeteer.config';
import { Browser, Page } from 'puppeteer';
import { Spin, EvEmitter } from './events';
import { ConfigObject } from '../api/model';
const ON_DEATH = require('death'); //this is intentionally ugly
let browser;

export async function initClient(sessionId?: string, config?:ConfigObject, customUserAgent?:string) {
  if(config?.useStealth) puppeteer.use(require('puppeteer-extra-plugin-stealth')());
  browser = await initBrowser(sessionId,config);
  const waPage = await getWAPage(browser);

  if (config?.proxyServerCredentials) {
    await waPage.authenticate(config.proxyServerCredentials);
  }
  await waPage.setUserAgent(customUserAgent||useragent);
  await waPage.setViewport({
    width: config?.viewport?.width || width,
    height: config?.viewport?.height || height,
    deviceScaleFactor: 1
  });
  const cacheEnabled = config?.cacheEnabled === false ? false : true;
  const blockCrashLogs = config?.blockCrashLogs === false ? false : true;
  await waPage.setBypassCSP(config?.bypassCSP || false);
  await waPage.setCacheEnabled(cacheEnabled);
  const blockAssets = !config?.headless ? false : config?.blockAssets || false;
  if(blockAssets){
    puppeteer.use(require('puppeteer-extra-plugin-block-resources')({
      blockedTypes: new Set(['image', 'stylesheet', 'font'])
    }))
  }

  const interceptAuthentication = !(config?.safeMode);
  const proxyAddr = config?.proxyServerCredentials ? `${config.proxyServerCredentials?.username && config.proxyServerCredentials?.password ? `${config.proxyServerCredentials.protocol || 
    config.proxyServerCredentials.address.includes('https') ? 'https' : 
    config.proxyServerCredentials.address.includes('http') ? 'http' : 
    config.proxyServerCredentials.address.includes('socks5') ? 'socks5' : 
    config.proxyServerCredentials.address.includes('socks4') ? 'socks4' : 'http'}://${config.proxyServerCredentials.username}:${config.proxyServerCredentials.password}@${config.proxyServerCredentials.address
    .replace('https', '')
    .replace('http', '')
    .replace('socks5', '')
    .replace('socks4', '')
    .replace('://', '')}` : config.proxyServerCredentials.address}` : false;
  let quickAuthed = false;
  if(interceptAuthentication || proxyAddr || blockCrashLogs){
    await waPage.setRequestInterception(true);  
    let authCompleteEv = new EvEmitter(sessionId, 'AUTH');
    waPage.on('request', async request => {
      if (
        interceptAuthentication &&
        request.url().includes('_priority_components') &&
        !quickAuthed
      ) {
        authCompleteEv.emit(true);
        await waPage.evaluate('window.WA_AUTHENTICATED=true;');
        quickAuthed = true;
      }
    if (request.url().includes('https://crashlogs.whatsapp.net/') && blockCrashLogs){
      request.abort();
    }
    else if (proxyAddr) require('puppeteer-page-proxy')(request, proxyAddr);
    else request.continue();
    })
  }

  if (config?.multidevice) {
    const folderSession: string = path.join(
      path.resolve(
        process.cwd(),
        config?.mkdirFolderToken,
        config?.folderNameToken,
        sessionId
      )
    );

    const folderMulidevice = path.join(
      path.resolve(
        process.cwd(),
        config?.mkdirFolderToken,
        config?.folderNameToken
      )
    );

    if (!fs.existsSync(folderMulidevice)) {
      fs.mkdirSync(folderMulidevice, {
        recursive: true
      });
    }

    fs.chmodSync(folderMulidevice, '777');

    config.puppeteerOptions = {
      userDataDir: folderSession
    };

    puppeteerConfig.chromiumArgs.push(`--user-data-dir=${folderSession}`);
  }

  //check if [session].json exists in __dirname
  const sessionjsonpath = (config?.sessionDataPath && config?.sessionDataPath.includes('.data.json')) ? path.join(path.resolve(process.cwd(),config?.sessionDataPath || '')) : path.join(path.resolve(process.cwd(),config?.sessionDataPath || ''), `${sessionId || 'session'}.data.json`);
  let sessionjson = '';
  let sd = process.env[`${sessionId.toUpperCase()}_DATA_JSON`] ? JSON.parse(process.env[`${sessionId.toUpperCase()}_DATA_JSON`]) : config?.sessionData;
  sessionjson = (typeof sd === 'string') ? JSON.parse(Buffer.from(sd, 'base64').toString('ascii')) : sd;
  if (fs.existsSync(sessionjsonpath)) {
    let s = fs.readFileSync(sessionjsonpath, "utf8");
    try {
      sessionjson = JSON.parse(s);
    } catch (error) {
      sessionjson = JSON.parse(Buffer.from(s, 'base64').toString('ascii'));
    }
  }
  if(sessionjson) await waPage.evaluateOnNewDocument(
    session => {
        localStorage.clear();
        Object.keys(session).forEach(key=>localStorage.setItem(key,session[key]));
    }, sessionjson);
    if(config?.proxyServerCredentials) {
      await require('puppeteer-page-proxy')(waPage, proxyAddr);
      console.log(`Active proxy: ${config.proxyServerCredentials.address}`)
    }
  await waPage.goto(puppeteerConfig.WAUrl)
  return waPage;
}

export async function injectApi(page: Page) {
  await page.addScriptTag({
    path: require.resolve(path.join(__dirname, '../lib', 'wapi.js'))
  });
  await page.addScriptTag({
    path: require.resolve(path.join(__dirname, '../lib', 'axios.min.js'))
  });
  await page.addScriptTag({
    path: require.resolve(path.join(__dirname, '../lib', 'jsSha.min.js'))
  });
  await page.addScriptTag({
    path: require.resolve(path.join(__dirname, '../lib', 'base64.js'))
  });
  return page;
}

async function initBrowser(sessionId?: string, config:any={}) {
  if(config?.useChrome && !config?.executablePath) {
    const storage = require('node-persist');
    await storage.init();
    let _savedPath = await storage.getItem('executablePath');
    if(!_savedPath) {
      config.executablePath = require('chrome-launcher').Launcher.getInstallations()[0];
      await storage.setItem('executablePath',config.executablePath)
    } else config.executablePath = _savedPath;
  }

  if(config?.browserRevision) {
    const browserFetcher = puppeteer.createBrowserFetcher();
    const browserDownloadSpinner = new Spin(sessionId+'_browser', 'Browser',false,false);
    try {
      browserDownloadSpinner.start('Downloading browser revision: ' + config.browserRevision);
      const revisionInfo = await browserFetcher.download(config.browserRevision, function(downloadedBytes,totalBytes){
      browserDownloadSpinner.info(`Downloading Browser: ${Math.round(downloadedBytes/1000000)}/${Math.round(totalBytes/1000000)}`);
      });
      if(revisionInfo.executablePath) {
        config.executablePath = revisionInfo.executablePath;
        // config.pipe = true;
      }
      browserDownloadSpinner.succeed('Browser downloaded successfully');
    } catch (error){
      browserDownloadSpinner.succeed('Something went wrong while downloading the browser');
    }
  }
  
  // if(config?.proxyServerCredentials?.address) puppeteerConfig.chromiumArgs.push(`--proxy-server=${config.proxyServerCredentials.address}`)
  if(config?.browserWsEndpoint) config.browserWSEndpoint = config.browserWsEndpoint;
  //devtools
  if(config&&config.devtools){
    const devtools = require('puppeteer-extra-plugin-devtools')();
    if(config.devtools.user&&config.devtools.pass) devtools.setAuthCredentials(config.devtools.user, config.devtools.pass)
    try {
      // const tunnel = await devtools.createTunnel(browser);
      const tunnel = devtools.getLocalDevToolsUrl(browser);
      console.log('\ndevtools URL: '+tunnel);
    } catch (error) {
    console.log("TCL: initBrowser -> error", error)
    }
  }
  return browser;
}

async function getWAPage(browser: Browser) {
  const pages = await browser.pages();
  console.assert(pages.length > 0);
  return pages[0];
}

ON_DEATH(async (signal, err) => {
  //clean up code here
  if (browser) await browser.close();
});
