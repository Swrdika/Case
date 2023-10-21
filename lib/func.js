// * from https://github.com/Ftwrr/botwaweb/blob/main/lib/print.js 11:2
async function printMessage(m) {
  const {
    yellow,
    bgGreen,
    black,
    bgMagenta,
    bgBlue,
    red,
    bgCyan,
  } = require("colorette");
  const chat = await m.getChat();
  const contact = await m.getContact();
  console.log(
    `\n${black(bgGreen("%s"))} from ${black(bgMagenta("~ %s"))} ${black(
      bgCyan("%s")
    )} to ${black(bgMagenta("~ %s"))} ${black(bgBlue("%s"))}`,
    m.type,
    contact.name || contact.pushname,
    chat.isGroup ? m.author : m.from,
    chat.name,
    chat.id._serialized
  );
  console.log(
    m.error != null
      ? red(m.body)
      : m.isCommand
      ? yellow(m.body)
      : m.body
  );
}

module.exports = {
  printMessage
};
