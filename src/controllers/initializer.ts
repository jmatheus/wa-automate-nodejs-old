
/** @ignore */
const fs = require('fs'),
boxen = require('boxen'),
configWithCases = require('../../bin/config-schema.json'),
updateNotifier = require('update-notifier'),
pkg = require('../../package.json'),
timeout = ms => {
  return new Promise(resolve => setTimeout(resolve, ms, 'timeout'));
}
import { Client } from '../api/Client';
import { ConfigObject } from '../api/model/index';
import * as path from 'path';
import { isInsideChat, retrieveQR, phoneIsOutOfReach, isAuthenticated } from './auth';
import { initClient, injectApi } from './browser';
import { Spin, ev } from './events'
import { integrityCheck, checkWAPIHash } from './launch_checks';
import treekill from 'tree-kill';
import CFonts from 'cfonts';
import { popup } from './popup';
import { getConfigFromProcessEnv } from '../utils/tools';
import { SessionInfo } from '../api/model/sessionInfo';
/** @ignore */
let shouldLoop = true,
qrDelayTimeout,
axios;

/**
 * Should be called to initialize whatsapp client.
 * *Note* You can send all params as a single object with the new [ConfigObject](https://open-wa.github.io/wa-automate-nodejs/interfaces/configobject.html) that includes both [sessionId](https://open-wa.github.io/wa-automate-nodejs/interfaces/configobject.html#sessionId) and [customUseragent](ttps://open-wa.github.io/wa-automate-nodejs/interfaces/configobject.html#customUseragent).
 * 
 * e.g
 * 
 * ```javascript
 * create({
 * sessionId: 'main',
 * customUserAgent: ' 'WhatsApp/2.16.352 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Safari/605.1.15',
 * blockCrashLogs true,
 * ...
 * })....
 * ```
 * @param sessionId [string | ConfigObject ]Custom id for the session, every phone should have it's own sessionId. THIS CAN BE THE CONFIG OBJECT INSTEAD
 * @param config The extended custom configuration
 * @param customUserAgent A custom user agent to set on the browser page.
 */
//export async function create(sessionId?: string, config?:ConfigObject, customUserAgent?:string) {
//@ts-ignore
export async function create(_sessionId?: string | ConfigObject, config?: ConfigObject, customUserAgent?: string): Promise<Client> {
  const START_TIME = Date.now();
  let waPage = undefined;
  let notifier;
  let sessionId : string = '';
  if (typeof _sessionId === 'object' && (_sessionId as ConfigObject)) {
    config = _sessionId;
  } else if(typeof _sessionId === 'string') {
    sessionId = _sessionId;
  } else if(!_sessionId) {
    config = {}
  }

  if(!config?.skipUpdateCheck || config?.keepUpdated) {
    notifier = await updateNotifier({
      pkg,
      updateCheckInterval: 0
    });
    notifier.notify();
    if(notifier?.update && config?.keepUpdated) {
      console.log('UPDATING @OPEN-WA')
      const result = require('cross-spawn').spawn.sync('npm', ['i', '@open-wa/wa-automate'], { stdio: 'inherit' });
      if(!result.stderr) {
          console.log('UPDATED SUCCESSFULLY')
      }
      console.log('RESTARTING PROCESS')
      process.on("exit", function () {
        require('cross-spawn').spawn(process.argv.shift(), process.argv, {
            cwd: process.cwd(),
            detached : true,
            stdio: "inherit"
        });
    });
    process.exit();
    }
  }

  if(config?.inDocker) {
    //try to infer config variables from process.env
    config = {
      ...config,
      ...getConfigFromProcessEnv(configWithCases)
  }
  config.chromiumArgs = config?.chromiumArgs || [];
  customUserAgent = config.customUserAgent;
  }
  if(sessionId ===  '' || config?.sessionId) sessionId = config?.sessionId || 'session';

  const prettyFont = CFonts.render(('@OPEN-WA|WHATSAPP|AUTOMATOR'), {
    font: '3d',
    color: 'candy',
    align: 'center',
    gradient: ["red","#f80"],
    lineHeight: 3
  });

  console.log(config?.disableSpins ? boxen([
    `@open-wa/wa-automate   `,
    `${pkg.description}`, //.replace(' 💬 🤖 ','')
    `Version: ${pkg.version}   `,
    `Check out the latest changes: https://github.com/open-wa/wa-automate-nodejs#latest-changes   `,
  ].join('\n'), {padding: 1, borderColor: 'yellow', borderStyle: 'bold'}) : prettyFont.string)
  
  if(config?.popup) {
    const popupaddr = await popup(config);
    console.log(`You can also authenticate the session at: ${popupaddr}`)
  }
  if (!sessionId) sessionId = 'session';
  const spinner = new Spin(sessionId, 'STARTUP', config?.disableSpins);
  try {
    qrDelayTimeout = undefined;
    shouldLoop = true;
    ev.on('AUTH.**', (isAuthenticated, sessionId) => shouldLoop = false);
    spinner.start('Initializing WA');
    waPage = await initClient(sessionId, config, customUserAgent);
    spinner.succeed('Browser Launched');
    const throwOnError = config && config.throwErrorOnTosBlock == true;

    const PAGE_UA = await waPage.evaluate('navigator.userAgent');
    const BROWSER_VERSION = await waPage.browser().version();
    //waPage
    //.on('console', message => console.log(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`))
    //.on('pageerror', ({ message }) => console.log(message))
    //.on('response', response => console.log(`${response.status()} ${response.url()}`))
    //.on('requestfailed', request => console.log(`${request.failure().errorText} ${request.url()}`))

    const WA_AUTOMATE_VERSION = `${pkg.version}${notifier?.update ? ` UPDATE AVAILABLE: ${notifier?.update.latest}` : ''}`;
    //@ts-ignore
    const WA_VERSION = await waPage.evaluate(() => window.Debug ? window.Debug.VERSION : 'I think you have been TOS_BLOCKed')
    //@ts-ignore
    const canInjectEarly = await waPage.evaluate(() => { return (typeof webpackJsonp !== "undefined") });
    let debugInfo : SessionInfo = {
      WA_VERSION,
      PAGE_UA,
      WA_AUTOMATE_VERSION,
      BROWSER_VERSION
    };
    console.table(debugInfo);

    if (canInjectEarly) {
      spinner.start('Injecting api');
      waPage = await injectApi(waPage);
      spinner.start('WAPI injected');
    } else {
      spinner.remove();
      if (throwOnError) throw Error('TOSBLOCK');
    }

    spinner.start('Authenticating');
    const authRace = [];
    authRace.push(isAuthenticated(waPage))
    if (config?.authTimeout) {
      authRace.push(timeout(config.authTimeout * 1000))
    }

    const authenticated = await Promise.race(authRace);

    if (authenticated == 'timeout') {
      const outOfReach = await phoneIsOutOfReach(waPage);
      spinner.emit(outOfReach ? 'appOffline' : 'authTimeout');
      spinner.fail(outOfReach ? 'Authentication timed out. Please open the app on the phone. Shutting down' : 'Authentication timed out. Shutting down. Consider increasing authTimeout config variable: https://open-wa.github.io/wa-automate-nodejs/interfaces/configobject.html#authtimeout');
      await kill(waPage);
      throw new Error(outOfReach ? 'App Offline' : 'Auth Timeout. Consider increasing authTimeout config variable: https://open-wa.github.io/wa-automate-nodejs/interfaces/configobject.html#authtimeout');
    }

    let autoRefresh = config ? config.autoRefresh : false;
    let qrLogSkip = config ? config.qrLogSkip : false;

    const qrLoop = async () => {
      if (!shouldLoop) return;
      console.log(' ')
      await retrieveQR(waPage, sessionId, autoRefresh, throwOnError, qrLogSkip, config?.qrFormat, config?.qrQuality);
      console.log(' ')
      qrDelayTimeout = timeout((config ? (config.qrRefreshS || 10) : 10) * 1000);
      await qrDelayTimeout;
      if (autoRefresh) qrLoop();
    };

    if (authenticated) {
      spinner.succeed('Authenticated');
    } else {
      spinner.info('Authenticate to continue');
      const qrSpin = new Spin(sessionId, 'QR');
      qrSpin.start('Loading QR');
      qrSpin.succeed();
      qrLoop();
      const race = [];
      race.push(isInsideChat(waPage).toPromise());
      if (config?.qrTimeout) {
        race.push(timeout(config.qrTimeout * 1000))
      }
      const result = await Promise.race(race);
      if (result == 'timeout') {
        spinner.emit('qrTimeout');
        spinner.fail('QR scan took too long. Session Timed Out. Shutting down. Consider increasing qrTimeout config variable: https://open-wa.github.io/wa-automate-nodejs/interfaces/configobject.html#qrtimeout');
        await kill(waPage);
        throw new Error('QR Timeout');
      }
      qrSpin.emit('successfulScan');
      shouldLoop = false;
      clearTimeout(qrDelayTimeout);
      spinner.succeed();
    }
    const pre = canInjectEarly ? 'Rei' : 'I';
    spinner.start(`${pre}njecting api`);
    waPage = await injectApi(waPage);
    spinner.succeed(`WAPI ${pre}njected`);

    if (canInjectEarly) {
      //check if page is valid after 5 seconds
      spinner.start('Checking if session is valid');
      if(config?.safeMode) await timeout(5000);
    }
    //@ts-ignore
    const VALID_SESSION = await waPage.evaluate(() => window.Store && window.Store.Msg ? true : false);
    if (VALID_SESSION) {
      spinner.succeed('Client is ready');
      const localStorage = JSON.parse(await waPage.evaluate(() => {
        return JSON.stringify(window.localStorage);
      }));
      const sessionjsonpath = (config?.sessionDataPath && config?.sessionDataPath.includes('.data.json')) ? path.join(path.resolve(process.cwd(),config?.sessionDataPath || '')) : path.join(path.resolve(process.cwd(),config?.sessionDataPath || ''), `${sessionId || 'session'}.data.json`);
      const sessionData = {
        WABrowserId: localStorage.WABrowserId,
        WASecretBundle: localStorage.WASecretBundle,
        WAToken1: localStorage.WAToken1,
        WAToken2: localStorage.WAToken2
      };
      const sdB64 = Buffer.from(JSON.stringify(sessionData)).toString('base64');

      spinner.emit(sessionData, "sessionData");
      spinner.emit(sdB64, "sessionDataBase64");

      if(!config?.skipSessionSave) fs.writeFile(sessionjsonpath, sdB64, (err) => {
        if (err) { console.error(err); return; };
      });
      if (config?.logConsole) waPage.on('console', msg => console.log(msg));
      if (config?.logConsoleErrors) waPage.on('error', error => console.log(error));
      if (config?.restartOnCrash) waPage.on('error', async error => {
        console.error('Page Crashed! Restarting...', error);
        await kill(waPage);
        await create(sessionId, config, customUserAgent).then(config.restartOnCrash);
      });
      const pureWAPI = await checkWAPIHash();
      if(!pureWAPI) {
        config.skipBrokenMethodsCheck = true;
        // config.skipPatches = true;
      }
      debugInfo.NUM = await waPage.evaluate(`(window.localStorage['last-wid'] || '').replace('@c.us','').replace(/"/g,"").slice(-4)`);
      if (config?.skipBrokenMethodsCheck !== true) await integrityCheck(waPage, notifier, spinner, debugInfo);
      const LAUNCH_TIME_MS = Date.now() - START_TIME;
      debugInfo = {...debugInfo, LAUNCH_TIME_MS};
      spinner.emit(debugInfo, "DebugInfo");
      spinner.succeed(`Client loaded in ${LAUNCH_TIME_MS/1000}s`);
      if(config?.hostNotificationLang){
        await waPage.evaluate(`window.hostlang="${config.hostNotificationLang}"`)
      }
      //patch issues with wapi.js
      if (!config?.skipPatches){
        spinner.info('Installing patches')
        if(!axios) axios = await import('axios');
        const { data } = await axios.get(pkg.patches);
        await Promise.all(data.map(patch => waPage.evaluate(`${patch}`)))
        spinner.succeed('Patches Installed')
      }
      const client = new Client(waPage, config, debugInfo);
      spinner.succeed(`🚀 @OPEN-WA ready`);
      spinner.emit('SUCCESS');
      return client;
    }
    else {
      spinner.fail('The session is invalid. Retrying')
      await kill(waPage)
      return await create(sessionId, config, customUserAgent);
    }
  } catch (error) {
    spinner.emit(error.message);
    await kill(waPage);
    spinner.remove();
    throw error;
  }
}
/**
 * @internal
 */
const kill = async (p) => {
  shouldLoop = false;
  if (qrDelayTimeout) clearTimeout(qrDelayTimeout);
  if (p) {
    const browser = await p.browser();
    const pid = browser.process() ? browser?.process().pid : null;
    if (!p.isClosed()) await p.close();
    if (browser) await browser.close();
    if(pid) treekill(pid, 'SIGKILL')
  }
}
