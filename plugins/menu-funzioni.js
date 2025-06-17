import 'os';
import 'util';
import 'human-readable';
import '@whiskeysockets/baileys';
import 'fs';
import 'perf_hooks';

let handler = async (message, { conn, usedPrefix }) => {
  const chatData = global.db.data.chats[message.chat];

  const {
    antiToxic,
    antilinkhard,
    antiPrivate,
    antispam,
    antiCall,
    modohorny,
    gpt,
    antiinsta,
    antielimina,
    antitelegram,
    antiPorno,
    autosticker,
    modoadmin,
    audios,
    isBanned,
    welcome,
    detect,
    sWelcome,
    sBye,
    sPromote,
    sDemote,
    antiLink,
    antilinkbase,
    sologruppo,
    soloprivato,
    antitraba,
    antiArab,
    antiviewonce
  } = chatData;

  let targetUser = message.quoted ? message.quoted.sender :
                   message.mentionedJid?.[0] ? message.mentionedJid[0] :
                   message.fromMe ? conn.user.jid : message.sender;

  const profilePic = (await conn.profilePictureUrl(targetUser, "image").catch(() => null)) || "./src/avatar_contact.png";
  let thumbnail;

  if (profilePic !== "./src/avatar_contact.png") {
    thumbnail = await (await fetch(profilePic)).buffer();
  } else {
    thumbnail = await (await fetch("https://qu.ax/cSqEs.jpg")).buffer();
  }

  let quotedMessage = {
    key: { participants: "0@s.whatsapp.net", fromMe: false, id: "Halo" },
    message: {
      locationMessage: {
        name: "𝐌𝐞𝐧𝐮 𝐝𝐞𝐥𝐥𝐞 𝐟𝐮𝐧𝐳𝐢𝐨𝐧𝐚𝐥𝐢𝐭𝐚'",
        jpegThumbnail: await (await fetch("https://qu.ax/cSqEs.jpg")).buffer()
      }
    },
    participant: "0@s.whatsapp.net"
  };

  const funzioni = [
    { nome: 'detect', stato: detect, comando: 'detect' },
    { nome: 'gpt', stato: gpt, comando: 'gpt' },
    { nome: 'benvenuto', stato: welcome, comando: 'benvenuto' },
    { nome: 'sologruppo', stato: sologruppo, comando: 'sologruppo' },
    { nome: 'soloprivato', stato: soloprivato, comando: 'soloprivato' },
    { nome: 'modoadmin', stato: modoadmin, comando: 'modoadmin' },
    { nome: 'bangp', stato: isBanned, comando: 'bangp' },
    { nome: 'antiporno', stato: antiPorno, comando: 'antiporno' },
    { nome: 'anticall', stato: antiCall, comando: 'anticall' },
    { nome: 'antitrava', stato: antitraba, comando: 'antitrava' },
    { nome: 'antipaki', stato: antiArab, comando: 'antipaki' },
    { nome: 'antilink', stato: antiLink, comando: 'antilink' },
    { nome: 'antiinsta', stato: antiinsta, comando: 'antiinsta' },
    { nome: 'antielimina', stato: antielimina, comando: 'antielimina' }
  ];

  let menuText = `
╭━━⬣ ⚙️ *𝙼𝙴𝙽𝚄 𝙳𝙴𝙻𝙻𝙴 𝙵𝚄𝙽𝚉𝙸𝙾𝙽𝙰𝙻𝙸𝚃𝙰'* ⚙️
┃
┃ 📥 *Gestione Accesso:*
┃ ${welcome ? '🟢 ON ' : '🔴 OFF'} ${usedPrefix}benvenuto
┃ ${sologruppo ? '🟢 ON ' : '🔴 OFF'} ${usedPrefix}sologruppo
┃ ${soloprivato ? '🟢 ON ' : '🔴 OFF'} ${usedPrefix}soloprivato
┃
┃ 🛡️ *Filtri & Sicurezza:*
┃ ${antiPorno ? '🟢 ON ' : '🔴 OFF'} ${usedPrefix}antiporno
┃ ${antiCall ? '🟢 ON ' : '🔴 OFF'} ${usedPrefix}anticall
┃ ${antitraba ? '🟢 ON ' : '🔴 OFF'} ${usedPrefix}antitrava
┃ ${antiArab ? '🟢 ON ' : '🔴 OFF'} ${usedPrefix}antipaki
┃ ${antiLink ? '🟢 ON ' : '🔴 OFF'} ${usedPrefix}antilink
┃ ${antiinsta ? '🟢 ON ' : '🔴 OFF'} ${usedPrefix}antiinsta
┃ ${antielimina ? '🟢 ON ' : '🔴 OFF'} ${usedPrefix}antielimina
┃
┃ 🎛️ *Controllo Bot:*
┃ ${modoadmin ? '🟢 ON ' : '🔴 OFF'} ${usedPrefix}modoadmin
┃ ${isBanned ? '🟢 ON ' : '🔴 OFF'} ${usedPrefix}bangp
┃ ${detect ? '🟢 ON ' : '🔴 OFF'} ${usedPrefix}detect
┃ ${gpt ? '🟢 ON ' : '🔴 OFF'} ${usedPrefix}gpt
╰━━━━━━━━━━━━━━━━━━━━⬣

📌 *Legenda:*
🟢 = Funzione attiva
🔴 = Funzione disattiva

⚡ *Attivazione rapida:*
Tocca i pulsanti per attivare/disattivare.

📖 *Comandi manuali:*
${usedPrefix}attiva antilink
${usedPrefix}disabilita antilink

ℹ️ *Controllo stato:*
${usedPrefix}infostato
`.trim();

  const buttons = [];

  for (let i = 0; i < funzioni.length; i += 3) {
    const gruppo = funzioni.slice(i, i + 3);
    const buttonRow = gruppo.map(funzione => {
      const azione = funzione.stato ? 'disabilita' : 'attiva';
      const emoji = funzione.stato ? '🟢' : '🔴';
      const testo = `${funzione.nome} ${emoji}`;
      return [testo, `${usedPrefix}${azione} ${funzione.comando}`];
    });
    buttons.push(...buttonRow);
  }

  let botName = global.db.data.nomedelbot || "꙰ 𝟥𝟥𝟥 ꙰ 𝔹𝕆𝕋 ꙰";

  await conn.sendButton(
    message.chat,
    menuText,
    `⚙️ *Menu delle Funzionalità* ⚙️\n\n*Bot:* ${botName}\n*Chat:* ${message.chat.includes('@g.us') ? 'Gruppo' : 'Privata'}`,
    thumbnail,
    buttons,
    message,
    {
      contextInfo: {
        mentionedJid: conn.parseMention(botName),
        forwardingScore: 1,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363341274693350@newsletter",
          serverMessageId: '',
          newsletterName: botName
        }
      }
    }
  );
};

handler.help = ["funzioni"];
handler.tags = ["menu"];
handler.command = /^(funzioni)$/i;

export default handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  console.log({ ms, h, m, s });
  return [h, m, s].map(unit => unit.toString().padStart(2, '0')).join(':');
}