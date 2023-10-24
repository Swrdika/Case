import fetch from 'node-fetch'

let handler = async ( m, { text } ) =>
{
          if (!text) throw m.reply("Textnya mana?");
          let anu = `https://vihangayt.me/tools/chatgpt?q=${text}`
          m.reply("Tunggu sebentar")
          let ann = await fetch(anu)
          const hasil = await ann.json()
          m.reply(hasil.data)
}
handler.help = ['ai [query]']
handler.tags = [ 'main' ]
handler.register = true
handler.command = /^ai$/i


handler.login = true
handler.text = true
export default handler