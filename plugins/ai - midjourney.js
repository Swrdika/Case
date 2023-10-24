import fetch from 'node-fetch'

let handler = async ( m, { text } ) =>
{
          if (!text) throw m.reply(`Textnya mana?\nEx: image boy holding an apple`);
          let anu = `https://vihangayt.me/tools/midjourney?q=${text}`
          m.reply("Tunggu sebentar")
          let ann = await fetch(anu)
          conn.sendMessage(m.sender, ann, { caption: `Succes generate image with prompt\n${text}` } )
}
handler.help = ['image [query]']
handler.tags = [ 'main', 'ai' ]
handler.register = true
handler.command = /^image$/i


handler.login = true
handler.text = true
export default handler