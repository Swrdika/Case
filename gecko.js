require('./config')
const { blue, red, green, yellow } = require('chalk')
const { runtimes } = require('./lib/func')
const fetch = require('node-fetch')                 
const util = require('util')
const { exec } = require('child_process')
const ft = require('file-type')      
const fs = require('fs')  
const { sizeFormatter } = require("human-readable");        
const translate = require('translate-google-api')       
const oai = require('openai')                    
const rmbg = require('remove.bg')    
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)



module.exports = handle = async (conn, m) => {
  try {
    let body = m.body || "";
    let prefa = /['/', '.', '#', 'x', '!']/g;
    const isCreator = owner.map((v) => v.replace(/[^0-9]/g, "") + "@c.us").includes(m.author ? m.author : m.from);
    const gcOnly = m.id.remote.endsWith("g.us");
    const pcOnly = m.id.remote.endsWith("c.us");
    const participantsGroup = gcOnly ? (await m.getChat()).participants : "";
    const AdminFilter = gcOnly ? participantsGroup.filter((v) => v.isAdmin).map((v) => v.id.user) : "";
    const adminOnly = gcOnly ? AdminFilter.map((v) => v.replace(/[^0-9]/g, "") + "@c.us").includes(m.author ? m.author : m.from) : "";
    const botAdmin = gcOnly ? AdminFilter.map((v) => v.replace(/[^0-9]/g, "") + "@c.us").includes(m.author ? m.author: m.from) : "";
    const prefix = prefa.test(body) ? Object.entries(body)[0][1].replace(/[A-Za-z0-9]/g, ".") : ".";
    const command = body.startsWith(prefix) ? body.slice(1).split(" ").shift().toLowerCase() : "";
    const text = body.slice(command.length + 1, body.length);
    const isNumber = (m) => typeof x === "number" && !isNaN(m);
    if (gcOnly) {
      let user = global.db.users[m._data.id.participant];
      if (user) {
        if (!("afk" in user)) user.afk = -1;
        if (!("afk_info" in user)) user.afk_info = "";
        if (!("banned" in user)) user.banned = false;
        if (!("premium" in user)) user.premium = false;
        if (!isNumber(user.expired)) user.expired = 0;
        if (!isNumber(user.limit)) user.limit = 10;
      } else {
        global.db.users[m._data.id.participant] = {
          afk: -1,
          afk_info: "",
          banned: false,
          premium: false,
          expired: 0,
          limit: 25,
        };
      }
    } else {
      let user = global.db.users[m.from];
      if (user) {
        if (!("afk" in user)) user.afk = -1;
        if (!("afk_info" in user)) user.afk_info = "";
        if (!("banned" in user)) user.banned = false;
        if (!("premium" in user)) user.premium = false;
        if (!isNumber(user.expired)) user.expired = 0;
        if (!isNumber(user.limit)) user.limit = 10;
      } else {
        global.db.users[m.from] = {
          afk: -1,
          afk_info: "",
          banned: false,
          premium: false,
          expired: 0,
          limit: 25,
        };
      }
    }
    if (m.from.endsWith("g.us")) {
      let group = global.db.groups[m.from];
      if (group) {
        if (!("mute" in group)) group.mute = false;
        if (!("game" in group)) group.game = false;
        if (!("nsfw" in group)) group.game = false;
        if (!("welcome" in group)) group.welcome = true;
        if (!("textwel" in group)) group.textwel = "";
        if (!("textleft" in group)) group.textleft = "";
        if (!("antilink" in group)) group.member = false;
      } else {
        global.db.groups[m.from] = {
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
    mentionUser = [
      ...new Set([
        ...(m._data.mentionedJidList || []),
        ...(m._data.quotedMsg ? [m._data.quotedParticipant] : []),
      ]),
    ];
    for (let jid of mentionUser) {
      let user = global.db.users[jid];
      if (!user) continue;
      let afkTime = user.afk;
      if (!afkTime || afkTime < 0) continue;
      m.reply(`Jangan tag dia! Dia sedang AFK ${global.db.users[jid].afk_info ? "dengan alasan " + global.db.users[jid].afk_info : "tanpa alasan"}`.trim());
    }
    afk_jid = gcOnly ? m._data.id.participant : m.from;
    if (global.db.users[afk_jid].afk > 1) {
      global.db.users[afk_jid].afk = -1;
      m.reply("kamu telah berhenti afk");
    }
    syntax = require("syntax-error");
    if (command) {
      console.log(yellow(`\n===============\nFrom: `, m.notifyName, `\nCommand: `, m.body, `\nType:  Command`, `\n==========`))
    }
    else
    console.log(`\n===============\nFrom: `, m.notifyName, `\nPesan: `, m.body, `\nType:  Pesan`, `\n==========`)
    switch (command) {
        case 'test':
        m.reply("Connected")
        break


        case 'menu':
          let msg = `*List menu*

          - ping
          - status
          - infogempa
          - jadwalsholat
          - kick
          - hidetag
          - promote
          - demote
          - add
          `
          conn.sendMessage(m.from, msg, {
            extra:{
                ctwaContext: {
                       title: 'GeckoBot',
                       description: `Halo, Saya Gekko Bot`,
                       thumbnailUrl: `https://telegra.ph/file/23db68e05080f4e4cb216.jpg`,
                       sourceUrl: `https://github.com/Swrdika`,
                   }
               }
           })
        break
        case 'afk': {
          usr = global.db.users[afk_jid]
          usr.afk = await Date.now()
          usr.afk_info = text ? text : 'tanpa alasan'
          m.reply(m._data.notifyName + ' sedang afk karena ' + usr.afk_info)
          }
          break
        case 'ping': {
          let old = new Date()            
          await m.reply('Checking . . .')
          return m.reply(`Response Speed : ${((new Date - old)*1)}ms`)     
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
          let os = require("os");        
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
        text +=  `Library: whatsapp-web.js\n`    	    	
        text +=  `Status : ${global.db.setting.self}\n`    	
        text += `Speed : ${((new Date - old)*1)}ms\n`
        text += `Group : ` + arab.filter(v => v.id.server.endsWith('g.us')).map(v => v).length + `\n`   
        text += `Private chat : ` + arab.filter(v => v.id.server.endsWith('c.us')).map(v => v).length + `\n`
        text += `All chats : ` + arab.length + `\n`	    	   	    	
        await m.reply(text)        
          }
          break
          case 'infogempa': {
          await m.reply(util.format(JSON.parse(await require('cloudscraper').get('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json')).Infogempa.gempa).replace('{', '').replace('}', ''))
          }
          break
          case 'jadwalsholat':
          case 'sholat':
          case 'solat': {
          if (!text) return m.reply('contoh: ' + prefix + command + ' ponorogo')
          let B = await jdwlsolat(text.trim())
          let D = new Date
          txt = `Jadwal solat untuk wilayah` + text + ` hari ini\n` + readMore
          txt += `date: ` + D.toLocaleDateString('id-ld') + `\n`
          txt += `Imsyak: ` + B.imsyak + `\n`
          txt += `Subuh: ` + B.subuh + `\n`
          txt += `Terbit: ` + B.terbit + `\n`
          txt += `Dhuha: ` + B.dhuha + `\n`
          txt += `Dzuhur: ` + B.dzuhur + `\n`
          txt += `Ashr: ` + B.ashr + `\n`
          txt += `Maghrib: ` + B.maghrib + `\n`
          txt += `Isyak: ` + B.isya + `\n`
          txt += `Parameter: ` + B.parameter + `\n`
          m.reply(txt)           
          }
          break
          case 'lirik':
          case 'lyrics': {
          if (!text) return m.reply('judulnya ?')
          try {
          var { judul, thumb, lirik } = await liriks(text)
          await m.reply(await MessageMedia.fromUrl(thumb), false, { caption: `*` + judul + `*\n\n` + readMore + lirik });        
          } catch {}
          }
          break
          case 'join': {
          // from https://github.com/Ftwrr/botwaweb/blob/main/plugins/downloader-tiktok.js 1:1       
          if (!text) return m.reply('link gc nya ?')
          if (!isCreator) return m.reply('owner only')
          try {
          let linkRegex = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i
          let [_, code] = text.match(linkRegex) || []
        if (!code) return m.reply(`Input URL:\n${prefix + command} https://chat.whatsapp.com/E3XI3lj9wiDKWtqdikend7`);
        await x.acceptInvite(code)
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
          case 'nekopoi': {
          if (!text) return m.reply('query nya ?')
          try {
          var ok = await nekoparse(text)
          dwnld = '';
          for (let i of ok.download) {
          dwnld += i.name + `\n` + i.link + `\n` 
          }
          const buffer = Buffer.from(await (await fetch(ok.thumb)).arrayBuffer())
          await m.reply(new MessageMedia((await ft.fromBuffer(buffer)).mime, buffer.toString("base64")), false, { caption: ok.information });
          return m.reply(dwnld)
          } catch (E) {
          console.log(E)
          m.reply('eror tidak di ketahui coba beberapa saat lagi....')
          }
          }
          break
          case 'translate': 
          case 'tr': {
          if (!text) return m.reply(`Teksnya ?\nContoh: ${body} id Hi`)
          if (text && m._data.quotedMsg) {
          let lang = text.split` `[1]
          try {
              let data = m._data.quotedMsg.body
              let result = await translate(`${data}`, {
                 to: lang
              })
              m.reply(result[0])
          } catch {
              return m.reply(`Language code not supported.`)
          }
          } else if (text) {
          let lang = text.split` `[1]
          try {
              let data = body.slice(command.length + 4, body.length)
              let result = await translate(`${data}`, {
              to: lang
          })
              m.reply(result[0])
          } catch {
              return m.reply(`Language code not supported.`)
          }
          }        
          }
          break
          case 'owner':
          case 'creator': {
          await conn.sendMessage(m.from, '', { extra: {  body: 
          'BEGIN:VCARD\n' +
          'VERSION:3.0\n' +
          'N:;lui;;;\n' +
          'FN:lui berotak senku 😏\n' +
          'item1.TEL;waid=6282146092695:+62 821-4609-2695\n' +
          'item1.X-ABLabel:Ponsel\n' +
          'nitem2.EMAIL;type=Hubungi Saya lewat email:jlmao@students.prairiestate.edu\n' +
          'item3.URL;type=Follow instagram saya:https://instagram.com/ahmdlui\n' +
          'item3.X-ABLabel:Instagram\n' + 
          'item4.ADR:;;JAWA;;;;\n' + 
          'item4.X-ABLabel:Region\n' +
          'END:VCARD',
          type: 'vcard',  
          vCards: [
          'BEGIN:VCARD\n' +
          'VERSION:3.0\n' +
          'N:;lui;;;\n' +
          'FN:lui berotak senku 😏\n' +
          'item1.TEL;waid=6282146092695:+62 821-4609-2695\n' +
          'item1.X-ABLabel:Ponsel\n' +
          'nitem2.EMAIL;type=Hubungi saya lewat email:jlmao@students.prairiestate.edu\n' +
          'item3.URL;type=Follow instagram saya:https://instagram.com/ahmdlui\n' +
          'item3.X-ABLabel:Instagram\n' + 
          'item4.ADR:;;JAWA;;;;\n' + 
          'item4.X-ABLabel:Region\n' +
          'END:VCARD'
          ]
          }})
          }
          break        
          case 'self': {
          if (global.db.setting.self == 'self') return m.reply('Bot sudah self sebelumnya...')
          global.db.setting.self = 'self'
          m.reply('done!')
          }
          break
          case 'public': {
          if (global.db.setting.self == 'public') return m.reply('Bot sudah public sebelumnya...')
          global.db.setting.self = 'public'
          m.reply('done!')        
          }
          break
          case 'openai':
          case 'ai': {
          if (!text) return m.reply('teksnya ?')
          const { Configuration, OpenAIApi } = oai       
          const configuration = new Configuration({
              apiKey: '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'
           })
           const openai = new OpenAIApi(configuration)
           const json = await openai.createCompletion({
              model: "text-davinci-003",
              prompt: text,
              temperature: 0.7,
              max_tokens: 350,
              top_p: 1,
              frequency_penalty: 0,
              presence_penalty: 0,
           })
           if (json.statusText != 'OK' || json.data.choices.length == 0) return m.reply(m.chat, global.status.fail, m)
           m.reply(json.data.choices[0].text.trim())   
          } 
          break
          case 'pengumuman': 
          case 'tagall': {
          if (!gcOnly) return m.reply('grup only!')
          if (!text) return m.reply('pengumumannya apa?' + `\n` + 'Contoh: ' + command + ' admin gay')
          if (!adminOnly) return m.reply('admin only!')	         
        const participants = (await m.getChat()).participants.map(v => v.id._serialized);
         const mentions = await Promise.all(participants.map(jid => x.getChatById(jid)));
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
        const participants = (await m.getChat()).participants.map(v => v.id._serialized);
        const mentions = await Promise.all(participants.map(jid => m.getChatById(jid)));
        let teks = m.hasQuotedMsg ? m._data.quotedMsg.body : text
        conn.sendMessage(m.id.remote, teks, { mentions })     
          }
          break
          case 'tiktok':
          case 'tiktokdl':
          case 'tt': {
  // * from https://github.com/Ftwrr/botwaweb/blob/main/plugins/downloader-tiktok.js 1:1        
          if (!text) return m.reply('url?')
          const res = await fetch('https://developers.tiklydown.me/api/download?url=' + text)
          if (!res.ok) return m.reply(`${res.status} ${res.statusText}`);
          const data = await res.json()
          const buffVideo = Buffer.from(await (await fetch(data.video.noWatermark)).arrayBuffer())
          const buffAudio = Buffer.from(await (await fetch(data.music.play_url)).arrayBuffer())
          await m.reply(new MessageMedia((await ft.fromBuffer(buffVideo)).mime, buffVideo.toString("base64")), false, { caption: `*${data.author.name}*\n@${data.author.unique_id}`.trim() });
          m.reply( new MessageMedia((await ft.fromBuffer(buffAudio)).mime, buffAudio.toString("base64")));
          } 
          break
          case 'toimg': {
          let quotedMsg = await m.getQuotedMessage() || m;  
          let oke = (await quotedMsg.downloadMedia()) ? (await quotedMsg.downloadMedia()).data : false
          if (!oke) return m.reply('reply stiker (type: stiker require)')       
          await fs.writeFileSync('luimbps.webp', Buffer.from(oke, 'base64'))        
          exec(`ffmpeg -i luimbps.webp lui.jpeg`, async (err, stderr, stdout) => {
              if (err) return m.reply(`Convert failed!`)
          await m.reply(await MessageMedia.fromFilePath('./lui.jpeg'))
          fs.unlinkSync('./lui.jpeg')          
          fs.unlinkSync('./luimbps.webp')                                
          })
          }
          break
          case 'brainly': {
           if (!text) return m.reply('Soalnya ?')
           const { Brainly } = require("brainly-scraper-v2");
           const brain = new Brainly("id"); // 'id' - Default to 'id'
           let res = await brain.search(text, 'id')
           let no = 1
           let teks = ''
           for (let i of res) {
           teks += `${no++}. Soal: ${i.question.content}\n\nJawaban: ` + i.answers[0].content + `\n\n`
           }
           m.reply(teks)        
          }
          break
          case 'fb':
          case 'fbdl':
          case 'facebook':
          case 'facebookdl': {
          if (!text) return m.reply('url ?')
          let data = require('fg-ig')
          let json = await data(text)
          for (let i of json.url_list) {
          m.reply(await MessageMedia.fromUrl(i))	        
          }
          } 
          break
          case 'igdl':
          case 'instagram': 
          case 'ig': {
          if (!text) return m.reply('input url?' + `\n` + 'Contoh: ' + body + ' https://www.instagram.com/p/CqAkNPdpreQ/?igshid=YmMyMTA2M2Y=')
          let data = (await require('fg-ig')(text)).url_list
          for (let i of data) {
          const buffer = Buffer.from(await (await fetch(i)).arrayBuffer())
          await m.reply(new MessageMedia((await ft.fromBuffer(buffer)).mime, buffer.toString("base64")), false, { caption: 'type: ' + (await ft.fromBuffer(buffer)).mime });                
          }    
          }
          break       
          case 'nobg':
          case 'removebg': {        
          let quotedMsg = await m.getQuotedMessage() || m;  
          let oke = (await quotedMsg.downloadMedia()) ? (await quotedMsg.downloadMedia()).data : false
          if (!oke) return m.reply('send with caption or reply (type: image require)')       
          try {
        let outputFile = await './nobg-' + Math.floor(Math.random() * 10000) + '.png'
          await rmbg.removeBackgroundFromImageBase64({
          base64img: oke,
          apiKey: "3U9i55H7hjHgUJQ7PdjsFEfY",
          size: "regular",
          type: "person",
          outputFile 
          }).then(async () => {
          let results = await fs.readFileSync(outputFile, { encoding: 'base64' })
          m.reply(new MessageMedia('image/png', results, 'remove_bg.png'), false, {sendMediaAsDocument: true})      
          await fs.unlinkSync(outputFile)
          })
          } catch(E) {
          console.log(E)
          m.reply('eror coba dengan gambar lainnya...')
          } 
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
                        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
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
      }
  } catch (e) {
    console.log(e);
    m.reply("Maaf command sedang eror coba hubungi owner atau coba beberapa saat lagi....");
    await conn.sendMessage(owner, "Error Ditemukan, Logs", e)
  }
}
