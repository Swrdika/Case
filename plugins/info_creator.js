let handler  = async (m, { conn, command, args }) => {
  let type = (args[0] || '').toLowerCase()
  let _type = (args[0] || '').toLowerCase()

//------- NOMOR
 // let nowner = `${global.nomor.owner.split`@`[0]}@c.us`
   let nowner = `${global.nomor.owner}`
          await conn.sendMessage(m.sender, '', { extra: {  body: `BEGIN:VCARD\nVERSION:3.0\nN:;owner;;;\nFN:Gusti Oka\nitem1.TEL;waid=${nowner}:${nowner}\nitem1.X-ABLabel:Ponsel\nnitem2.EMAIL;type=Niggerz:suwardikagusti500@gmail.com\nitem3.ADR:;;Tokyo;;;;\nitem3.X-ABLabel:Region\nEND:VCARD`,
          type: 'vcard',  
          vCards: [`BEGIN:VCARD\nVERSION:3.0\nN:;owner;;;\nFN:Gusti Oka\nitem1.TEL;waid=${nowner}:${nowner}\nitem1.X-ABLabel:Ponsel\nnitem2.EMAIL;type=Niggerz:suwardikagusti500@gmail.com\nitem3.ADR:;;Tokyo;;;;\nitem3.X-ABLabel:Region\nEND:VCARD`
          ]
          }})}

handler.help = ['owner', 'creator']
handler.tags = ['main', 'info']
handler.command = /^(owner|creator)/i


handler.login = true
handler.text = true
export default handler 
