import fs from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
/*============== ɪɴꜰᴏ ᴏᴡɴᴇʀ ==============*/
global.nama = {
  owner: 'Gusti Oka',
  bot: 'Gecko'
}
/*============== WHATSAPP ==============*/
global.group = {
  id: '120363041058702901@g.us',
  ofcid: '62859106980383-1632727122@g.us',
  rpg: 'https://chat.whatsapp.com/CxIlUZlW3lD7eH4LLLWYoZ',
  gc1: 'https://chat.whatsapp.com/JKdIWr5fj990Ux2oqTjTo5',
  gc2: 'https://chat.whatsapp.com/C4Qax9BYH9Q2DbFeRQRmRD'
}
/*============== SOCIAL ==============*/
global.sosmed = {
  yt: 'https://m.youtube.com/channel/UCG_Xj6eHBMaW9HTHTya9q6w',
  ig: 'https://instagram.com/GustiOka/',
  fb: 'https://web.facebook.com/Gusti Oka/',
  gh: 'https://github.com/Swrdika/'
}
/*============== PAYMENT ==============*/
global.pay = { 
  dana: '087840174790',
  linkaja: '087840174790',
  pulsa: '087840174790',
  pulsa2: '089513602923' }
/*============== NOMOR ==============*/
global.nomor = {
  bot: '6281238142144', // Ganti dengan nomor botmu untuk di linking device.
  owner: '6287840174790',
  rowner: ['6287840174790'],
  mods: ['6287840174790'?
  ownerid: '6287840174790@c.us'
}
/*============== WATERMARK ==============*/
global.wm = {
  bot: 'GeckoBot - WhatsApp Bot',
  bot2: 'Created By moexti',
  bot3: '⫹⫺ Gecko',
  titlebot: `⫹⫺ Bot Whatsapp | By ${global.nama.bot}`,
  author: '     「 *Gusti Oka丨* 」'
}
/*============== LOGO ==============*/
global.logo = {
  thumb: 'https://telegra.ph/file/607ebb83d2308cbf01966.jpg',
  be: 'https://telegra.ph/file/607ebb83d2308cbf01966.jpg',
  imagebot: 'https://telegra.ph/file/607ebb83d2308cbf01966.jpg',
  giflogo: 'https://telegra.ph/file/a46ab7fa39338b1f54d5a.mp4',
  fla: 'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text='
}
/*============== TEXT ==============*/
global.teks = {
  wait: '```「▰▰▰▰▱▱▱▱▱▱」Loading...```',
  waits: ['```「▰▱▱▱▱▱▱▱▱▱」Loading...```','```「▰▰▱▱▱▱▱▱▱▱」Loading...```','```「▰▰▰▱▱▱▱▱▱▱」Loading...```','```「▰▰▰▰▱▱▱▱▱▱」Loading...```','```「▰▰▰▰▰▱▱▱▱▱」Loading...```'],
  eror: '```404 error```',
  rpg: `Fitur Rpg Dimatikan\nKetik *!enable* *rpg* untuk menggunakan fitur ini!\nKalo Mau main Disini aja\nhttps://chat.whatsapp.com/CxIlUZlW3lD7eH4LLLWYoZ`,
  nsfw: 'Fitur NSFW Dimatikan\nKetik *!enable* *nsfw* untuk menggunakan fitur ini!\n“Katakanlah kepada orang laki-laki yang beriman: Hendaklah mereka menahan pandanganya, dan memelihara kemaluannya; … Katakanlah kepada wanita yang beriman: Hendaklah mereka menahan pandangannya, dan kemaluannya, dan janganlah mereka Menampakkan perhiasannya, kecuali yang (biasa) nampak dari padany,” \n(TQS. Al-Nur [24]: 30-31).',
  ty: 'Jangan Lupa support kamu ya ♥️.',
  subs: 'Jangan liat doang, subscribe dulu dong.. \n https://m.youtube.com/channel/UCG_Xj6eHBMaW9HTHTya9q6w'
}
global.cooldown = 300000 // 5 menit
//------ JANGAN DIUBAH -----
let fileP = fileURLToPath(import.meta.url)
fs.watchFile(fileP, async () => {
    fs.unwatchFile(fileP)
    console.log(`Update File "${chalk.yellowBright(fileP)}"`)
    import(`${import.meta.url}?update=${Date.now()}`)
})