/**
 * This script contains WAPI functions that need to be run in the context of the webpage
 */

/**
 * Auto discovery the webpack object references of instances that contains all functions used by the WAPI
 * functions and creates the Store object.
 */

if (!window.Store||!window.Store.Msg) {
  (function () {
    function getStore(modules){
      let foundCount = 0;
      let neededObjects = [
        {
    id: 'Store',
    conditions: (module) =>
      module.default && module.default.Chat && module.default.Msg
        ? module.default
        : null
  },
  {
    id: 'MediaCollection',
    conditions: (module) =>
      module.default &&
      module.default.prototype &&
      (module.default.prototype.processFiles !== undefined ||
        module.default.prototype.processAttachments !== undefined)
        ? module.default
        : null
  },
  { id: 'MediaProcess', conditions: (module) => (module.BLOB ? module : null) },
  {
    id: 'ChatUtil',
    conditions: (module) => (module.sendClear ? module : null)
  },
  {
    id: 'GroupInvite',
    conditions: (module) =>
      module.sendQueryGroupInviteCode && module.sendRevokeGroupInviteCode
        ? module
        : null
  },
  {
    id: 'Wap',
    conditions: (module) => (module.createGroup ? module : null)
  },
  {
    id: 'ServiceWorker',
    conditions: (module) =>
      module.default && module.default.killServiceWorker ? module : null
  },
  {
    id: 'State',
    conditions: (module) => (module.Socket ? module : null)
  },
  {
    id: 'WapDelete',
    conditions: (module) =>
      module.sendConversationDelete && module.sendConversationDelete.length == 2
        ? module
        : null
  },
  {
    id: 'Conn',
    conditions: (module) =>
      module.default && module.default.ref && module.default.refTTL
        ? module.default
        : null
  },
  {
    id: 'WapQuery',
    conditions: (module) =>
      module.default &&
      //module.default.contactFindQuery &&
      module.default.queryExist &&
      module.default.getCapabilities
        ? module.default
        : null
  },
  {
    id: 'CryptoLib',
    conditions: (module) => (module.decryptE2EMedia ? module : null)
  },
  {
    id: 'OpenChat',
    conditions: (module) =>
      module.default &&
      module.default.prototype &&
      module.default.prototype.openChat
        ? module.default
        : null
  },
  {
    id: 'UserConstructor',
    conditions: (module) =>
      module.default &&
      module.default.prototype &&
      module.default.prototype.isServer &&
      module.default.prototype.isUser
        ? module.default
        : null
  },
  {
    id: 'SendTextMsgToChat',
    conditions: (module) =>
      module.sendTextMsgToChat ? module.sendTextMsgToChat : null
  },
  {
    id: 'SendSeen',
    conditions: (module) => (module.sendSeen ? module.sendSeen : null)
  },
  {
    id: 'Archive',
    conditions: (module) => (module.setArchive ? module : null)
  },
  {
    id: 'pinChat',
    conditions: (module) => (module.setPin ? module : null)
  },
  {
    id: 'sendDelete',
    conditions: (module) => (module.sendDelete ? module.sendDelete : null)
  },
  {
    id: 'addAndSendMsgToChat',
    conditions: (module) =>
      module.addAndSendMsgToChat ? module.addAndSendMsgToChat : null
  },
  {
    id: 'sendMsgToChat',
    conditions: (module) => (module.sendMsgToChat ? module.sendMsgToChat : null)
  },
  {
    id: 'Catalog',
    conditions: (module) => (module.Catalog ? module.Catalog : null)
  },
  {
    id: 'Perfil',
    conditions: (module) =>
      module.__esModule === true &&
      module.setPushname &&
      !module.getComposeContents
        ? module
        : null
  },
  {
    id: 'MsgKey',
    conditions: (module) =>
      module.default &&
      module.default.toString &&
      typeof module.default.toString === 'function' &&
      module.default.toString().includes('MsgKey error: obj is null/undefined')
        ? module.default
        : null
  },
  {
    id: 'Parser',
    conditions: (module) =>
      module.convertToTextWithoutSpecialEmojis ? module.default : null
  },
  {
    id: 'Builders',
    conditions: (module) =>
      module.TemplateMessage && module.HydratedFourRowTemplate ? module : null
  },
  {
    id: 'Me',
    conditions: (module) =>
      module.PLATFORMS && module.Conn ? module.Conn : null,
  },
  {
    id: 'CallUtils',
    conditions: (module) =>
      module.sendCallEnd && module.parseCall ? module : null
  },
  {
    id: 'Identity',
    conditions: (module) =>
      module.queryIdentity && module.updateIdentity ? module : null
  },
  {
    id: 'MyStatus',
    conditions: (module) =>
      module.getStatus && module.setMyStatus ? module : null
  },
  {
    id: 'ChatState',
    conditions: (module) =>
      module.sendChatStatePaused &&
      module.sendChatStateRecording &&
      module.sendChatStateComposing
        ? module
        : null
  },
  {
    id: 'sendDeleteMsgs',
    conditions: (module) =>
      module.sendDeleteMsgs ? module.sendDeleteMsgs : null
  },
  {
    id: 'GroupActions',
    conditions: (module) =>
      module.sendExitGroup && module.localExitGroup ? module : null
  },
  {
    id: 'Features',
    conditions: (module) =>
      module.FEATURE_CHANGE_EVENT && module.features ? module : null
  },
  {
    id: 'MessageUtils',
    conditions: (module) =>
      module.storeMessages && module.appendMessage ? module : null
  },
  {
    id: 'WebMessageInfo',
    conditions: (module) =>
      module.WebMessageInfo && module.WebFeatures ? module.WebMessageInfo : null
  },
  {
    id: 'createMessageKey',
    conditions: (module) =>
      module.createMessageKey && module.createDeviceSentMessage
        ? module.createMessageKey
        : null
  },
  {
    id: 'Participants',
    conditions: (module) =>
      module.addParticipants &&
      module.removeParticipants &&
      module.promoteParticipants &&
      module.demoteParticipants
        ? module
        : null
  },
  {
    id: 'WidFactory',
    conditions: (module) =>
      module.isWidlike && module.createWid && module.createWidFromWidLike
        ? module
        : null
  },
  {
    id: 'Base',
    conditions: (module) =>
      module.setSubProtocol && module.binSend && module.actionNode
        ? module
        : null
  },
  {
    id: 'Base2',
    conditions: (module) =>
      module.supportsFeatureFlags &&
      module.parseMsgStubProto &&
      module.binSend &&
      module.subscribeLiveLocation
        ? module
        : null
  },
  {
    id: 'Sticker',
    conditions: (module) =>
      module.StickerCollection && module.default ? module : null
  },
  {
    id: 'MediaObject',
    conditions: (module) =>
      module.getOrCreateMediaObject && module.disassociateMediaFromStickerPack
        ? module
        : null
  },
  {
    id: 'MediaUpload',
    conditions: (module) =>
      module.default && module.default.mediaUpload ? module.default : null
  },
  {
    id: 'UploadUtils',
    conditions: (module) =>
      module.default && module.default.encryptAndUpload ? module.default : null
  },
  {
    id: 'Cmd',
    conditions: (module) =>
      module.default && module.default.openChatFromUnread ? module : null
  },
  {
    id: 'ReadSeen',
    conditions: (module) => (module.sendSeen ? module : null)
  },
  {
    id: 'Block',
    conditions: (module) =>
      module.blockContact && module.unblockContact ? module : null
  },
  {
    id: 'BlockList',
    conditions: (module) => (module.BlocklistCollection ? module : null)
  },
  {
    id: 'Theme',
    conditions: (module) => (module.getTheme && module.setTheme ? module : null)
  },
  {
    id: 'Vcard',
    conditions: (module) => (module.vcardFromContactModel ? module : null)
  },
  {
    id: 'Profile',
    conditions: (module) =>
      module.sendSetPicture && module.requestDeletePicture ? module : null
  },
  {
    id: 'SendMute',
    conditions: (module) => (module.sendConversationMute ? module : null)
  },
  {
    id: 'Validators',
    conditions: (module) => (module.findLinks ? module : null)
  },
  {
    id: 'Wap2',
    conditions: (module) => (module.Wap ? module : null)
  },
  {
    id: 'genId',
    conditions: (module) =>
      module.default &&
      typeof module.default === 'function' &&
      module.default.toString().match(/crypto/)
        ? module
        : null
  },
  {
    id: 'GroupMetadata',
    conditions: (module) =>
      module.default && module.default.handlePendingInvite ? module : null
  },
  {
    id: 'i10n',
    conditions: (module) =>
      module.default && module.default.downloadAppLocale ? module.default : null
  },
  {
    id: 'NetworkStatus',
    conditions: (module) =>
      module.default && module.default._logOnlineOffline ? module.default : null
  },
  {
    id: 'Stream',
    conditions: (module) =>
      module.default && module.default.unobscure ? module.default : null
  },
  {
    id: 'ws2',
    conditions: (module) =>
      module.default && module.default.destroyStorage ? module.default : null
  },
  {
    id: 'Login',
    conditions: (module) => (module.startLogout ? module : null),
  },
  {
    id: 'BlobCache',
    conditions: (module) =>
      module.default && module.default.getOrCreateURL ? module.default : null
  },
  {
    id: 'infoGroup',
    conditions: (module) => (module.queryGroupInviteInfo ? module : null)
  },
  {
    id: 'GroupDesc',
    conditions: (module) => (module.setGroupDesc ? module : null)
  },
  {
    id: 'GroupTitle',
    conditions: (module) => (module.sendSetGroupSubject ? module : null)
  },
  {
    id: 'GroupSettings',
    conditions: (module) => (module.sendSetGroupProperty ? module : null)
  },
  {
    id: 'MaybeMeUser',
    conditions: (module) => (module.getMaybeMeUser ? module : null)
  },
  {
    id: 'sendCreateGroup',
    conditions: (module) =>
      module.sendCreateGroup ? module.sendCreateGroup : null
  },
  {
    id: 'sendAddParticipants',
    conditions: (module) =>
      module.sendAddParticipants ? module.sendAddParticipants : null
  },
  {
    id: 'sendRemoveParticipants',
    conditions: (module) =>
      module.sendRemoveParticipants ? module.sendRemoveParticipants : null
  },
  {
    id: 'sendPromoteParticipants',
    conditions: (module) =>
      module.sendPromoteParticipants ? module.sendPromoteParticipants : null
  },
  {
    id: 'sendDemoteParticipants',
    conditions: (module) =>
      module.sendDemoteParticipants ? module.sendDemoteParticipants : null
  },
  {
    id: 'checkNumberBeta',
    conditions: (module) =>
      module.default &&
      typeof module.default.toString === 'function' &&
      module.default.toString().includes('Should not reach queryExists MD')
        ? module.default
        : null,
  },
  {
    id: 'checkNumber',
    conditions: (module) =>
      module.default && module.default.queryExist ? module.default : null,
  },
      ];
      window.neededObjects = neededObjects;
      window.neededModuleFound = [];
      for (let idx in modules) {
        if ((typeof modules[idx] === "object") && (modules[idx] !== null)) {
          neededObjects.forEach((needObj) => {
            if (!needObj.conditions || needObj.foundedModule)
              return;
            let neededModule = needObj.conditions(modules[idx]);
            if (neededModule !== null) {
              window.neededModuleFound.push(needObj.id)
              foundCount++;
              needObj.foundedModule = neededModule;
            }
          });

          if (foundCount == neededObjects.length) {
            break;
          }
        }
      }

      let neededStore = neededObjects.find((needObj) => needObj.id === "Store");
      window.storis = neededStore;
      window.Store = neededStore.foundedModule ? neededStore.foundedModule : {};
      neededObjects.splice(neededObjects.indexOf(neededStore), 1);
      neededObjects.forEach((needObj) => {
        if (needObj.foundedModule) {
          window.Store[needObj.id] = needObj.foundedModule;
        }
      });

      window.Store.sendMessage = function (e) {
        return window.Store.SendTextMsgToChat(this, ...arguments);
      }

      if(window.Store.MediaCollection) window.Store.MediaCollection.prototype.processFiles = window.Store.MediaCollection.prototype.processFiles || window.Store.MediaCollection.prototype.processAttachments;
      return window.Store;
    }

    const parasite = `parasite${Date.now()}`
    webpackChunkwhatsapp_web_client.push([
      [parasite],
      {},
      (o, e, t) => {
        let modules=[];
        for(let idx in o.m) {
          let module = o(idx);
          modules.push(module);
        }
        window.wa_modules = modules;
        getStore(modules);
      }
    ]);

    if (!Store.Chat._find) {
      Store.Chat._findAndParse = Store.BusinessProfile._findAndParse;
      Store.Chat._find = Store.BusinessProfile._find;
    }
  })();
}

window.WAPI = {};
window._WAPI = {};

window.WAPI._serializeRawObj = (obj) => {
  if (obj && obj.toJSON) {
    return obj.toJSON();
  }
  return {}
};

window.WAPI.isMultiDeviceVersion = function() {
  return Store.FeatureChecker.default.supportsFeature(Store.FeatureChecker.default.F.MD_BACKEND);
}

window.WAPI.getMyChatId = () => {
  return Store.MaybeMeUser.getMaybeMeUser();
}

/**
 * Serializes a chat object
 *
 * @param rawChat Chat object
 * @returns {{}}
 */

window.WAPI._serializeChatObj = (obj) => {
  if (obj == undefined) {
    return null;
  }
  return Object.assign(window.WAPI._serializeRawObj(obj), {
    id: obj.id._serialized,
    kind: obj.kind,
    isGroup: obj.isGroup,
    formattedTitle: obj.formattedTitle,
    contact: obj['contact'] ? window.WAPI._serializeContactObj(obj['contact']) : null,
    groupMetadata: obj["groupMetadata"] ? window.WAPI._serializeRawObj(obj["groupMetadata"]) : null,
    presence: obj["presence"] ? window.WAPI._serializeRawObj(obj["presence"]) : null,
    msgs: null
  });
};

window.WAPI._serializeContactObj = (obj) => {
  if (obj == undefined) {
    return null;
  }
  return Object.assign(window.WAPI._serializeRawObj(obj), {
    id: obj.id._serialized,
    formattedName: obj.formattedName,
    displayName: obj.displayName,
    isHighLevelVerified: obj.isHighLevelVerified,
    isMe: obj.isMe,
    isMyContact: obj.isMyContact,
    isPSA: obj.isPSA,
    isUser: obj.isUser,
    isVerified: obj.isVerified,
    isWAContact: obj.isWAContact,
    profilePicThumbObj: obj.profilePicThumb ? WAPI._serializeProfilePicThumb(obj.profilePicThumb) : {},
    statusMute: obj.statusMute,
    msgs: null
  });
};


window.WAPI._serializeMessageObj = (obj) => {
  if (obj == undefined) {
    return null;
  }
  const _chat = obj['chat'] ? WAPI._serializeChatObj(obj['chat']) : {};
  if(obj.quotedMsg) obj.quotedMsgObj();
  return Object.assign(window.WAPI._serializeRawObj(obj), {
    id: obj.id._serialized,
    from: obj.from._serialized,
    quotedParticipant: obj.quotedParticipant? obj.quotedParticipant._serialized ? obj.quotedParticipant._serialized : undefined : undefined,
    author: obj.author? obj.author._serialized ? obj.author._serialized : undefined : undefined,
    chatId: obj.chatId? obj.chatId._serialized ? obj.chatId._serialized : undefined : undefined,
    to: obj.to? obj.to._serialized ? obj.to._serialized : undefined : undefined,
    fromMe: obj.id.fromMe,
    sender: obj["senderObj"] ? WAPI._serializeContactObj(obj["senderObj"]) : null,
    timestamp: obj["t"],
    content: obj["body"],
    isGroupMsg: obj.isGroupMsg,
    isLink: obj.isLink,
    isMMS: obj.isMMS,
    isMedia: obj.isMedia,
    isNotification: obj.isNotification,
    isPSA: obj.isPSA,
    type: obj.type,
    chat: _chat,
    isOnline: _chat.isOnline,
    lastSeen: _chat.lastSeen,
    chatId: obj.id.remote,
    quotedMsgObj: WAPI._serializeMessageObj(obj['_quotedMsgObj']),
    mediaData: window.WAPI._serializeRawObj(obj['mediaData']),
    reply: body => window.WAPI.reply(_chat.id._serialized, body, obj)
  });
};

window.WAPI._serializeNumberStatusObj = (obj) => {
  if (obj == undefined) {
    return null;
  }

  return Object.assign({}, {
    id: obj.jid,
    status: obj.status,
    isBusiness: (obj.biz === true),
    canReceiveMessage: (obj.status === 200)
  });
};

window.WAPI._serializeProfilePicThumb = (obj) => {
  if (obj == undefined) {
    return null;
  }

  return Object.assign({}, {
    eurl: obj.eurl,
    id: obj.id,
    img: obj.img,
    imgFull: obj.imgFull,
    raw: obj.raw,
    tag: obj.tag
  });
}

window.WAPI.createGroup = async function (name, contactsId) {
  if (!Array.isArray(contactsId)) {
    contactsId = [contactsId];
  }
  return await window.Store.WapQuery.createGroup(name, contactsId);
};

/**
 * Sends the command for your device to leave a group.
 * @param groupId stirng, the is for the group.
 * returns Promise<void>
 */
//window.WAPI.leaveGroup = function (groupId) {
//  groupId = typeof groupId == "string" ? groupId : groupId._serialized;
//  var group = WAPI.getChat(groupId);
//  return Store.GroupActions.sendExitGroup(group)
//};


window.WAPI.getAllContacts = function () {
  return window.Store.Contact.map((contact) => WAPI._serializeContactObj(contact));
};

/**
 * Fetches all contact objects from store, filters them
 *
 * @returns {Array|*} List of contacts
 */
window.WAPI.getMyContacts = function () {
  return window.Store.Contact.filter((contact) => contact.isMyContact === true).map((contact) => WAPI._serializeContactObj(contact));
};

/**
 * Fetches contact object from store by ID
 *
 * @param id ID of contact
 * @returns {T|*} Contact object
 */
window.WAPI.getContact = function (id) {
  const found = window.Store.Contact.get(id);
  return window.WAPI._serializeContactObj(found);
};

window.WAPI.syncContacts = function() {
  Store.Contact.sync()
  return true;
}

/**
 * Fetches all chat objects from store
 *
 * @returns {Array|*} List of chats
 */
window.WAPI.getAllChats = function () {
  return window.Store.Chat.map((chat) => WAPI._serializeChatObj(chat));
};

window.WAPI.haveNewMsg = function (chat) {
  return chat.unreadCount > 0;
};

window.WAPI.getAllChatsWithNewMsg = function () {
  return window.Store.Chat.filter(window.WAPI.haveNewMsg).map((chat) => WAPI._serializeChatObj(chat));
};

/**
 * Fetches all chat IDs from store
 *
 * @returns {Array|*} List of chat id's
 */
window.WAPI.getAllChatIds = function () {
  return window.Store.Chat.map((chat) => chat.id._serialized || chat.id);
};

window.WAPI.getAllNewMessages = async function () {
  return WAPI.getAllChatsWithNewMsg().map(c => WAPI.getChat(c.id)).flatMap(c => c.msgs._models.filter(x => x.isNewMsg)).map(WAPI._serializeMessageObj) || [];
}

// nnoo longer determined by x.ack==-1
window.WAPI.getAllUnreadMessages = async function () {
  return Store.Chat.models.filter(chat=>chat.unreadCount&&chat.unreadCount>0).map(unreadChat=>unreadChat.msgs.models.slice(-1*unreadChat.unreadCount)).flat().map(WAPI._serializeMessageObj)
}

window.WAPI.getIndicatedNewMessages = async function () {
  return JSON.stringify(Store.Chat.models.filter(chat=>chat.unreadCount).map(chat=>{return {id:chat.id,indicatedNewMessages: chat.msgs.models.slice(Math.max(chat.msgs.length - chat.unreadCount, 0)).filter(msg=>!msg.id.fromMe)}}))
}

window.WAPI.getSingleProperty = function (namespace,id,property){
  if(Store[namespace] && Store[namespace].get(id) && Object.keys(Store[namespace].get(id)).find(x=>x.includes(property))) return Store[namespace].get(id)[property];
  return 404
}

window.WAPI.getAllChatsWithMessages = async function (onlyNew) {
  let x = [];
  if (onlyNew) { x.push(WAPI.getAllChatsWithNewMsg().map(c => WAPI.getChat(c.id._serialized))); }
  else {
    x.push(WAPI.getAllChatIds().map((c) => WAPI.getChat(c)));
  }
  const result = (await Promise.all(x)).flatMap(x => x);
  return JSON.stringify(result);
}

/**
 * Fetches all groups objects from store
 *
 * @returns {Array|*} List of chats
 */
window.WAPI.getAllGroups = function () {
  return window.WAPI.getAllChats().filter((chat) => chat.isGroup);
};

/**
 * Sets the chat state
 * 
 * @param {0|1|2} chatState The state you want to set for the chat. Can be TYPING (1), RECRDING (2) or PAUSED (3);
 * returns {boolean}
 */
window.WAPI.sendChatstate = async function (state, chatId) {
  switch(state) {
    case 0:
      await window.Store.ChatStates.sendChatStateComposing(chatId);
      break;
    case 1:
      await window.Store.ChatStates.sendChatStateRecording(chatId);
      break;
    case 2:
      await window.Store.ChatStates.sendChatStatePaused(chatId);
      break;
    default:
      return false
  }
  return true;
};

/**
 * Fetches chat object from store by ID
 *
 * @param id ID of chat
 * @returns {T|*} Chat object
 */
window.WAPI.getChat = function (id) {
  if (!id) return false;
  id = typeof id == "string" ? id : id._serialized;
  let found = window.Store.Chat.get(id);
  if (!found) {
    const ConstructChat = new window.Store.UserConstructor(id, {
      intentionallyUsePrivateConstructor: !0
    });
    found = Store.Chat.find(ConstructChat) || false;
  }
  if (found) found.sendMessage = (found.sendMessage) ? found.sendMessage : function () { return window.Store.sendMessage.apply(this, arguments); };
  return found;
}

/**
 * Get your status
 * @param {string} to '000000000000@c.us'
 * returns: {string,string} and string -"Hi, I am using WA"
 */
window.WAPI.getStatus = async (id) => {
  return await Store.MyStatus.getStatus(id)
}

window.WAPI.getChatByName = function (name) {
  return window.WAPI.getAllChats().find((chat) => chat.name === name);
};

window.WAPI.sendImageFromDatabasePicBot = function (picId, chatId, caption) {
  var chatDatabase = window.WAPI.getChatByName('DATABASEPICBOT');
  var msgWithImg = chatDatabase.msgs.find((msg) => msg.caption == picId);

  if (msgWithImg === undefined) {
    return false;
  }
  var chatSend = WAPI.getChat(chatId);
  if (chatSend === undefined) {
    return false;
  }
  const oldCaption = msgWithImg.caption;

  msgWithImg.id.id = window.WAPI.getNewId();
  msgWithImg.id.remote = chatId;
  msgWithImg.t = Math.ceil(new Date().getTime() / 1000);
  msgWithImg.to = chatId;

  if (caption !== undefined && caption !== '') {
    msgWithImg.caption = caption;
  } else {
    msgWithImg.caption = '';
  }

  msgWithImg.collection.send(msgWithImg).then(function (e) {
    msgWithImg.caption = oldCaption;
  });

  return true;
};

window.WAPI.getGeneratedUserAgent = function (useragent) {
  if (!useragent.includes('WhatsApp')) return 'WhatsApp/0.4.315 ' + useragent;
  return useragent.replace(useragent.match(/WhatsApp\/([.\d])*/g)[0].match(/[.\d]*/g).find(x => x), window.Debug.VERSION)
}

window.WAPI.getWAVersion = function () {
  return window.Debug.VERSION;
}

/**
 * Automatically sends a link with the auto generated link preview. You can also add a custom message to be added.
 * @param chatId 
 * @param url string A link, for example for youtube. e.g https://www.youtube.com/watch?v=61O-Galzc5M
 * @param text string Custom text as body of the message, this needs to include the link or it will be appended after the link.
 */
window.WAPI.sendLinkWithAutoPreview = async function (chatId, url, text) {
  text = text || '';
  var chatSend = WAPI.getChat(chatId);
  if (chatSend === undefined) {
    return false;
  }
  const linkPreview = await Store.WapQuery.queryLinkPreview(url);
  return (await chatSend.sendMessage(text.includes(url) ? text : `${url}\n${text}`, {linkPreview}))=='OK'
}

window.WAPI.sendMessageWithThumb = function (thumb, url, title, description, text, chatId) {
  var chatSend = WAPI.getChat(chatId);
  if (chatSend === undefined) {
    return false;
  }
  var linkPreview = {
    canonicalUrl: url,
    description: description,
    matchedText: url,
    title: title,
    thumbnail: thumb // Thumbnail max size allowed: 200x200
  };
  chatSend.sendMessage(text.includes(url) ? text : `${url}\n${text}`, { linkPreview: linkPreview, mentionedJidList: [], quotedMsg: null, quotedMsgAdminGroupJid: null });
  return true;
};

//window.WAPI.revokeGroupInviteLink = async function (chatId) {
//  var chat = Store.Chat.get(chatId);
//  if(!chat.isGroup) return false;
//  await Store.GroupInvite.revokeGroupInvite(chat);
//  return true;
//}

//window.WAPI.getGroupInviteLink = async function (chatId) {
//  var chat = Store.Chat.get(chatId);
//  if(!chat.isGroup) return false;
//  await Store.GroupInvite.queryGroupInviteCode(chat);
//  return `https://chat.whatsapp.com/${chat.inviteCode}`
//}

window.WAPI.inviteInfo = async function(link){
  return await Store.WapQuery.groupInviteInfo(link.split('\/').pop()).then(r=>r.status===200?WAPI.quickClean(r):r.status);
}

window.WAPI.getNewId = function () {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 20; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};

window.WAPI.getChatById = function (id) {
  let found = WAPI.getChat(id);
  if (found) {
    found = WAPI._serializeChatObj(found);
  } else {
    found = false;
  }
  return found;
};


/**
 * I return all unread messages from an asked chat and mark them as read.
 *
 * :param id: chat id
 * :type  id: string
 *
 * :param includeMe: indicates if user messages have to be included
 * :type  includeMe: boolean
 *
 * :param includeNotifications: indicates if notifications have to be included
 * :type  includeNotifications: boolean
 *
 * :returns: list of unread messages from asked chat
 * :rtype: object
 */
window.WAPI.getUnreadMessagesInChat = function (id, includeMe, includeNotifications) {
  // get chat and its messages
  let chat = WAPI.getChat(id);
  let messages = chat.msgs._models;

  // initialize result list
  let output = [];

  // look for unread messages, newest is at the end of array
  for (let i = messages.length - 1; i >= 0; i--) {
    // system message: skip it
    if (i === "remove") {
      continue;
    }

    // get message
    let messageObj = messages[i];

    // found a read message: stop looking for others
    if (typeof (messageObj.isNewMsg) !== "boolean" || messageObj.isNewMsg === false) {
      continue;
    } else {
      messageObj.isNewMsg = false;
      // process it
      let message = WAPI.processMessageObj(messageObj,
        includeMe,
        includeNotifications);

      // save processed message on result list
      if (message)
        output.push(message);
    }
  }
  // return result list
  return output;
};


/**
 * Load more messages in chat object from server. Use this in a while loop
 *
 * @param id ID of chat
 * @returns None
 */
window.WAPI.loadEarlierMessages = async function (id) {
  const chat = WAPI.getChat(id);
  if(chat){
    const someEarlierMessages = await chat.loadEarlierMsgs(); 
    if(someEarlierMessages) return someEarlierMessages.map(WAPI._serializeMessageObj);
  }
  return false;
};

/**
 * Load more messages in chat object from store by ID
 *
 * @param id ID of chat
 * @returns None
 */
window.WAPI.loadAllEarlierMessages = async function (id) {
  const found = WAPI.getChat(id);
  while (!found.msgs.msgLoadState.noEarlierMsgs) {
    console.log('loading more messages')
    await found.loadEarlierMsgs();
  }
  return true
};

window.WAPI.asyncLoadAllEarlierMessages = async function (id) {
  return await window.WAPI.loadAllEarlierMessages(id);
};

window.WAPI.areAllMessagesLoaded = function (id) {
  const found = WAPI.getChat(id);
  if (!found.msgs.msgLoadState.noEarlierMsgs) {
    return false
  }
  return true
};

/**
 * Load more messages in chat object from store by ID till a particular date
 *
 * @param id ID of chat
 * @param lastMessage UTC timestamp of last message to be loaded
 * @returns None
 */

window.WAPI.loadEarlierMessagesTillDate = async function (id, lastMessage) {
  const found = WAPI.getChat(id);
  x = async function () {
    if (found.msgs.models[0].t > lastMessage && !found.msgs.msgLoadState.noEarlierMsgs) {
      return await found.loadEarlierMsgs().then(x);
    } else {
      return true
    }
  };
  return await x();
};


/**
 * Fetches all group metadata objects from store
 *
 * @returns {Array|*} List of group metadata
 */
window.WAPI.getAllGroupMetadata = function () {
  return window.Store.GroupMetadata.map((groupData) => groupData.all);
};

/**
 * Fetches group metadata object from store by ID
 *
 * @param id ID of group
 * @returns {T|*} Group metadata object
 */
window.WAPI.getGroupMetadata = async function (id) {
  return window.Store.GroupMetadata.find(id);
};


/**
 * Fetches group participants
 *
 * @param id ID of group
 * @returns {Promise.<*>} Yields group metadata
 * @private
 */
window.WAPI._getGroupParticipants = async function (id) {
  return (await WAPI.getGroupMetadata(id)).participants;
};

/**
 * Fetches IDs of group participants
 *
 * @param id ID of group
 * @returns {Promise.<Array|*>} Yields list of IDs
 */
window.WAPI.getGroupParticipantIDs = async function (id) {
  return (await WAPI._getGroupParticipants(id))
    .map((participant) => participant.id._serialized);
};

window.WAPI.getGroupAdmins = async function (id) {
  return (await WAPI._getGroupParticipants(id))
    .filter((participant) => participant.isAdmin)
    .map((admin) => admin.id._serialized);
};

WAPI.iAmAdmin = async function(){
  return (await Promise.all(Store.GroupMetadata.models.map(({id})=>Store.GroupMetadata.find(id)))).filter(({participants})=>participants.iAmAdmin()||participants.iAmSuperAdmin()).map(({id})=>id._serialized);
}

/**
 * Returns an object with all of your host device details
 */
window.WAPI.getMe = function(){
  return window.Store.Contact.get(window.Store.MaybeMeUser.getMaybeMeUser()).id;
};

window.WAPI.isLoggedIn = function () {
  // Contact always exists when logged in
  const isLogged = window.Store.Contact && window.Store.Contact.checksum !== undefined;
  return isLogged;
};

window.WAPI.isConnected = function () {
  // Phone or connection Disconnected icon appears when phone or connection is disconnected
  const isConnected=(document.querySelector('[data-testid="alert-phone"]') == null && document.querySelector('[data-testid="alert-computer"]') == null) ? true : false;	
  return isConnected;
};

//I dont think this will work for group chats.
window.WAPI.isChatOnline = async function (id) {
  return Store.Chat.get(id)?await Store.Chat.get(id).presence.subscribe().then(_=>Store.Chat.get(id).presence.attributes.isOnline):false;
}

window.WAPI.processMessageObj = function (messageObj, includeMe, includeNotifications) {
  if (messageObj.isNotification) {
    if (includeNotifications)
      return WAPI._serializeMessageObj(messageObj);
    else
      return;
    // System message
    // (i.e. "Messages you send to this chat and calls are now secured with end-to-end encryption...")
  } else if (messageObj.id.fromMe === false || includeMe) {
    return WAPI._serializeMessageObj(messageObj);
  }
  return;
};

window.WAPI.getAllMessagesInChat = function (id, includeMe = false, includeNotifications = false, clean = false) {
  const chat = WAPI.getChat(id);
  let output = chat.msgs._models || [];
  if(!includeMe) output =  output.filter(m=> !m.id.fromMe)
  if(!includeNotifications) output = output.filter(m=> !m.isNotification)
  return (clean ? output.map(WAPI.quickClean) : output.map(WAPI._serializeMessageObj)) || [];
};

window.WAPI.loadAndGetAllMessagesInChat = function (id, includeMe, includeNotifications) {
  return WAPI.loadAllEarlierMessages(id).then(_ => {
    const chat = WAPI.getChat(id);
    let output = [];
    const messages = chat.msgs._models;

    for (const i in messages) {
      if (i === "remove") {
        continue;
      }
      const messageObj = messages[i];

      let message = WAPI.processMessageObj(messageObj, includeMe, includeNotifications)
      if (message)
        output.push(message);
    }
    return output;
  })
};

window.WAPI.getAllMessageIdsInChat = function (id, includeMe, includeNotifications) {
  const chat = WAPI.getChat(id);
  let output = [];
  const messages = chat.msgs._models;

  for (const i in messages) {
    if ((i === "remove")
      || (!includeMe && messages[i].isMe)
      || (!includeNotifications && messages[i].isNotification)) {
      continue;
    }
    output.push(messages[i].id._serialized);
  }
  return output;
};

window.WAPI.getMessageById = async function (key, done, serialize = true) {
  // Check message is loaded in store
  let msg = window.Store.Msg.get(key);
  let erro = { erro: true };

  if (!msg) {
    // Get chat of message
    const chat = window.Store.Chat.get(key.remote);
    if (!chat) {
      return erro;
    }

    //If not message not found, load latest messages of chat
    await chat.loadEarlierMsgs();
    msg = window.Store.Msg.get(key);

    if (!msg) {
      // If not found, load messages around the message ID
      const context = chat.getSearchContext(key);
      if (
        context &&
        context.collection &&
        context.collection.loadAroundPromise
      ) {
        await context.collection.loadAroundPromise;
      }
      msg = window.Store.Msg.get(key);
    }
  }

  if (!msg) {
    return erro;
  }

  let result = erro;

  if (serialize) {
    try {
      result = WAPI.processMessageObj(msg, true, true);
    } catch (err) {}
  } else {
    result = msg;
  }

  if (typeof done === 'function') {
    done(result);
  } else {
    return result;
  }
}

window.WAPI.sendMessageWithMentions = async function (ch, body) {
  var chat = ch.id ? ch : Store.Chat.get(ch);
  var chatId = chat.id._serialized;
  var msgIveSent = chat.msgs.filter(msg => msg.__x_isSentByMe)[0];
  if(!msgIveSent) return chat.sendMessage(body);
  var tempMsg = Object.create(msgIveSent);
  var newId = window.WAPI.getNewMessageId(chatId);
  var mentionedJidList = body.match(/@(\d*)/g).filter(x=>x.length>5).map(x=>Store.Contact.get(x.replace("@","")+"@c.us") ? new Store.WidFactory.createUserWid(x.replace("@","")) : '') || undefined;
  var extend = {
    ack: 0,
    id: newId,
    local: !0,
    self: "out",
    t: parseInt(new Date().getTime() / 1000),
    to: new Store.WidFactory.createWid(chatId),
    isNewMsg: !0,
    type: "chat",
    body,
    quotedMsg:null,
    mentionedJidList
  };
  Object.assign(tempMsg, extend);
  await Store.addAndSendMsgToChat(chat, tempMsg)
  return newId._serialized;
}

window.WAPI.sendMessageReturnId = async function (ch, body) {
  var chat = ch.id ? ch : Store.Chat.get(ch);
  var chatId = chat.id._serialized;
  var msgIveSent = chat.msgs.filter(msg => msg.__x_isSentByMe)[0];
  if(!msgIveSent) return chat.sendMessage(body);
  var tempMsg = Object.create(msgIveSent);
  var newId = window.WAPI.getNewMessageId(chatId);
  var extend = {
    ack: 0,
    id: newId,
    local: !0,
    self: "out",
    t: parseInt(new Date().getTime() / 1000),
    to: new Store.WidFactory.createWid(chatId),
    isNewMsg: !0,
    type: "chat",
    body,
    quotedMsg:null
  };
  Object.assign(tempMsg, extend);
  await Store.addAndSendMsgToChat(chat, tempMsg)
  return newId._serialized;
}

window.WAPI.sleep = function(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

window.WAPI.sendMessageToID = async function (to, content) {
 if (typeof content != 'string' || content.length === 0) {
    return WAPI.scope(
      undefined,
      true,
      null,
      'It is necessary to write a text!'
    );
  }
  if (typeof to != 'string' || to.length === 0) {
    return WAPI.scope(to, true, 404, 'It is necessary to number');
  }

  let chat = await WAPI.sendExist(to);

  if (chat && chat.status != 404 && chat.id) {
    const m = { type: 'sendText', text: content };
    const newMsgId = await window.WAPI.getNewMessageId(chat.id._serialized);
    const fromwWid = await Store.MaybeMeUser.getMaybeMeUser();

    let inChat = await WAPI.getchatId(chat.id).catch(() => {
      return WAPI.scope(chat.id, true, 404, 'Error to number ' + to);
    });

    if (inChat) {
      chat.lastReceivedKey && chat.lastReceivedKey._serialized
        ? (chat.lastReceivedKey._serialized = inChat._serialized)
        : '';
      chat.lastReceivedKey && chat.lastReceivedKey.id
        ? (chat.lastReceivedKey.id = inChat.id)
        : '';
    }

    if (!newMsgId) {
      return WAPI.scope(to, true, 404, 'Error to newId');
    }

    if(chat.id._serialized !== to) { return 'ERROR: not a valid Whatsapp'; }

    const message = {
      id: newMsgId,
      ack: 0,
      body: content,
      from: fromwWid,
      to: chat.id,
      local: !0,
      self: 'out',
      t: parseInt(new Date().getTime() / 1000),
      isNewMsg: !0,
      type: 'chat'
    };

    try {
      var result = (
        await Promise.all(window.Store.addAndSendMsgToChat(chat, message))
      )[1];

      if (result === 'success' || result === 'OK') {
        let obj = WAPI.scope(newMsgId, false, result, content);
        Object.assign(obj, m);
        return obj;
      }
    } catch (e) {
      let obj = WAPI.scope(newMsgId, true, result, 'The message was not sent');
      Object.assign(obj, m);
      return obj;
    }

    let obj = WAPI.scope(newMsgId, true, result, content);
    Object.assign(obj, m);
    return obj;
  } else {
    return 'ERROR: not a valid Whatsapp';
  }
}

window.WAPI.getExistentChat = async function (id) {
  if (!id) return false;
  id = typeof id == "string" ? id : id._serialized;
  return window.Store.Chat.get(id);
}

window.WAPI.sendMessage = async function (to, content) {
  const chat = await WAPI.getExistentChat(to);
  if(!chat) { return WAPI.sendMessageToID(to, content); }
  const newMsgId = await window.WAPI.getNewMessageId(chat.id._serialized);
  const fromwWid = await window.Store.MaybeMeUser.getMaybeMeUser();
  const message = {
    id: newMsgId,
    ack: 0,
    body: content,
    from: fromwWid,
    to: chat.id,
    local: !0,
    self: 'out',
    t: parseInt(new Date().getTime() / 1000),
    isNewMsg: !0,
    type: 'chat',
  };

  await window.Store.addAndSendMsgToChat(chat, message);

  return newMsgId._serialized;
};


window.WAPI.sendSeen = async function (id) {
  if (!id) return false;
  var chat = window.WAPI.getChat(id);
  if (chat !== undefined) {
    await Store.ReadSeen.sendSeen(chat, false);
    return true;
  }
  return false;
};

window.WAPI.markAsUnread = async function (id) {
  var chat = window.WAPI.getChat(id);
  if (chat !== undefined) {
    await Store.ReadSeen.markUnread(chat, true);
    return true;
  }
  return false;
};

function isChatMessage(message) {
  if (message.isSentByMe) {
    return false;
  }
  if (message.isNotification) {
    return false;
  }
  if (!message.isUserCreatedType) {
    return false;
  }
  return true;
}

window.WAPI.setPresence = function (available) {
  if(available)Store._Presence.setPresenceAvailable();
  else Store._Presence.setPresenceUnavailable();
}

window.WAPI.getUnreadMessages = function (includeMe, includeNotifications, use_unread_count) {
  const chats = window.Store.Chat.models;
  let output = [];

  for (let chat in chats) {
    if (isNaN(chat)) {
      continue;
    }

    let messageGroupObj = chats[chat];
    let messageGroup = WAPI._serializeChatObj(messageGroupObj);

    messageGroup.messages = [];

    const messages = messageGroupObj.msgs._models;
    for (let i = messages.length - 1; i >= 0; i--) {
      let messageObj = messages[i];
      if (typeof (messageObj.isNewMsg) != "boolean" || messageObj.isNewMsg === false) {
        continue;
      } else {
        messageObj.isNewMsg = false;
        let message = WAPI.processMessageObj(messageObj, includeMe, includeNotifications);
        if (message) {
          messageGroup.messages.push(message);
        }
      }
    }

    if (messageGroup.messages.length > 0) {
      output.push(messageGroup);
    } else { // no messages with isNewMsg true
      if (use_unread_count) {
        let n = messageGroupObj.unreadCount; // will use unreadCount attribute to fetch last n messages from sender
        for (let i = messages.length - 1; i >= 0; i--) {
          let messageObj = messages[i];
          if (n > 0) {
            if (!messageObj.isSentByMe) {
              let message = WAPI.processMessageObj(messageObj, includeMe, includeNotifications);
              messageGroup.messages.unshift(message);
              n -= 1;
            }
          } else if (n === -1) { // chat was marked as unread so will fetch last message as unread
            if (!messageObj.isSentByMe) {
              let message = WAPI.processMessageObj(messageObj, includeMe, includeNotifications);
              messageGroup.messages.unshift(message);
              break;
            }
          } else { // unreadCount = 0
            break;
          }
        }
        if (messageGroup.messages.length > 0) {
          messageGroupObj.unreadCount = 0; // reset unread counter
          output.push(messageGroup);
        }
      }
    }
  }
  return output;
};

window.WAPI.getGroupOwnerID = async function (id) {
  const output = (await WAPI.getGroupMetadata(id)).owner.id;
  return output;

};

window.WAPI.getCommonGroups = async function (id) {
  let output = [];

  groups = window.WAPI.getAllGroups();

  for (let idx in groups) {
    try {
      participants = await window.WAPI.getGroupParticipantIDs(groups[idx].id);
      if (participants.filter((participant) => participant == id).length) {
        output.push(groups[idx]);
      }
    } catch (err) {
      console.log("Error in group:");
      console.log(groups[idx]);
      console.log(err);
    }
  }
  return output;
};

window.WAPI.getProfilePicFromServer = function (id) {
  return Store.WapQuery.profilePicFind(id).then(x => x.eurl);
}

window.WAPI.getProfilePicSmallFromId = async function (id) {
  return await window.Store.ProfilePicThumb.find(id).then(async d=> {
    if (d.img !== undefined) {
      return await window.WAPI.downloadFileWithCredentials(d.img);
    } else {
      return false
    }
  }, function (e) {
    return false
  })
};

window.WAPI.getProfilePicFromId = async function (id) {
  return await window.Store.ProfilePicThumb.find(id).then(async d => {
    if (d.imgFull !== undefined) {
      return await window.WAPI.downloadFileWithCredentials(d.imgFull);
    } else {
      return false
    }
  }, function (e) {
    return false
  })
};

window.WAPI.downloadFileWithCredentials = async function (url) {
  if(!axios || !url) return false;
  const ab = (await axios.get(url,{responseType: 'arraybuffer'})).data
  return btoa(new Uint8Array(ab).reduce((data, byte) => data + String.fromCharCode(byte), ''));
};

window.WAPI.downloadFile = async function (url) {
  return await new Promise((resolve,reject) => {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          let reader = new FileReader();
          reader.readAsDataURL(xhr.response);
          reader.onload = function (e) {
            resolve(reader.result.substr(reader.result.indexOf(',') + 1))
          };
        } else {
          console.error(xhr.statusText);
        }
      } else {
        console.log(err);
        resolve(false);
      }
    };

    xhr.open("GET", url, true);
    xhr.responseType = 'blob';
    xhr.send(null);
  })
};

window.WAPI.getBatteryLevel = function () {
  return Store.Conn.battery;
};

window.WAPI.getIsPlugged = function () {
  return Store.Conn.plugged;
};

window.WAPI.deleteConversation = async function (chatId) {
  let userId = new window.Store.UserConstructor(chatId, { intentionallyUsePrivateConstructor: true });
  let conversation = WAPI.getChat(userId);
  if (!conversation) {
    return false;
  }
  return await window.Store.sendDelete(conversation, false).then(() => {
    return true;
  }).catch(() => {
    return false;
  });
};

window.WAPI.smartDeleteMessages = async function (chatId, messageArray, onlyLocal) {
  var userId = new Store.WidFactory.createWid(chatId);
  let conversation = WAPI.getChat(userId);
  if (!conversation) return false;

  if (!Array.isArray(messageArray)) {
    messageArray = [messageArray];
  }

  let messagesToDelete = messageArray.map(msgId => (typeof msgId == 'string')?window.Store.Msg.get(msgId):msgId).filter(x=>x);
  if(messagesToDelete.length==0) return true;
  let jobs = onlyLocal ? [conversation.sendDeleteMsgs(messagesToDelete,conversation)] :[
    conversation.sendRevokeMsgs(messagesToDelete.filter(msg=>msg.isSentByMe),conversation),
    conversation.sendDeleteMsgs(messagesToDelete.filter(msg=>!msg.isSentByMe),conversation)
  ]
  return Promise.all(jobs).then(_=>true)
};

window.WAPI.deleteMessage = async function (chatId, messageArray, revoke = false) {
  let userId = new window.Store.UserConstructor(chatId, { intentionallyUsePrivateConstructor: true });
  let conversation = WAPI.getChat(userId);

  if (!conversation)return false;

  if (!Array.isArray(messageArray)) {
    messageArray = [messageArray];
  }

  let messagesToDelete = messageArray.map(msgId => window.Store.Msg.get(msgId));

  if (revoke) {
    conversation.sendRevokeMsgs(messagesToDelete, conversation);
  } else {
    conversation.sendDeleteMsgs(messagesToDelete, conversation);
  }

  return true;
};

window.WAPI.clearChat = async function (id) {
  return await Store.ChatUtil.sendClear(Store.Chat.get(id),true);
}

/**
 * @param id The id of the conversation
 * @param archive boolean true => archive, false => unarchive
 * @return boolean true: worked, false: didnt work (probably already in desired state)
 */
//window.WAPI.archiveChat = async function (id, archive) {
//  return await Store.Archive.setArchive(Store.Chat.get(id),archive).then(_=>true).catch(_=>false)
//}

/**
 * Extracts vcards from a message
 * @param id string id of the message to extract the vcards from
 * @returns [vcard] 
 * ```
 * [
 * {
 * displayName:"Contact name",
 * vcard: "loong vcard string"
 * }
 * ]
 * ``` or false if no valid vcards found
 */
//window.WAPI.getVCards = function(id) {
//  var msg = Store.Msg.get(id);
//  if(msg) {
//    if(msg.type=='vcard') {
//      return [
//        {
//          displayName:msg.subtype,
//          vcard:msg.body
//        }
//      ]
//    } else if (msg.type=='multi_vcard') {
//      return msg.vcardList
//    } else return false;
//  } else {
//    return false
//  }
//}

window.WAPI.checkNumberStatus = async function (id, conn = true) {
   try {
    const err = { error: 404 };
    const connection = window.Store.State.Socket.state;
    const checkType = WAPI.sendCheckType(id);
    if (!!checkType && checkType.status === 404) {
      Object.assign(err, {
        text: checkType.text,
        numberExists: null
      });
      throw err;
    }

    if (conn === true) {
      if (connection !== 'CONNECTED') {
        Object.assign(err, {
          text: 'No connection with WhatsApp',
          connection: connection,
          numberExists: null
        });
        throw err;
      }
    }

    if (WAPI.isBeta()) {
      return await Store.checkNumberBeta(id)
        .then((result) => {
          if (!!result && typeof result === 'object') {
            const data = {
              status: 200,
              numberExists: true,
              id: result.wid
            };
            return data;
          }
          throw Object.assign(err, {
            connection: connection,
            numberExists: false,
            text: `The number does not exist`
          });
        })
        .catch((err) => {
          if (err.text) {
            throw err;
          }
          throw Object.assign(err, {
            connection: connection,
            numberExists: false,
            text: err
          });
        });
    }

    const result = await Store.checkNumber.queryExist(id);
    if (result.status === 200) {
      return {
        status: result.status,
        numberExists: true,
        id: result.jid
      };
    }
    return {
      status: result.status,
      numberExists: false,
      text: `The number does not exist`
    };
  } catch (e) {
    return {
      status: e.error,
      text: e.text,
      numberExists: e.numberExists,
      connection: e.connection
    };
  }
}

window.WAPI.isBeta = async function() {
   if (
     !window.localStorage.getItem('WASecretBundle') &&
     !window.localStorage.getItem('WAToken1') &&
     !window.localStorage.getItem('WAToken2')
   ) {
     return true;
   }
   return false;
 }

window.WAPI.onAnyMessage = callback => window.Store.Msg.on('add', (newMessage) => {
  if (newMessage && newMessage.isNewMsg) {
    // fix for version > 2.2104.6
    if (newMessage.clientUrl == null || newMessage.clientUrl == undefined || newMessage.clientUrl == "") { newMessage.clientUrl = newMessage.deprecatedMms3Url; }
    console.log(newMessage.clientUrl, newMessage.deprecatedMms3Url);
    if(!newMessage.clientUrl && (newMessage.mediaKeyTimestamp || newMessage.filehash)){
      const cb = (msg) => {
        if(msg.id._serialized === newMessage.id._serialized && msg.clientUrl) {
          callback(WAPI.processMessageObj(msg, true, false));
          Store.Msg.off('change:isUnsentMedia',cb);
        }
      };
      Store.Msg.on('change:isUnsentMedia',cb);
    } else {
      let pm = window.WAPI.processMessageObj(newMessage, true, true);
      let message = pm? JSON.parse(JSON.stringify(pm)) : WAPI.quickClean(newMessage.attributes);
      if (message) {
        callback(message)
      }
    }}
});

/**
 * Registers a callback to be called when a the acknowledgement state of the phone connection.
 * @param callback - function - Callback function to be called when the device state changes. this returns 'CONNECTED' or 'TIMEOUT'
 * @returns {boolean}
 */
window.WAPI.onStateChanged = function (callback) {
  window.Store.State.Socket.on('change:state', ({state})=>callback(state))
  return true;
}

/**
 * Returns the current state of the session. Possible state values:
 * "CONFLICT"
 * "CONNECTED"
 * "DEPRECATED_VERSION"
 * "OPENING"
 * "PAIRING"
 * "PROXYBLOCK"
 * "SMB_TOS_BLOCK"
 * "TIMEOUT"
 * "TOS_BLOCK"
 * "UNLAUNCHED"
 * "UNPAIRED"
 * "UNPAIRED_IDLE"
 */
window.WAPI.getState = function (){
  return Store.State.Socket.state;
}

/**
 * Registers a callback to be called when your phone receives a new call request.
 * @param callback - function - Callback function to be called upon a new call. returns a call object.
 * @returns {boolean}
 */
window.WAPI.onIncomingCall = function (callback) {
  window.Store.Call.on('add',callback);
  return true;
}

/**
 * @param label: either the id or the name of the label. id will be something simple like anhy nnumber from 1-10, name is the label of the label if that makes sense.
 * @param objectId The Chat, message or contact id to which you want to add a label
 * @param type The type of the action. It can be either "add" or "remove"
 * @returns boolean true if it worked otherwise false
 */
window.WAPI.addOrRemoveLabels = async function (label, objectId, type) {
  var {id} = Store.Label.models.find(x=>x.id==label||x.name==label)
  var to = Store.Chat.get(objectId) || Store.Msg.get(objectId) || Store.Contact.get(objectId);
  if(!id || !to) return false;
  const {status} = await Store.Label.addOrRemoveLabels([{id,type}],[to]);
  return status===200;
}

/**
 * Registers a callback to be called when a the acknowledgement state of a message changes.
 * @param callback - function - Callback function to be called when a message acknowledgement changes.
 * @returns {boolean}
 */
window.WAPI.onAck = function (callback) {
  Store.Msg.on("change:ack", m=>callback(WAPI.quickClean(m)));
  return true;
}

//returns an array of liveLocationChangeObjects
window.WAPI.forceUpdateLiveLocation = async function (chatId) {
  if(!Store.LiveLocation.get(chatId)) return false;
  return WAPI.quickClean(await Store.LiveLocation.update(chatId)).participants.map(l=>{
    return {
      ...l,
      msgId:l.msg.id._serialized
    }
  });
}

window.WAPI.onLiveLocation = function (chatId, callback) {
  var lLChat = Store.LiveLocation.get(chatId);
  if(lLChat) {
    var validLocs = lLChat.participants.validLocations();
    validLocs.map(x=>x.on('change:lastUpdated',(x,y,z)=>{
      const {id,lat,lng,accuracy,degrees,speed,lastUpdated}=x;
      const l = {
        id:id.toString(),lat,lng,accuracy,degrees,speed,lastUpdated};
      callback(l);
    }));
    return true;
  } else {
    return false;
  }
}

window.WAPI.onBattery = function(callback) {
  window.Store.Conn.on('change:battery', ({battery}) =>  callback(battery));
  return true;
}

window.WAPI.onPlugged = function(callback) {
  window.Store.Conn.on('change:plugged', ({plugged}) =>  callback(plugged));
  return true;
}

/**
 * A new approach to listening to add and remove events from groups. This takes only a callback and is prevents memory leaks
 */
WAPI.onGlobalParicipantsChanged = function(callback) {
  const events = [
    'change:isAdmin',
    'remove',
    'add'
  ]
  //const id = eventName.replace('group_participant_change','');
  const chats = Store.GroupMetadata.models
  //.filter(group=>group.participants.models.find(participant=>participant.id._serialized===id))
    .filter(x => x.id.server !== 'broadcast').map(group => window.Store.Chat.get(group.id._serialized));
  const cb = (eventName, eventData, extra) => {
    if (events.includes(eventName)) {
      let action = eventName;
      if (eventName == 'change:isAdmin') {
        action = extra ? 'promote' : 'demote';
      }
      callback({
        by: undefined,
        action: action,
        who: eventData.id._serialized,
        chat: extra.parent.id._serialized
      });
      chats.map(chat => {
        chat.groupMetadata.participants.off('all', cb)
        chat.groupMetadata.participants.off(cb)
      });
    }
  }
  chats.map(chat => chat.groupMetadata.participants.on('all', cb));
  Store.GroupMetadata.on('all', (eventName, groupId) => chats.map(chat => chat.groupMetadata.participants.on('all', cb)))
  return true;
}

/**
 * Registers a callback to participant changes on a certain, specific group
 * @param groupId - string - The id of the group that you want to attach the callback to.
 * @param callback - function - Callback function to be called when a message acknowledgement changes. The callback returns 3 variables
 * @returns {boolean}
 */
window.WAPI.onParticipantsChanged = function (groupId, callback) {
  const subtypeEvents = [
    "invite" , 
    "add" , 
    "remove" ,
    "leave" ,
    "promote" ,
    "demote"
  ];
  const events = [
    'change:isAdmin',
    'remove',
    'add'
  ]
  const chat = window.Store.Chat.get(groupId);
  chat.groupMetadata.participants.on('all', (eventName, eventData, extra) => {
    if(events.includes(eventName)) {
      let action = eventName;
      if(eventName=='change:isAdmin') {
        action = extra ? 'promote' : 'demote';
      }
      callback({
        by: undefined,
        action: action,
        who: eventData.id._serialized
      });
    }
  })
}

/**
 * Registers a callback to participant changes on a certain, specific group
 * @param groupId - string - The id of the group that you want to attach the callback to.
 * @param callback - function - Callback function to be called when a message acknowledgement changes. The callback returns 3 variables
 * @returns {boolean}
 */
var groupParticpiantsEvents = {};
window.WAPI._onParticipantsChanged = function (groupId, callback) {
  const subtypeEvents = [
    "invite" , 
    "add" , 
    "remove" ,
    "leave" ,
    "promote" ,
    "demote"
  ];
  const chat = window.Store.Chat.get(groupId);
  //attach all group Participants to the events object as 'add'
  const metadata = window.Store.GroupMetadata.get(groupId);
  if (!groupParticpiantsEvents[groupId]) {
    groupParticpiantsEvents[groupId] = {};
    metadata.participants.forEach(participant => {
      groupParticpiantsEvents[groupId][participant.id.toString()] = {
        subtype: "add",
        from: metadata.owner
      }
    });
  }
  let i = 0;
  chat.on("change:groupMetadata.participants",
    _ => chat.on("all", (x, y) => {
      const { isGroup, previewMessage } = y;
      if (isGroup && x === "change" && previewMessage && previewMessage.type === "gp2" && subtypeEvents.includes(previewMessage.subtype)) {
        const { subtype, author, recipients } = previewMessage;
        const rec = recipients[0].toString();
        if (groupParticpiantsEvents[groupId][rec] && groupParticpiantsEvents[groupId][recipients[0]].subtype == subtype) {
          //ignore, this is a duplicate entry
          // console.log('duplicate event')
        } else {
          //ignore the first message
          if (i == 0) {
            //ignore it, plus 1,
            i++;
          } else {
            groupParticpiantsEvents[groupId][rec] = { subtype, author };
            //fire the callback
            // // previewMessage.from.toString()
            // x removed y
            // x added y
            callback({
              by: author.toString(),
              action: subtype,
              who: recipients
            });
            chat.off("all", this)
            i = 0;
          }
        }
      }
    })
  )
  return true;
}


/**
 * Registers a callback that fires when your host phone is added to a group.
 * @param callback - function - Callback function to be called when a message acknowledgement changes. The callback returns 3 variables
 * @returns {boolean}
 */
window.WAPI.onAddedToGroup = function(callback){
  Store.Chat.on('change:previewMessage', async event => {
    if(event.isGroup && event.previewMessage && event.previewMessage.type=='gp2' && event.previewMessage.subtype =='add' && event.previewMessage.recipients && event.previewMessage.recipients.map(x=>x._serialized).includes(Store.Me.wid._serialized)) {
      const tdiff = (Date.now()-Store.Msg.get(event.previewMessage.id._serialized).t*1000)/1000;
      if(tdiff<10.0) {
        console.log('added', tdiff,'seconds ago')
        await WAPI.sendSeen(event.id);
        callback(WAPI._serializeChatObj(Store.Chat.get(event.id)));
      } else console.log('Not a new group add', event.id._serialized)
    }
  })
  return true;
}

/**
 * Reads buffered new messages.
 * @returns {Array}
 */
window.WAPI.getBufferedNewMessages = function () {
  let bufferedMessages = window._WAPI._newMessagesBuffer;
  window._WAPI._newMessagesBuffer = [];
  return bufferedMessages;
};
/** End new messages observable functions **/

/** Joins a group via the invite link, code, or message
 * @param link This param is the string which includes the invite link or code. The following work:
 * - Follow this link to join my WA group: https://chat.whatsapp.com/DHTGJUfFJAV9MxOpZO1fBZ
 * - https://chat.whatsapp.com/DHTGJUfFJAV9MxOpZO1fBZ
 * - DHTGJUfFJAV9MxOpZO1fBZ
 * @returns Promise<string | boolean> Either false if it didn't work, or the group id.
 */
//window.WAPI.joinGroupViaLink = async function(link){
//  return await Store.WapQuery.acceptGroupInvite(link.split('\/').pop()).then(res=>res.status===200?res.gid._serialized:res.status);
//  let code = link;
//  //is it a link? if not, assume it's a code, otherwise, process the link to get the code.
//  if(link.includes('chat.whatsapp.com')) {
//    if(!link.match(/chat.whatsapp.com\/([\w\d]*)/g).length) return false;
//    code = link.match(/chat.whatsapp.com\/([\w\d]*)/g)[0].replace('chat.whatsapp.com\/','');
//  }
//  const group = await Store.GroupInvite.joinGroupViaInvite(code);
//  if(!group.id) return false;
//  return group.id._serialized
//}

window.WAPI.sendImage = async function (imgBase64, chatid, filename, caption, quotedMsg, waitForId, type) {
  let extras = {};
  if(quotedMsg) {
    if (typeof quotedMsg !== "object") quotedMsg = Store.Msg.get(quotedMsg);
    extras = {
      quotedParticipant: quotedMsg.author || quotedMsg.from,
      quotedStanzaID:quotedMsg.id.id
    };
  }

  var chat = chatid.id ? chatid : Store.Chat.get(chatid);
  var chatId = chat.id._serialized;
  var msgIveSent = chat.msgs.filter(msg => msg.__x_isSentByMe)[0];
  if(!msgIveSent) return "ERROR: not a valid chat";
  var tempMsg = Object.create(msgIveSent);
  var newId = window.WAPI.getNewMessageId(chatId);
  var extend = {
    ack: 0,
    id: newId,
    local: !0,
    self: "out",
    t: parseInt(new Date().getTime() / 1000),
    to: new Store.WidFactory.createWid(chatId),
    isNewMsg: !0,
    type: type,
    caption,
    ...extras
  };

  Object.assign(tempMsg, extend);

  await Store.Chat.find(chatid).then(async (chat) => {
    var mediaBlob = window.WAPI.base64ImageToFile(imgBase64, filename);
    return await window.WAPI.procFiles(chat,mediaBlob).then(async mc => {
      var media = mc.models[0];
      if (type != undefined && type != '') media.mediaPrep._mediaData.type = type;
      return await media.sendToChat(chat, { caption,...extras })
    });
  }
  )

  return newId._serialized;
}

window.WAPI.base64ToFile = function(base64, filename) {
  var arr = base64.split(',');
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = window.Base64 ? window.Base64.atob(arr[1]) : atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, {
    type: mime,
  });
}

window.WAPI.sendFile = async function(imgBase64, chatid, filename, caption, type, quotedMsg) {
  let chat = await WAPI.getExistentChat(chatid);
  if(!chat) { return 'ERROR: not a valid chat'; }

  type = type ? type : 'sendFile';

  let extras = {};
  if(quotedMsg) {
    if (typeof quotedMsg !== "object") quotedMsg = Store.Msg.get(quotedMsg);
    extras = {
      quotedMsg,
      quotedParticipant: quotedMsg.author || quotedMsg.from,
      quotedStanzaID:quotedMsg.id.id
    };
  }

  if (
    (typeof filename != 'string' && filename != null) ||
    (typeof caption != 'string' && caption != null)
  ) {
    var text = 'incorrect parameter, insert an string.';
    return WAPI.scope(chatid, true, null, text);
  }
  var mime = imgBase64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
  if (mime && mime.length) {
    mime = mime[1];
  }
  chat = await WAPI.sendExist(chatid);
  if (chat.erro === false || chat.__x_id) {
    if(chat.__x_id._serialized !== chatid) { return 'ERROR: not a valid Whatsapp'; }
    var ListChat = await Store.Chat.get(chatid);
    var mediaBlob = WAPI.base64ToFile(imgBase64, filename),
      mediaCollection = await WAPI.procFiles(chat, mediaBlob),
      media = mediaCollection.models[0],
      result = await Promise.all(
        ListChat ? await media.sendToChat(chat, { caption: caption, ...extras }) : ''
      );
    result = result.join('');
    var m = { type: type, filename: filename, text: caption, mimeType: mime },
      To = await WAPI.getchatId(chat.id);
    if (result === 'success' || result === 'OK') {
      var obj = WAPI.scope(To, false, result, null);
      Object.assign(obj, m);
      return obj;
    } else {
      var obj = WAPI.scope(To, true, result, null);
      Object.assign(obj, m);
      return obj;
    }
  } else {
    return chat;
  }
}

window.WAPI.getHost = async function() {
  const fromwWid = await Store.MaybeMeUser.getMaybeMeUser();
  const idUser = await WAPI.sendExist(fromwWid._serialized);
  const infoUser = await Store.MyStatus.getStatus(idUser);
  return await WAPI._serializeChatObj(infoUser)
}

window.WAPI.scope = function(id, erro, status, text = null, result = null) {
  const object = {
    me: WAPI.getHost(),
    to: id,
    erro: erro,
    text: text,
    status: status,
    result: result
  };
  return object;
}

window.WAPI.getchatId = async function(chatId) {
  if (chatId) {
    let to = await WAPI.getChatById(chatId);
    if (to && typeof to === 'object') {
      let objTo = to.lastReceivedKey;
      if (objTo && typeof objTo === 'object') {
        let extend = {
          formattedName: to.contact.formattedName,
          isBusiness: to.contact.isBusiness,
          isMyContact: to.contact.isMyContact,
          verifiedName: to.contact.verifiedName,
          pushname: to.contact.pushname,
          isOnline: to.isOnline
        };
        Object.assign(objTo, extend);
        return objTo;
      }
    }
  }
  return undefined;
}

window.WAPI.sendCheckType = async function(chatId = undefined) {
  if (!chatId) {
    return WAPI.scope(chatId, true, 404, 'It is necessary to pass a number!');
  }
  if (typeof chatId === 'string') {
    const contact = '@c.us';
    const broadcast = '@broadcast';
    const grup = '@g.us';
    if (
      contact !== chatId.substr(-contact.length, contact.length) &&
      broadcast !== chatId.substr(-broadcast.length, broadcast.length) &&
      grup !== chatId.substr(-grup.length, grup.length)
    ) {
      return WAPI.scope(
        chatId,
        true,
        404,
        'The chat number must contain the parameters @c.us, @broadcast or @g.us. At the end of the number!'
      );
    }
    if (
      contact === chatId.substr(-contact.length, contact.length) &&
      ((chatId.match(/(@c.us)/g) && chatId.match(/(@c.us)/g).length > 1) ||
        !chatId.match(/^(\d+(\d)*@c.us)$/g))
    ) {
      return WAPI.scope(
        chatId,
        true,
        404,
        'incorrect parameters! Use as an example: 000000000000@c.us'
      );
    }

    if (
      broadcast === chatId.substr(-broadcast.length, broadcast.length) &&
      ((chatId.match(/(@broadcast)/g) &&
        chatId.match(/(@broadcast)/g).length > 1) ||
        !chatId.match(/^(\d+(\d)*@broadcast)$/g))
    ) {
      return WAPI.scope(
        chatId,
        true,
        404,
        'incorrect parameters! Use as an example: 0000000000@broadcast'
      );
    }

    if (
      grup === chatId.substr(-grup.length, grup.length) &&
      chatId.match(/(@g.us)/g) &&
      chatId.match(/(@g.us)/g).length > 1
    ) {
      return WAPI.scope(
        chatId,
        true,
        404,
        'incorrect parameters! Use as an example: 00000000-000000@g.us or 00000000000000@g.us'
      );
    }
  }
}

window.WAPI.sendExist = async function(chatId, returnChat = true, Send = true) {
  const checkType = WAPI.sendCheckType(chatId);
  if (!!checkType && checkType.status === 404) {
    return checkType;
  }
  let ck = await window.WAPI.checkNumberStatus(chatId, false);

  if (
    ck.status === 404 &&
    !chatId.includes('@g.us') &&
    !chatId.includes('@broadcast')
  ) {
    return WAPI.scope(chatId, true, ck.status, 'The number does not exist');
  }

  let chat =
    ck && ck.id && ck.id._serialized
      ? await window.WAPI.getChat(ck.id._serialized)
      : undefined;

  if (ck.numberExists && chat === undefined) {
    var idUser = new window.Store.UserConstructor(chatId, {
      intentionallyUsePrivateConstructor: true
    });
    chat = await Store.Chat.find(idUser);
  }

  if (!chat) {
    const storeChat = await window.Store.Chat.find(chatId);
    if (storeChat) {
      chat =
        storeChat && storeChat.id && storeChat.id._serialized
          ? await window.WAPI.getChat(storeChat.id._serialized)
          : undefined;
    }
  }

  if (!ck.numberExists && !chat.t && chat.isUser) {
    return WAPI.scope(chatId, true, ck.status, 'The number does not exist');
  }

  if (!ck.numberExists && !chat.t && chat.isGroup) {
    return WAPI.scope(
      chatId,
      true,
      ck.status,
      'The group number does not exist on your chat list, or it does not exist at all!'
    );
  }

  if (
    !ck.numberExists &&
    !chat.t &&
    chat.id &&
    chat.id.user != 'status' &&
    chat.isBroadcast
  ) {
    return WAPI.scope(
      chatId,
      true,
      ck.status,
      'The transmission list number does not exist on your chat list, or it does not exist at all!'
    );
  }

  if (!chat) {
    return WAPI.scope(chatId, true, 404);
  }

  if (Send) {
    await window.Store.SendSeen(chat, false);
  }

  if (returnChat) {
    return chat;
  }

  return WAPI.scope(chatId, false, 200);
}


/**
 * This function sts the profile name of the number.
 * 
 * Please note this DOES NOT WORK ON BUSINESS ACCOUNTS!
 * 
 * @param newName - string the new name to set as profile name
 */
window.WAPI.setMyName = async function (newName) {
  return await Store.Perfil.setPushname(newName);
}

/**
 * This function sets the profile picture of the number.
 * 
 * Receives an Object built with two images
 * 
 * @param obj - object with two images One Small 96x96 - One Big 640x640
 * @param id - WhatsApp Id to change the Image
 */
window.WAPI.setProfilePic = async function (b64X96, b64X640, id) {
  let obj = { a: b64X640, b: b64X96 };
  if (!id) { id = Store.Me.attributes.wid._serialized; }
  return await Store.Profile.sendSetPicture(id, obj.b, obj.a);
}

/** Change the icon for the group chat
 * @param groupId 123123123123_1312313123@g.us The id of the group
 * @param imgData 'data:image/jpeg;base64,...` The base 64 data uri
 * @returns boolean true if it was set, false if it didn't work. It usually doesn't work if the image file is too big.
 */
window.WAPI.setGroupIcon = async function(groupId, imgData) {
  const {status} = await Store.WapQuery.sendSetPicture(groupId,imgData,imgData);
  return status==200;
}

/**
 * Update your status
 *   @param newStatus string new Status
 */
window.WAPI.setMyStatus = function (newStatus) {
  return Store.MyStatus.setMyStatus(newStatus)
}

window.WAPI.sendVideoAsGif = async function (imgBase64, chatid, filename, caption, quotedMsg) {
  let extras = {};
  if(quotedMsg){
    if (typeof quotedMsg !== "object") quotedMsg = Store.Msg.get(quotedMsg);
    extras = {
      quotedMsg,
      quotedParticipant: quotedMsg.author || quotedMsg.from,
      quotedStanzaID:quotedMsg.id.id
    };
  }
  // create new chat
  return await Store.Chat.find(chatid).then(async (chat) => {
    var mediaBlob = window.WAPI.base64ImageToFile(imgBase64, filename);
    var mc = new Store.MediaCollection(chat);
    return await window.WAPI.procFiles(chat,mediaBlob).then(async mc => {
      var media = mc.models[0];
      media.mediaPrep._mediaData.isGif = true;
      media.mediaPrep._mediaData.gifAttribution = 1;
      await media.mediaPrep.sendToChat(chat, { caption,...extras });
      return chat.lastReceivedKey._serialized;
    });
  });
}

//window.WAPI.refreshBusinessProfileProducts = async function (){
//  await Promise.all(Store.BusinessProfile.models.map(async x=>{
//    try{
//      await Store.Catalog.findCarouselCatalog(x.id._serialized)
//    } catch(error){}
//  }));
//  return true;
//}

/**
 * Find any product listings of the given number. Use this to query a catalog
 *
 * @param id id of buseinss profile (i.e the number with @c.us)
 * @returns None
 */
//window.WAPI.getBusinessProfilesProducts = async function (id) {
//  try{
//    if(!Store.Catalog.get(id)) await Store.Catalog.findCarouselCatalog(id)
//    const catalog = Store.Catalog.get(id);
//    if (catalog.productCollection && catalog.productCollection._models.length)
//      return JSON.parse(JSON.stringify(catalog.productCollection._models));
//    else return [];
//  } catch(error){
//    return false;
//  }
//};


window.WAPI.procFiles= async function(chat, blobs) {
  if (!Array.isArray(blobs)) {
    blobs = [blobs];
  }
  const mediaCollection = new Store.MediaCollection(chat);
  await mediaCollection.processFiles(
    Debug.VERSION === '0.4.613'
    ? blobs
    : blobs.map((blob) => {
      return {
        file: blob,
      };
    }),
    chat,
    1
  );
  return mediaCollection;
}
/**
 * Sends product with image to chat
 * @param imgBase64 Base64 image data
 * @param chatid string the id of the chat that you want to send this product to
 * @param caption string the caption you want to add to this message
 * @param bizNumber string the @c.us number of the business account from which you want to grab the product
 * @param productId string the id of the product within the main catalog of the aforementioned business
 * @returns 
 */
//window.WAPI.sendImageWithProduct = async function (imgBase64, chatid, caption, bizNumber, productId) {
//  await WAPI.refreshBusinessProfileProducts();
//  return await Store.Catalog.findCarouselCatalog(bizNumber).then(async cat => {
//    if (cat && cat[0]) {
//      const product = cat[0].productCollection.get(productId);
//      const temp = {
//        productMsgOptions: {
//          businessOwnerJid: product.catalogWid.toString({
//            legacy: !0
//          }),
//          productId: product.id.toString(),
//          url: product.url,
//          productImageCount: product.productImageCollection.length,
//          title: product.name,
//          description: product.description,
//          currencyCode: product.currency,
//          priceAmount1000: product.priceAmount1000,
//          type: "product"
//        },
//        caption
//      }
//
//      // var idUser = new Store.WidFactory.createWid(chatid);
//
//      return Store.Chat.find(chatid).then(async (chat) => {
//        var mediaBlob = window.WAPI.base64ImageToFile(imgBase64, "filename.jpg");
//        // var mc = new Store.MediaCollection(chat);
//        // mc.processFiles([mediaBlob], chat, 1)
//        return await window.WAPI.procFiles(chat,mediaBlob).then(async mc => {
//          var media = mc.models[0];
//          Object.entries(temp.productMsgOptions).map(([k, v]) => media.mediaPrep._mediaData[k] = v)
//          await media.mediaPrep.sendToChat(chat, temp);
//          return chat.lastReceivedKey._serialized;
//        });
//      });
//    }
//  })
//}

window.WAPI.base64ImageToFile = function (b64Data, filename) {
  var arr = b64Data.split(',');
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = window.Base64 ? window.Base64.atob(arr[1]) : atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
};

/**
 * Send contact card to a specific chat using the chat ids
 *
 * @param {string} to '000000000000@c.us'
 * @param {string|array} contact '111111111111@c.us' | ['222222222222@c.us', '333333333333@c.us, ... 'nnnnnnnnnnnn@c.us']
 */
window.WAPI.sendContact = function (to, contact) {
  if (!Array.isArray(contact)) {
    contact = [contact];
  }
  contact = contact.map((c) => {
    return WAPI.getChat(c).__x_contact;
  });

  if (contact.length > 1) {
    window.WAPI.getChat(to).sendContactList(contact);
  } else if (contact.length === 1) {
    window.WAPI.getChat(to).sendContact(contact[0]);
  }
};

/**
 * Ghost forwarding is like a normal forward but as if it were sent from the host phone.
 */
window.WAPI.ghostForward = async function(chatId, messageId) {
  if(!chatId.includes('@g')&&!chatId.includes('@c')) return false;
  var chat = Store.Chat.get(chatId);
  if(!Store.Msg.get(messageId)) return false;
  var tempMsg = Object.create(Store.Msg.get(messageId));
  var newId = window.WAPI.getNewMessageId(chatId);
  var extend = {
    ...JSON.parse(JSON.stringify(tempMsg)),
    ack: 0,
    id: newId,
    local: !0,
    self: "out",
    t: parseInt(new Date().getTime() / 1000),
    to: new Store.WidFactory.createWid(chatId),
    from: Store.Me.wid,
    isNewMsg: true
  };
  Object.assign(tempMsg, extend);
  const res = await Promise.all(Store.addAndSendMsgToChat(chat, extend))
  return res[1]=='success';
}


/**
 * Forward an array of messages to a specific chat using the message ids or Objects
 *
 * @param {string} to '000000000000@c.us'
 * @param {string|array[Message | string]} messages this can be any mixture of message ids or message objects
 * @param {boolean} skipMyMessages This indicates whether or not to skip your own messages from the array
 */
window.WAPI.forwardMessages = async function (to, messages, skipMyMessages) {
  if (!Array.isArray(messages)) {
    messages = [messages];
  }
  const finalForwardMessages = messages.map(msg => {
    if (typeof msg == 'string') {
      //msg is string, get the message object
      return window.Store.Msg.get(msg);
    } else {
      return window.Store.Msg.get(msg.id);
    }
  }).filter(msg => skipMyMessages ? !msg.__x_isSentByMe : true);

  // let userId = new window.Store.UserConstructor(to);
  let conversation = window.Store.Chat.get(to);
  return await conversation.forwardMessages(finalForwardMessages)
};

/**
 * Create an chat ID based in a cloned one
 *
 * @param {string} chatId '000000000000@c.us'
 */
window.WAPI.getNewMessageId = async function (chatId) {
  const chat = await WAPI.sendExist(chatId);
  if (chat.id) {
    const newMsgId = new Object();
    newMsgId.fromMe = true;
    newMsgId.id = await WAPI.getNewId().toUpperCase();
    newMsgId.remote = new Store.WidFactory.createWid(chat.id._serialized);
    newMsgId._serialized = `${newMsgId.fromMe}_${newMsgId.remote}_${newMsgId.id}`;
    const Msgkey = new Store.MsgKey(newMsgId);
    return Msgkey;
  } else {
    return false;
  }
};


/**
 * Simulate '...typing' in the chat.
 *
 * @param {string} chatId '000000000000@c.us'
 * @param {boolean} on true to turn on similated typing, false to turn it off //you need to manually turn this off.
 */
window.WAPI.simulateTyping = async function (chatId, on) {
  if (on) Store.ChatStates.sendChatStateComposing(chatId)
  else Store.ChatStates.sendChatStatePaused(chatId)
  return true
};

/**
 * Send location
 *
 * @param {string} chatId '000000000000@c.us'
 * @param {string} lat latitude
 * @param {string} lng longitude
 * @param {string} loc Text to go with the location message
 */
window.WAPI.sendLocation = async function (chatId, lat, lng, loc) {
  loc = loc || '';
  var chat = Store.Chat.get(chatId);
  if(!chat) return false;
  var tempMsg = Object.create(Store.Msg.models.filter(msg => msg.__x_isSentByMe && !msg.quotedMsg)[0]);
  var newId = window.WAPI.getNewMessageId(chatId);
  var extend = {
    ack: 0,
    id: newId,
    local: !0,
    self: "out",
    t: parseInt(new Date().getTime() / 1000),
    to: chatId,
    isNewMsg: !0,
    type: "location",
    lat,
    lng,
    loc,
    clientUrl:undefined,
    directPath:undefined,
    filehash:undefined,
    uploadhash:undefined,
    mediaKey:undefined,
    isQuotedMsgAvailable:false,
    invis:false,
    mediaKeyTimestamp:undefined,
    mimetype:undefined,
    height:undefined,
    width:undefined,
    ephemeralStartTimestamp:undefined,
    body:undefined,
    mediaData:undefined,
    isQuotedMsgAvailable: false
  };
  Object.assign(tempMsg, extend);
  return (await Promise.all(Store.addAndSendMsgToChat(chat, tempMsg)))[1]==='success' ? newId._serialized : false;
};

/**
 * Send VCARD
 *
 * @param {string} chatId '000000000000@c.us'
 * @param {string} vcard vcard as a string
 * @param {string} contactName The display name for the contact. CANNOT BE NULL OTHERWISE IT WILL SEND SOME RANDOM CONTACT FROM YOUR ADDRESS BOOK.
 * @param {string} contactNumber If supplied, this will be injected into the vcard (VERSION 3 ONLY FROM VCARDJS) with the WA id to make it show up with the correct buttons on WA.
 */
//window.WAPI.sendVCard = async function (chatId, vcard, contactName, contactNumber) {
//  var chat = Store.Chat.get(chatId);
//  var tempMsg = Object.create(Store.Msg.models.filter(msg => msg.__x_isSentByMe && !msg.quotedMsg)[0]);
//  var newId = window.WAPI.getNewMessageId(chatId);
//  var extend = {
//    ack: 0,
//    id: newId,
//    local: !0,
//    self: "out",
//    t: parseInt(new Date().getTime() / 1000),
//    to: chatId,
//    isNewMsg: !0,
//    type: "vcard",
//    clientUrl:undefined,
//    directPath:undefined,
//    filehash:undefined,
//    uploadhash:undefined,
//    mediaKey:undefined,
//    isQuotedMsgAvailable:false,
//    invis:false,
//    mediaKeyTimestamp:undefined,
//    mimetype:undefined,
//    height:undefined,
//    width:undefined,
//    ephemeralStartTimestamp:undefined,
//    body:contactNumber?vcard.replace('TEL;TYPE=WORK,VOICE:',`TEL;TYPE=WORK,VOICE;waid=${contactNumber}:`):vcard,
//    mediaData:undefined,
//    isQuotedMsgAvailable: false,
//    subtype: contactName
//  };
//  Object.assign(tempMsg, extend);
//  return (await Promise.all(Store.addAndSendMsgToChat(chat, tempMsg)))[1]=="success"
//};
//
window.WAPI.reply = async function (chatId, body, quotedMsg) {
  let chat = await WAPI.getExistentChat(chatId);
  if(!chat) { return WAPI.sendMessageToID(chatId, body); }

  if (typeof quotedMsg !== "object") quotedMsg = await window.WAPI.getMessageById(quotedMsg, null, false);
  chat = await window.WAPI.sendExist(chatId);
  let quotedMsgOptions = {};

  if(!chat) return false;
  if(quotedMsg) {
    quotedMsgOptions = quotedMsg.msgContextInfo(chat);
  }

  const newId = await window.WAPI.getNewMessageId(chat.id._serialized);
  let inChat = await window.WAPI.getchatId(chatId).catch(() => {});
  if(inChat) {
    chat.lastReceivedKey._serialized = inChat._serialized;
    chat.lastReceivedKey.id = inChat.id;
  }

  const fromwWid = await Store.MaybeMeUser.getMaybeMeUser();

  const message = {
    id: newId,
    ack: 0,
    body: body,
    from: fromwWid,
    to: chat.id,
    local: !0,
    self: "out",
    t: parseInt(new Date().getTime() / 1000),
    isNewMsg: !0,
    type: "chat",
    ...quotedMsgOptions,
  };

  await Promise.all(window.Store.addAndSendMsgToChat(chat, message));
  return newId._serialized;
};

/**
 * Send Payment Request
 *
 * @param {string} chatId '000000000000@c.us'
 * @param {string} amount1000 The amount in base value / 10 (e.g 50000 in GBP = ??50)
 * @param {string} currency Three letter currency code (e.g SAR, GBP, USD, INR, AED, EUR)
 * @param {string} note message to send with the payment request
 */
window.WAPI.sendPaymentRequest = async function (chatId, amount1000, currency, noteMessage) {
  var chat = Store.Chat.get(chatId);
  var tempMsg = Object.create(Store.Msg.models.filter(msg => msg.__x_isSentByMe && !msg.quotedMsg)[0]);
  var newId = window.WAPI.getNewMessageId(chatId);
  var extend = {
    ack: 0,
    id: newId,
    local: !0,
    self: "out",
    t: parseInt(new Date().getTime() / 1000),
    to: chatId,
    isNewMsg: !0,
    type: "payment",
    subtype: "request",
    amount1000,
    requestFrom: chatId,
    currency,
    noteMessage,
    expiryTimestamp: parseInt(new Date(new Date().setDate(new Date().getDate() + 1)).getTime() / 1000)
  };
  Object.assign(tempMsg, extend);
  await Store.addAndSendMsgToChat(chat, tempMsg)
};



/**
 * Send Customized VCard without the necessity of contact be a WA Contact
 *
 * @param {string} chatId '000000000000@c.us'
 * @param {object|array} vcard { displayName: 'Contact Name', vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;Contact Name;;;\nEND:VCARD' } | [{ displayName: 'Contact Name 1', vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;Contact Name 1;;;\nEND:VCARD' }, { displayName: 'Contact Name 2', vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;Contact Name 2;;;\nEND:VCARD' }]
 */
//window.WAPI._sendVCard = function (chatId, vcard) {
//  var chat = Store.Chat.get(chatId);
//  var tempMsg = Object.create(Store.Msg.models.filter(msg => msg.__x_isSentByMe && !msg.quotedMsg)[0]);
//  var newId = window.WAPI.getNewMessageId(chatId);
//
//  var extend = {
//    ack: 0,
//    id: newId,
//    local: !0,
//    self: "out",
//    t: parseInt(new Date().getTime() / 1000),
//    to: chatId,
//    isNewMsg: !0,
//    isQuotedMsgAvailable:false,
//  };
//
//  if (Array.isArray(vcard)) {
//    Object.assign(extend, {
//      type: "multi_vcard",
//      vcardList: vcard
//    });
//
//    delete extend.body;
//  } else {
//    Object.assign(extend, {
//      type: "vcard",
//      subtype: vcard.displayName,
//      body: vcard.vcard
//    });
//
//    delete extend.vcardList;
//  }
//
//  Object.assign(tempMsg, extend);
//
//  Store.addAndSendMsgToChat(chat, tempMsg)
//};

/**
 * Block contact 
 * @param {string} id '000000000000@c.us'
 */
//window.WAPI.contactBlock = async function (id) {
//  const contact = window.Store.Contact.get(id);
//  if (contact !== undefined) {
//    await Store.Block.blockContact(contact)
//    return true;
//  }
//  return false;
//}
/**
 * Unblock contact 
 * @param {string} id '000000000000@c.us'
 */
//window.WAPI.contactUnblock = async function (id) {
//  const contact = window.Store.Contact.get(id);
//  if (contact !== undefined) {
//    await Store.Block.unblockContact(contact)
//    return true;
//  }
//  return false;
//}

/**
 * Remove participant of Group
 * @param {*} idGroup '0000000000-00000000@g.us'
 * @param {*} idParticipant '000000000000@c.us'
 */
//window.WAPI.removeParticipant = async function (idGroup, idParticipant) {
//  const chat = Store.Chat.get(idGroup);
//  const rm = chat.groupMetadata.participants.get(idParticipant);
//  await window.Store.Participants.removeParticipants(chat, [rm]);
//  return true;
//}


/**
 * Add participant to Group
 * @param {*} idGroup '0000000000-00000000@g.us'
 * @param {*} idParticipant '000000000000@c.us'
 */
//window.WAPI.addParticipant = async function (idGroup, idParticipant) {
//  const chat = Store.Chat.get(idGroup);
//  const add = Store.Contact.get(idParticipant);
//  await window.Store.Participants.addParticipants(chat, [add]);
//  return true;
//}

/**
 * Promote Participant to Admin in Group
 * @param {*} idGroup '0000000000-00000000@g.us'
 * @param {*} idParticipant '000000000000@c.us'
 */
//window.WAPI.promoteParticipant = async function (idGroup, idParticipant) {
//  const chat = Store.Chat.get(idGroup);
//  const promote = chat.groupMetadata.participants.get(idParticipant);
//  await window.Store.Participants.promoteParticipants(chat, [promote]);
//  return true;
//}

/**
 * Demote Admin of Group
 * @param {*} idGroup '0000000000-00000000@g.us'
 * @param {*} idParticipant '000000000000@c.us'
 */
//window.WAPI.demoteParticipant = async function (idGroup, idParticipant) {
//  await window.Store.WapQuery.demoteParticipants(idGroup, [idParticipant])
//  const chat = Store.Chat.get(idGroup);
//  const demote = chat.groupMetadata.participants.get(idParticipant);
//  await window.Store.Participants.demoteParticipants(chat, [demote])
//  return true
//
//}

/**
 * @private
 * Send Sticker
 * @param {*} sticker 
 * @param {*} chatId '000000000000@c.us'
 * @param metadata about the image. Based on [sharp metadata](https://sharp.pixelplumbing.com/api-input#metadata)
 */
//window.WAPI._sendSticker = async function (sticker, chatId, metadata) {
//  var chat = Store.Chat.get(chatId)
//  let stick = new window.Store.Sticker.modelClass();
//  stick.__x_clientUrl = sticker.clientUrl;
//  stick.__x_filehash = sticker.filehash;
//  stick.__x_id = sticker.filehash;
//  stick.__x_uploadhash = sticker.uploadhash;
//  stick.__x_mediaKey = sticker.mediaKey;
//  stick.__x_initialized = false;
//  stick.__x_mediaData.mediaStage = 'INIT';
//  stick.mimetype = 'image/webp';
//  stick.height = (metadata && metadata.height) ?  metadata.height : 512;
//  stick.width = (metadata && metadata.width) ?  metadata.width : 512;
//  await stick.initialize();
//  return await stick.sendToChat(chat);
//};

window.WAPI.getFileHash = async (data) => {
  let buffer = await data.arrayBuffer();
  var sha = new jsSHA("SHA-256", "ARRAYBUFFER");
  sha.update(buffer);
  return sha.getHash("B64");
};

window.WAPI.generateMediaKey = async (length) => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

/**
 * @param type: The type of file.  {'audio' | 'sticker' | 'video' | 'product' | 'document' | 'gif' | 'image' | 'ptt' | 'template' | 'history' | 'ppic'}
 * @param blob: file
 */
window.WAPI.encryptAndUploadFile = async function (type, blob) {	
  let filehash = await window.WAPI.getFileHash(blob);	
  let mediaKey = await window.WAPI.generateMediaKey(32);
  let controller = new AbortController();
  let signal = controller.signal;
  let encrypted = await window.Store.UploadUtils.encryptAndUpload({
    blob,
    type,
    signal,
    mediaKey
  });
  return {
    ...encrypted,
    clientUrl: encrypted.url,
    filehash,
    id: filehash,
    uploadhash: encrypted.encFilehash,
  };
};

/**
 * Send Image As Sticker
 * @param {*} imageBase64 A valid webp image is required.
 * @param {*} chatId '000000000000@c.us'
 * @param metadata about the image. Based on [sharp metadata](https://sharp.pixelplumbing.com/api-input#metadata)
 */
//window.WAPI.sendImageAsSticker = async function (imageBase64,chatId, metadata) {
//  let mediaBlob = await window.WAPI.base64ImageToFile(
//    'data:image/webp;base64,'+imageBase64,
//    'file.webp'
//  );
//  let encrypted = await window.WAPI.encryptAndUploadFile("sticker", mediaBlob);
//  return await window.WAPI._sendSticker(encrypted, chatId, metadata);
//};

/**
This will dump all possible stickers into the chat. ONLY FOR TESTING. THIS IS REALLY ANNOYING!!
*/
window.WAPI._STICKERDUMP = async function (chatId) {
  var chat = Store.Chat.get(chatId);
  let prIdx = await Store.StickerPack.pageWithIndex(0);
  await Store.StickerPack.fetchAt(0);        
  await Store.StickerPack._pageFetchPromises[prIdx];
  return await Promise.race(Store.StickerPack.models.forEach(pack=>pack.stickers.fetch().then(_=>pack.stickers.models.forEach(stkr => stkr.sendToChat(chat))))).catch(e=>{})
}


window.WAPI.getLastSeen = async function (id) {
  if(!Store.Chat.get(id)) return false;
  let {presence} = Store.Chat.get(id)
  await presence.subscribe();
  return presence.chatstate.t;
}

window.WAPI.getUseHereString = async function() { 
  if (!window.l10n.localeStrings['en']){
    const originalLocale = window.l10n.getLocale();
    await window.l10n.init('en');
    await window.l10n.init(originalLocale)
  } 
  return window.l10n.localeStrings[window.l10n.getLocale()][0][window.l10n.localeStrings.en[0].findIndex(x=>x.toLowerCase()==='use here')]
}

window.WAPI.getAmountOfLoadedMessages = function() {
  return Store.Msg.models.length;
}

WAPI.getChatWithNonContacts = async function(){
  return Store.Chat.models.map(chat=>chat.contact && !chat.contact.isMyContact ?chat.contact :null).filter(x=>x && !x.isGroup).map(WAPI._serializeContactObj)
}

window.WAPI.cutMsgCache = function (){
  Store.Msg.models.map(msg=>Store.Msg.remove(msg));
  return true;
}

window.WAPI.getHostNumber = function() {
  return WAPI.getMe().me.user;
}

//All of the following features can be unlocked using a license key: https://github.com/open-wa/wa-automate-nodejs#license-key
window.WAPI.getStoryStatusByTimeStamp = function(){return false;}
window.WAPI.deleteAllStatus = function(){return false;}
window.WAPI.getMyStatusArray = function(){return false;}
window.WAPI.deleteStatus = function(){return false;}
window.WAPI.setGroupToAdminsOnly = function(){return false;}
window.WAPI.setGroupEditToAdminsOnly = function(){return false;}
window.WAPI.postTextStatus = function(){return false;}
window.WAPI.postImageStatus = function(){return false;}
window.WAPI.postVideoStatus = function(){return false;}
window.WAPI.onRemovedFromGroup = function(){return false;}
window.WAPI.onContactAdded = function(){return false;}
window.WAPI.sendReplyWithMentions = function(){return false;}
window.WAPI.clearAllChats = function(){return false;}
window.WAPI.getCommonGroups = function(){return false;}
window.WAPI.setChatBackgroundColourHex = function(){return false;}
window.WAPI.darkMode = function(){return false;}
window.WAPI.onChatOpened = function(){return false;}
window.WAPI.onStory = function(){return false;}
window.WAPI.getStoryViewers = function(){return false;}
window.WAPI.onChatState = function(){return false;}
window.WAPI.getStickerDecryptable = function(){return false;}
window.WAPI.forceStaleMediaUpdate = function(){return false;}
window.WAPI.setGroupDescription = function(){return false;}
window.WAPI.setGroupTitle = function(){return false;}
window.WAPI.tagEveryone = function(){return false;}

/**
 * Patches
 */
window.WAPI.sendGiphyAsSticker = function(){return false;}
window.WAPI.getBlockedIds = function(){return false;}

window.WAPI.quickClean = function (ob) {
  var r = JSON.parse(JSON.stringify(ob));
  if(r.mediaData && Object.keys(r.mediaData).length==0) delete r.mediaData;
  if(r.chat && Object.keys(r.chat).length==0) delete r.chat;
  Object.keys(r).filter(k=>r[k]==""||r[k]==[]||r[k]=={}||r[k]==null).forEach(k=>delete r[k]);
  Object.keys(r).filter(k=>r[k]?r[k]._serialized:false).forEach(k=>r[k]=r[k]._serialized);
  Object.keys(r).filter(k=>r[k]?r[k].id:false).forEach(k=>r[k]=r[k].id);
  return r;
};

window.WAPI.pyFunc = async function (fn, done) {
  return done(await fn())
}

/**
 * If you're using WAPI.js outside of open-wa: https://github.com/open-wa/wa-automate-nodejs/ then you can use the following code to enable the locked features above if you've got a license keu.
 * 
 * THIS WILL NOT WORK OUT OF THE BOX. YOU WILL NEED TO DISAVLE CONTENT SECURITY POLICY (WHICH IS HIGHLY DISCOURAGED AND THE MAINTAINERS OF THIS CODE ASSUME NO RESPONSIBILITY FOR AY SECURITY VUNERABILITIES RESULTING IN DISABLING CSP)
 * 
 * This is meant to act as an example of how to enable new features in wapi.js. You should implement this outside of the WA WEB browser context.
 * 
 * Please use google to find out how to disable CSP. You can also use this extension: https://chrome.google.com/webstore/detail/disable-content-security/ieelmcmcagommplceebfedjlakkhpden/related?hl=en
 */
window.WAPI.addLicenseKey = async function (key){
  const pkgR =  await fetch('https://raw.githubusercontent.com/open-wa/wa-automate-nodejs/master/package.json');
  const pkg = await pkgR.json();
  const body = JSON.stringify({
    number: Store.Me.me._serialized,
    key
  });
  const r = await fetch(pkg.licenseCheckUrl, {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin', 
    redirect: 'follow',
    referrerPolicy: 'no-referrer', 
    body
  })
  const x = await r.text()
  return eval(x);
}

window.addEventListener("unload", window.WAPI._unloadInform, false);
window.addEventListener("beforeunload", window.WAPI._unloadInform, false);
window.addEventListener("pageunload", window.WAPI._unloadInform, false);

/**
 * Registers a callback to be called when a new message arrives the WAPI.
 * @param rmCallbackAfterUse - Boolean - Specify if the callback need to be executed only once
 * @param done - function - Callback function to be called when a new message arrives.
 * @returns {boolean}
 */
window.WAPI.waitNewMessages = function(rmCallbackAfterUse = true, done) {
  window.WAPI._newMessagesCallbacks.push({callback: done, rmAfterUse: rmCallbackAfterUse});
  return true;
};

/**
 * Reads buffered new messages.
 * @param done - function - Callback function to be called contained the buffered messages.
 * @returns {Array}
 */
window.WAPI.getBufferedNewMessages = function(done) {
  let bufferedMessages = window.WAPI._newMessagesBuffer;
  window.WAPI._newMessagesBuffer = [];
  if(done !== undefined) {
    done(bufferedMessages);
  }
  return bufferedMessages;
};


/**
 * New messages observable functions.
 */
window.WAPI._newMessagesQueue = [];
window.WAPI._newMessagesBuffer = (sessionStorage.getItem('saved_msgs') != null) ?
  JSON.parse(sessionStorage.getItem('saved_msgs')) : [];
window.WAPI._newMessagesDebouncer = null;
window.WAPI._newMessagesCallbacks = [];
window.Store.Msg.off('add');
sessionStorage.removeItem('saved_msgs');

window.WAPI._newMessagesListener = window.Store.Msg.on('add', (newMessage) => {
  if (newMessage && newMessage.isNewMsg) {
    if (newMessage.clientUrl == null || newMessage.clientUrl == undefined || newMessage.clientUrl == "") { newMessage.clientUrl = newMessage.deprecatedMms3Url; }

    let message = window.WAPI.processMessageObj(newMessage, true, false);
    if (message) {
      window.WAPI._newMessagesQueue.push(message);
      window.WAPI._newMessagesBuffer.push(message);
    }

    // Starts debouncer time to don't call a callback for each message if more than one message arrives
    // in the same second
    if(!window.WAPI._newMessagesDebouncer && window.WAPI._newMessagesQueue.length > 0) {
      window.WAPI._newMessagesDebouncer = setTimeout(() => {
        window.WAPI._newMessagesDebouncer = null;
        let queuedMessages = window.WAPI._newMessagesQueue;
        window.WAPI._newMessagesQueue = [];

        let removeCallbacks = [];
        window.WAPI._newMessagesCallbacks.forEach(function(callbackObj) {
          if(callbackObj.callback !== undefined) {
            callbackObj.callback(queuedMessages);
          }
          if(callbackObj.rmAfterUse === true) {
            removeCallbacks.push(callbackObj);
          }
        });

        // Remove removable callbacks.
        removeCallbacks.forEach(function(rmCallbackObj) {
          let callbackIndex = window.WAPI._newMessagesCallbacks.indexOf(rmCallbackObj);
          window.WAPI._newMessagesCallbacks.splice(callbackIndex, 1);
        });
      }, 1000);
    }
  }
})
/** End new messages observable functions **/
