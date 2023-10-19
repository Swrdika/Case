/**
 * Base dibuat oleh Gusti Oka
 * Jangan menjual sourcecode ini!
 * https://github.com/Swrdika/Gecko-Bot
 * 
 * Thanks to:
 * luii
 */
import pkg from 'mywajs';
const {
  Message,
  Client,
  LinkingMethod
} = pkg;
import fs from 'fs';
import { handle, participantUpdate } from "./gecko.js";
import moment from "moment-timezone";

global.conn = new Client({
      linkingMethod: new LinkingMethod({ // Perlu diketahui ini cuma work pakai Linux.
          phone: {
            number: "6281238142144" // Masuukan nomor kamu disini.
          },
        }),
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

conn.on("code", (code) => {
console.log("Code :", code)
})

conn.on("auth_failure", () => {
  console.log("AUTHENTICATION FAILED");
});

conn.on("ready", () => {
  console.log("Connected");
  let old = new Date()
  conn.sendMessage("6287840174790@c.us", `WhatsappBot Connected\n\nat:  ${old}`);
});

conn.on('group_join', async (join) => handle.participantUpdate(join, global.conn));
conn.on('group_leave', async (leave) => handle.participantUpdate(leave, global.conn));

conn.on("message_create", async (message) => {
  var m = message;
  try {
    handle(conn, m);
  } catch (e) {
    console.log(e);
  }
});


/*
 var m = message
 let pp = fs.readFileSync('./media/pp.jpg')
 let id = leave.id.remote || leave.participant.chatId
 let subject = await conn.groupMetadata(id) || {}
 let sender = m.id.participant || m._data.from._serialized || m._data.from || m.from
 try {
 let pp = await conn.getProfilePict(m.sender)

 conn.sendMessage(m.from, pp, { )
 } catch (err) {
 console.log(err)}
 
*/