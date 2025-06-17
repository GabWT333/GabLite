// menu-principale.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const handler = async (m, { conn, usedPrefix }) => {
  const nomeDelBot = global.db.data?.nomedelbot || '꙰ 𝟥𝟥𝟥 𝔹𝕆𝕋 ꙰';
  const versione = global.db.data?.version || 'Unica';
  const senderName = await conn.getName(m.sender);

  // === BLOCCO IDENTICO A info-ping.js ===
  const imagePath = path.join(__dirname, '../icone/333.jpeg');

  let imageBuffer;
  try {
    imageBuffer = fs.readFileSync(imagePath);
  } catch (error) {
    console.log('Errore nel leggere l\'immagine 333.jpeg:', error);
    imageBuffer = null;
  }

  const messageOptions = {
    contextInfo: {
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363341274693350@newsletter',
        serverMessageId: '',
        newsletterName: `${nomeDelBot}`
      },
    }
  };
  // === FINE BLOCCO COPIATO ===

  const testo = `
╭━〔 *⚡ MENU DEL BOT ⚡* 〕
┃
┃ 👑 *Proprietario* → ${usedPrefix}proprietario
┃ 🛡️ *Admin*       → ${usedPrefix}admin
┃ ⚙️ *Funzioni*    → ${usedPrefix}funzioni
┃
╰━━━━━━━━━━━━━━━━━━╯
🔹 *Bot:* ${nomeDelBot}
🔹 *Versione:* ${versione}
`.trim();

  const pulsanti = [
    ['👑 Proprietario', `${usedPrefix}proprietario`],
    ['🛡️ Admin', `${usedPrefix}admin`],
    ['⚙️ Funzioni', `${usedPrefix}funzioni`]
  ];

  if (imageBuffer) {
    await conn.sendMessage(m.chat, {
      image: imageBuffer,
      caption: testo,
      footer: `👤 ${senderName}`,
      buttons: pulsanti.map(([text, id]) => ({
        buttonId: id,
        buttonText: { displayText: text },
        type: 1
      })),
      viewOnce: true,
      headerType: 4,
      ...messageOptions
    }, { quoted: m });
  } else {
    // fallback se manca immagine
    const fallback = {
      key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Menu" },
      message: { documentMessage: { title: `${nomeDelBot} MENU`, jpegThumbnail: null } },
      participant: "0@s.whatsapp.net"
    };

    await conn.sendButton(m.chat, testo, `👤 ${senderName}`, null, pulsanti, m, { quoted: fallback });
  }
};

handler.help = ["menu"];
handler.tags = ['menu'];
handler.command = /^(menu)$/i;

export default handler;