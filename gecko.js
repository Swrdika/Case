//=================================================================================================================================
import './config.js';
import fetch from 'node-fetch';
import util from 'util';
import { exec } from 'child_process';
import fs from 'fs';
import { sizeFormatter } from 'human-readable';
import chalk from 'chalk';
import os from 'os'
import meki from 'mywajs'
const { MessageMedia } = meki
const {
  red,
  blue,
  yellow,
  purple
} = chalk
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

export const handle = async (conn, m) => {
    try {
    let body = m.body || ''
    var prefix = prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : prefa ?? global.prefix
   //. const sender = m.id.participant || m._data.from._serialized || m._data.from || m.sender
    const from = m.id.remote
    const sender = m.id.participant || m._data.from._serialized || m._data.from || m.from
    const chat = m.from.endsWith('g.us') ? m.from : m.sender
    const text = m?.selectedButtonId || m?.selectedRowId || m?._data?.caption || m?._data?.body || m?.body || ''
    const pushname = m._data.notifyName
    const chat = m.sender.endsWith('g.us') ? m.sender : m.sender
    const isCreator = owner.map((v) => v.replace(/[^0-9]/g, "") + "@c.us").includes(m.author ? m.author : m.sender);
    const gcOnly = m.id.remote.endsWith("g.us");
    const pcOnly = m.id.remote.endsWith("c.us");
    const participantsGroup = gcOnly ? (await m.getChat()).participants : "";
    const AdminFilter = gcOnly ? participantsGroup.filter((v) => v.isAdmin).map((v) => v.id.user) : "";
    const adminOnly = gcOnly ? AdminFilter.map((v) => v.replace(/[^0-9]/g, "") + "@c.us").includes(m.author ? m.author : m.sender) : "";
    const botAdmin = gcOnly ? AdminFilter.map((v) => v.replace(/[^0-9]/g, "") + "@c.us").includes(m.author ? m.author: m.sender) : "";
    const command = body.startsWith(prefix) ? body.slice(1).split(" ").shift().toLowerCase() : "";
    const text = body.slice(command.length + 1, body.length);
    const isNumber = (m) => typeof x === "number" && !isNaN(m);
    
/*
=========================[ DB FUNCTION ]=========================
*/

  const databased = async () => {
  if (!fs.existsSync(`./database.json`)) return {};
  const json = JSON.parse(fs.readFileSync(`./database.json`, "utf-8"));
  return json;
};

const dbsaver = async (data) => {
  const database = data ? data : global.db;
  fs.writeFileSync(`./database.json`, JSON.stringify(database, null, 3));
};

const connect = async () => {
  let content = await databased();
  if (!content || Object.keys(content).length === 0) {
    global.db = {
      users: {},
      groups: {},
      setting: {},
    };
    await dbsaver();
  } else {
    global.db = content;
  }
};

connect().catch(() => connect());

setInterval(async () => {
  fs.writeFileSync(`./database.json`, JSON.stringify(global.db, null, 3));
}, 3 * 1000);

    if (gcOnly) {
      let user = global.db.users[m.sender];
      if (user) {
        if (!("banned" in user)) user.banned = false;
        if (!("premium" in user)) user.premium = false;
        if (!("registered" in user)) user.registered = false;
        if (!isNumber(user.expired)) user.expired = 0;
        if (!isNumber(user.level)) user.level = 0;
        if (!isNumber(user.limit)) user.limit = 10;
      } else {
        global.db.users[m.sender] = {
          banned: false,
          premium: false,
          registered: false,
          expired: 0,
          level: 0,
          limit: 10,
        };
      }
    } else {
      let user = global.db.data.users[m.sender];
     // let user = global.db.users[m.sender];
      if (user) {
        if (!("banned" in user)) user.banned = false;
        if (!("premium" in user)) user.premium = false;
        if (!("registered" in user)) user.registered = false;
        if (!isNumber(user.expired)) user.expired = 0;
        if (!isNumber(user.level)) user.level = 0;
        if (!isNumber(user.limit)) user.limit = 10;
      } else {
        global.db.users[m.sender] = {
          banned: false,
          premium: false,
          registered: false,
          expired: 0,
          level: 0,
          limit: 10,
        };
      }
    }
    if (m.sender.endsWith("g.us")) {
      let group = global.db.groups[m.from];
      if (group) {
        if (!("mute" in group)) group.mute = false;
        if (!("game" in group)) group.game = false;
        if (!("nsfw" in group)) group.nsfw = false;
        if (!("welcome" in group)) group.welcome = true;
        if (!("textwel" in group)) group.textwel = "";
        if (!("textleft" in group)) group.textleft = "";
        if (!("antilink" in group)) group.antilink = false;
      } else {
        global.db.groups[m.sender] = {
          mute: false,
          game: true,
          nsfw: false,
          welcome: true,
          textwel: "",
          textleft: "",
          antilink: false,
        };
      }
    }
    let setting = global.db.setting;
    if (setting) {
      if (!("groupmode" in setting)) setting.groupmode = true;
      if (!("self" in setting)) setting.self = "public";
    } else {
      global.db.setting = {
        self: "public",
      };
    }
    if (global.db.setting.self == "self" && !isCreator) {
      if (command) return;
    }
    let mentionUser = [new Set([(m._data.mentionedJidList || []), (m._data.quotedMsg ? [m._data.quotedParticipant] : []), ]), ];
    for (let jid of mentionUser) {
      let user = global.db.users[jid];
      if (!user) continue;
    }
    
/*
=========================[ DB FUNCTION ]=========================
*/

    if (body.startsWith("test")) {
    m.reply("Connected");
}
    switch (command) {
          case 'menu':
          case 'help': {
          let old = new Date()
          let fitur = 
`
Group Menu

- linkgc
- revoke
- add
- kick
- promote
- demote
- tagall
- hidetag
- pengumuman


Tools Menu

- tr / translate
- tt (downloader)
- fbdl (downloader)
- nekopoi (downlaoder)
- openai
- noimage
- speed
- owner


Owner Menu

- public / self
- =>
- >
- $
- *

`
          let message = `
B O T  S T A T S

Name:  Gekko-Bot
Platfrom:  ${os.platform}
Speed : ${((new Date - old)*1)}ms
Type:  ${os.type}
Library:  mywajs\n\n\n\n${fitur}
`

conn.sendMessage(m.sender, message, {
  extra:{
      ctwaContext: {
             title: 'Gekko-Bot',
             description: `Halo`,
             thumbnailUrl: `https://telegra.ph/file/23db68e05080f4e4cb216.jpg`,
             sourceUrl: `https://github.com/Swrdika`,
         }
     }
 })
          }
          
        break
        case 'ping': {
          let old = new Date()            
          await m.reply('Checking . . .')
          return m.reply(`Response Speed : ${((new Date - old)*1)}ms`)     
          } 
          break
          case 'ai': {
          if (!text) throw m.reply("Textnya mana?");
          let anu = `https://vihangayt.me/tools/chatgpt?q=${text}`
          m.reply("Tunggu sebentar")
          let ann = await fetch(anu)
          const hasil = await ann.json()
          m.reply(hasil.data)
          }
          break
          case 'status': {
          let arab = await conn.getChats()
          const formatSize = sizeFormatter({
                std: "JEDEC",
                decimalPlaces: "2",
                keepTrailingZeroes: false,
                render: (literal, symbol) => `${literal} ${symbol}B`,
                });               
                  let old = new Date()            
                  let text = "";
              text += `*HOST:*\n`;
              text += `Arch: ${os.arch()}\n`
              text += `Hostname: ${os.hostname()}\n`
              text += `Release: ${os.release()}\n`		
              text += `Type: ${os.type()}\n`
              text += `Machine: ${os.machine()}\n`	
              text += `Memory: ${formatSize(os.totalmem() - os.freemem())} / ${formatSize(os.totalmem())}\n`;    	    	
              text += `Platform: ${os.platform()}\n`;
              text += `Version: ${os.version()}\n\n`		
              text += `*BOT STAT:*\n`
              text +=  `Library: mywajs\n`    	    	
              text +=  `Status : ${global.db.setting.self}\n`    	
              text += `Speed : ${((new Date - old)*1)}ms\n`
              text += `Group : ` + arab.filter(v => v.id.server.endsWith('g.us')).map(v => v).length + `\n`   
              text += `Private chat : ` + arab.filter(v => v.id.server.endsWith('c.us')).map(v => v).length + `\n`
              text += `All chats : ` + arab.length + `\n`	    	   	    	
              await m.reply(text)
                }
          break
          case 'join': { 
          if (!text) return m.reply('link gc nya ?')
          if (!isCreator) return m.reply('owner only')
          try {
          let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
          let [_, code] = text.match(linkRegex) || []
        if (!code) return m.reply(`Input URL:\n${prefix + command} https://chat.whatsapp.com/E3XI3lj9wiDKWtqdikend7`);
        await conn.acceptInvite(code)
        } catch (e) {
          m.reply('terjadi kesalahan mungkin bot telah di keluarkan dari grup atau link yang anda masukan mungkin salah atau grup tersebut telah memperbarui linknya')
          console.log(e)
          }
          }       
          break       
          case 'linkgc': {
        m.reply('https://chat.whatsapp.com/' + await (await m.getChat()).getInviteCode())        
          }
          break
          case 'revoke': {
          if (!adminOnly) return m.reply('admin only!')
          if (!botAdmin) return m.reply('jadikan bot sebagai admin!')        
        await (await m.getChat()).revokeInvite()
        m.reply('https://chat.whatsapp.com/' + await (await m.getChat()).getInviteCode())   
          }
          break
          case 'kick':
          case 'add':
          case 'promote':
          case 'demote': {
          try {
          if (!gcOnly) return m.reply('grup only!')
          if (!adminOnly) return m.reply('admin only!')
          if (command == 'kick') {
          let numb = m._data.quotedParticipant ? m._data.quotedParticipant : text
         await (await m.getChat()).removeParticipants(Array(numb.replace(/[^0-9]/g, '') + '@c.us'))        
         return m.reply('done!')
          } else if (command == 'add') {
          let numb = m._data.quotedParticipant ? m._data.quotedParticipant : text        
         await (await m.getChat()).addParticipants(Array(numb.replace(/[^0-9]/g, '') + '@c.us'))        
         return m.reply('done!')     	    
          } else if (command == 'promote') {
          let numb = m._data.quotedParticipant ? m._data.quotedParticipant : text        
         await (await m.getChat()).promoteParticipants(Array(numb.replace(/[^0-9]/g, '') + '@c.us'))           
         return m.reply('done!')     	             
          } else if (command == 'demote') {
          let numb = m._data.quotedParticipant ? m._data.quotedParticipant : text        
         await (await m.getChat()).demoteParticipants(Array(numb.replace(/[^0-9]/g, '') + '@c.us'))                    
         return m.reply('done!')     	  
          }
          } catch (e) {
          console.log(e)
          m.reply(prefix + command + ' tag/reply/number')
          }   
          }
          break
          case 'owner':
          case 'creator': {
            let nowner = global.owner
          await conn.sendMessage(m.sender, '', { extra: {  body: `BEGIN:VCARD\nVERSION:3.0\nN:;owner;;;\nFN:Gusti Oka\nitem1.TEL;waid=${nowner}:${nowner}\nitem1.X-ABLabel:Ponsel\nnitem2.EMAIL;type=Niggerz:suwardikagusti500@gmail.com\nitem3.ADR:;;Tokyo;;;;\nitem3.X-ABLabel:Region\nEND:VCARD`,
          type: 'vcard',  
          vCards: [`BEGIN:VCARD\nVERSION:3.0\nN:;owner;;;\nFN:Gusti Oka\nitem1.TEL;waid=${nowner}:${nowner}\nitem1.X-ABLabel:Ponsel\nnitem2.EMAIL;type=Niggerz:suwardikagusti500@gmail.com\nitem3.ADR:;;Tokyo;;;;\nitem3.X-ABLabel:Region\nEND:VCARD`
          ]
          }})
          }
          break        

          case 'self': {
          if(!isCreator) return m.reply(mess.owner)
          if (global.db.setting.self == 'self') return m.reply('Bot sudah self sebelumnya...')
          global.db.setting.self = 'self'
          m.reply('done!')
          }
          break
          case 'public': {
          if(!isCreator) return m.reply(mess.owner)
          if (global.db.setting.self == 'public') return m.reply('Bot sudah public sebelumnya...')
          global.db.setting.self = 'public'
          m.reply('done!')        
          }
          break
          case 'pengumuman': 
          case 'tagall': {
          if (!gcOnly) return m.reply('grup only!')
          if (!text) return m.reply('pengumumannya apa?' + `\n` + 'Contoh: ' + command + ' admin gay')
          if (!adminOnly) return m.reply('admin only!')	         
        const participants = (await m.getChat()).participants.map(v => v.id._serialized);
         const mentions = await Promise.all(participants.map(jid => m.getChatById(jid)));
         let teks = ''
          teks += m.hasQuotedMsg ? m._data.quotedMsg.body : text
          teks += `\n` + readMore + `\n`
          for (let i of participants) {
          teks += `@${i.split('@')[0]}\n`
          }
          conn.sendMessage(m.id.remote, teks, { mentions })     
          }
          break
          case 'hidetag': {        
          if (!gcOnly) return m.reply('grup only!')
          if (!text) return m.reply('pengumumannya apa?' + `\n` + 'Contoh: ' + prefix + command + ' admin gay')
          if (!adminOnly) return m.reply('admin only!')	         
        const participants = (await conn.getChats()).participants.map(v => v.id._serialized);
        const mentions = await Promise.all(participants.map(jid => conn.getChatById(jid)));
        let teks = m.hasQuotedMsg ? m._data.quotedMsg.body : text
        conn.sendMessage(m.id.remote, teks, { mentions })     
          }
          break
        default:
                if (body.startsWith('=>')) {
                    if (!isCreator) return m.reply(mess.owner)
                    function Return(sul) {
                        sat = JSON.stringify(sul, null, 2)
                        bang = util.format(sat)
                            if (sat == undefined) {
                                bang = util.format(sul)
                            }
                            return m.reply(bang)
                    }
                    try {
                        m.reply(util.format(eval(`(async () => { return ${body.slice(3)} })()`)))
                    } catch (e) {
                        m.reply(String(e))
                    }
                }

                if (body.startsWith('>')) {
                    if (!isCreator) return m.reply(mess.owner)
                    try {
                        let evaled = await eval(body.slice(2))
                        if (typeof evaled !== 'string') evaled = util.inspect(evaled)
                        await m.reply(evaled)
                    } catch (err) {
                        await m.reply(String(err))
                    }
                  }

                if (body.startsWith('$')) {
                    if (!isCreator) return m.reply(mess.owner)
                    exec(body.slice(2), (err, stdout) => {
                        if (err) return m.reply(`${err}`)
                        if (stdout) return m.reply(stdout)
                    })
                }
                if (body.startsWith('*')) {
                  if (!isCreator) return m.reply(mess.owner)
                  exec(body.slice(2), (err, stdout) => {
                      if (err) return m.reply(`${err}`)
                      if (stdout) return m.reply(stdout)
                  })
              }
      }
  } catch (e) {
    console.log(e);
    conn.sendMessage("6287840174790@c.us", `Error Ditemukan\n\n_*${e}*_`)
    //m.reply(`Error Ditemukan\n\n_*${e}*_`)
  }
}

export const participantUpdate = async (conn, action) => {
try {
 let id = action.id.remote || action.participant.chatId
 let participants = action.recipientIds.map(v =>  v._serialized)  let chat = global.db.data.chats[id] || {}
 switch (action.type) {
   let groupMetadata = await conn.groupMetadata(id)|| {}
   case 'join':
   case 'add': {
     let pp = fs.readFileSync("./media/pp.jpg")
        try {
         pp = await conn.getProfilePict(user)
         } catch (e)
    conn.sendMessage(m.sender, pp, {caption: `Welcome To ${groupMetadata}`, mentions: [user]})
    }
    break
 
   case 'leave': {
   let pp = fs.readFileSync("./media/pp.jpg")
        try {
         pp = await conn.getProfilePict(user)
         } catch (e)
    conn.sendMessage(m.sender, pp, {caption: `${user} leaving from ${groupMetadata}`, mentions: [user]})
    }
    break
}
 
} catch (err) {
console.log(err)
}
}
