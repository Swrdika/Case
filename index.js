console.clear()
console.log("Starting...")
const {
  MessageMedia,
  Chat,
  Message,
  Client,
  LocalAuth,
} = require("whatsapp-web.js");
const fs = require('fs')
const qrcode = require("qrcode-terminal");
const { platform } = require("os");
const gecko = require('./gecko')


global.conn = new Client({
  authStrategy: new LocalAuth(),
  playwright: {
    headless: true, // Tanpa membuka browser.
    devtools: false,
    args: [
        '--aggressive-tab-discard',
        '--disable-accelerated-2d-canvas',
        '--disable-application-cache',
        '--disable-cache',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-offline-load-stale-cache',
        '--disable-setuid-sandbox',
        '--disable-setuid-sandbox',
        '--disk-cache-size=0',
        '--ignore-certificate-errors',
        '--no-first-run',
        '--no-sandbox',
        '--no-zygote',
    ],
    bypassCSP: true,
  },
  markOnlineAvailable: true,
  qrMaxRetries: 6,
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15',
  takeoverTimeoutMs: 'Infinity'
});

conn.initialize();

conn.on("loading_screen", (percent) => {
  console.log(percent, "% Loaded");
});

conn.on("qr", (qrdata) => {
  qrcode.generate(qrdata, { small: true }, (qrbuffer) => {
    console.log(qrbuffer);
    console.log("Please scan");
  });
});

conn.on("auth_failure", () => {
  console.log("AUTHENTICATION FAILED");
});

conn.on("ready", () => {
  console.log("Connected")
  conn.sendMessage("6287840174790@c.us", "WhatsappBot Connected")
});

conn.on("group_join", async (mek) => {
  let mentions = Array(await conn.getChatById(mek.id.participant));
  await conn.sendMessage(mek.id.remote, `Welcome @${mek.id.participant.split("@")[0]}!`,
  {
      mentions: mentions,
      extra: {
        quotedParticipant: "6281111111111@c.us",
        quotedRemoteJid: "status@broadcast",
        quotedMsg: {
          type: "chat",
          body: require("moment-timezone")()
            .tz("Asia/Jakarta")
            .format("dddd, DD MMM YYYY HH:mm A Z"),
        },
        ctwaContext: {
          title: "Whatsapp Bot^",
          description: "create by lui",
          thumbnail: "",
          thumbnailUrl: "",
          mediaType: 1,
          mediaUrl: "",
          sourceUrl: "https://wa.me/stickerpack/luidep",
        },
      },
    }
  );
});

conn.on("group_leave", async (mek) => {
  let mentions = Array(await conn.getChatById(mek.id.participant));
  await conn.sendMessage(
    mek.id.remote,
    `Bye @${mek.id.participant.split("@")[0]}!`,
    {
      mentions: mentions,
      extra: {
        quotedParticipant: "6281111111111@c.us",
        quotedRemoteJid: "status@broadcast",
        quotedMsg: {
          type: "chat",
          body: require("moment-timezone")()
            .tz("Asia/Jakarta")
            .format("dddd, DD MMM YYYY HH:mm A Z"),
        },
        ctwaContext: {
          title: "Whatsapp Bot^",
          description: "create by lui",
          thumbnail: "",
          thumbnailUrl: "",
          mediaType: 1,
          mediaUrl: "",
          sourceUrl: "https://wa.me/stickerpack/luidep",
        },
      },
    }
  );
});

databased = async () => {
  if (!fs.existsSync(`./database.json`)) return {};
  const json = JSON.parse(fs.readFileSync(`./database.json`, "utf-8"));
  return json;
};

dbsaver = async (data) => {
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



// conn.on("message_create", async (message) => {
//     console.log(`${message.body}`)
// })

conn.on("message_create", async (message) => {
  var m = message
  try {
    require("./gecko")(conn, m)
  } catch (e) {
    console.log(e)
  }
})
