//Codice di info-ping.js

import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { performance } from 'perf_hooks';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const toMathematicalAlphanumericSymbols = number => {
  const map = {
    '0': '𝟎', '1': '𝟏', '2': '𝟐', '3': '𝟑', '4': '𝟒', '5': '𝟓', '6': '𝟔', '7': '𝟕', '8': '𝟖', '9': '𝟗'
  };
  return number.toString().split('').map(digit => map[digit] || digit).join('');
};

const clockString = ms => {
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);

  return `${toMathematicalAlphanumericSymbols(days.toString().padStart(2, '0'))}:${toMathematicalAlphanumericSymbols(hours.toString().padStart(2, '0'))}:${toMathematicalAlphanumericSymbols(minutes.toString().padStart(2, '0'))}:${toMathematicalAlphanumericSymbols(seconds.toString().padStart(2, '0'))}`;
};

const handler = async (m, { conn }) => {
  const _uptime = process.uptime() * 1000;
  const uptime = clockString(_uptime);

  const old = performance.now();
  const neww = performance.now();
  const speed = (neww - old).toFixed(4);
  const speedWithFont = toMathematicalAlphanumericSymbols(speed);

  const totalMemBytes = os.totalmem();
  const freeMemBytes = os.freemem();
  const usedMemBytes = totalMemBytes - freeMemBytes;
  const totalMemMB = (totalMemBytes / (1024 * 1024)).toFixed(2);
  const usedMemMB = (usedMemBytes / (1024 * 1024)).toFixed(2);

  const processMemory = process.memoryUsage();
  const heapUsedMB = (processMemory.heapUsed / (1024 * 1024)).toFixed(2);
  const heapTotalMB = (processMemory.heapTotal / (1024 * 1024)).toFixed(2);

  // Percorso dell'immagine ping
  const imagePath = path.join(__dirname, '../icone/333.jpeg');
  
  // Leggi l'immagine locale
  let imageBuffer;
  try {
    imageBuffer = fs.readFileSync(imagePath);
  } catch (error) {
    console.log('Errore nel leggere l\'immagine ping.png:', error);
    imageBuffer = null;
  }

  let nomeDelBot = global.db.data.nomedelbot || ' ꙰ 𝟥𝟥𝟥 𝔹𝕆𝕋  ꙰⇝';
  
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

  const info = `ೋೋ══ • ══ೋೋ
𝚲𝐓𝐓𝕀𝐕𝕀𝐓𝚲: ${uptime}
𝐕𝚵𝐋͎Ꮻ𝐂𝕀𝐓𝚲: ${speedWithFont} 𝐒𝚵𝐂Ꮻ𝐍𝐃𝕀
𝐑𝐀𝐌 (server): ${usedMemMB} MB / ${totalMemMB} MB
𝐌𝐄𝐌 (process): ${heapUsedMB} MB / ${heapTotalMB} MB

ೋೋ══ • ══ೋೋ`.trim();

  const pulsanti = [
    ['📘 Speedtest', '.speed'],
    ['📘 Cancella Sessioni', '.ds'],
  ];

  // Se l'immagine è disponibile, inviala con il ping
  if (imageBuffer) {
    await conn.sendMessage(m.chat, {
      image: imageBuffer,
      caption: info,
      footer: nomeDelBot,
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
    // Fallback: usa il metodo originale se l'immagine non viene trovata
    const prova = {
      key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },
      message: { documentMessage: { title: `${nomeDelBot} 𝐏𝕀𝐍𝐆 🏓`, jpegThumbnail: null } },
      participant: "0@s.whatsapp.net"
    };

    await conn.sendButton(m.chat, info, nomeDelBot, null, pulsanti, m, { quoted: prova });
  }
};

handler.command = /^(ping)$/i;
export default handler;