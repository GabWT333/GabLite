//Plugin fatto da Gabs & 333 Staff
import fs from 'fs';

let handler = async (m, { conn, usedPrefix }) => {
  const menuText = `
╔═══〔 *𝐌𝐄𝐍𝐔 𝐀𝐃𝐌𝐈𝐍* 〕═══╗
┃ ⚡ ${usedPrefix}promuovi / p
┃ ⚡ ${usedPrefix}retrocedi / r
┃ ⚡ ${usedPrefix}warn / unwarn
┃ ⚡ ${usedPrefix}muta / smuta
┃ ⚡ ${usedPrefix}mutelist
┃ ⚡ ${usedPrefix}hidetag
┃ ⚡ ${usedPrefix}tagall
┃ ⚡ ${usedPrefix}aperto / chiuso
┃ ⚡ ${usedPrefix}setwelcome
┃ ⚡ ${usedPrefix}setbye
┃ ⚡ ${usedPrefix}inattivi
┃ ⚡ ${usedPrefix}listanum + prefisso
┃ ⚡ ${usedPrefix}pulizia + prefisso
┃ ⚡ ${usedPrefix}rimozione inattivi
┃ ⚡ ${usedPrefix}sim
┃ ⚡ ${usedPrefix}admins
┃ ⚡ ${usedPrefix}freeze @
┃ ⚡ ${usedPrefix}ispeziona (link)
┃ ⚡ ${usedPrefix}top (10,50,100)
┃ ⚡ ${usedPrefix}topsexy
┃ ⚡ ${usedPrefix}pic @
┃ ⚡ ${usedPrefix}picgruppo
┃ ⚡ ${usedPrefix}nome <testo>
┃ ⚡ ${usedPrefix}bio <testo>
┃ ⚡ ${usedPrefix}linkqr
╚════════════════╝
🔥 *꙰ 𝟥𝟥𝟥 ꙰ 𝔹𝕆𝕋 ꙰* 🔥
`.trim();

  const menuImg = {
    key: {
      participants: "0@s.whatsapp.net",
      remoteJid: "0@s.whatsapp.net",
      fromMe: false,
      id: 'menu'
    },
    message: {
      locationMessage: {
        name: "Menu Admin",
        jpegThumbnail: fs.readFileSync('./icone/admin.png')
      }
    }
  };

  const buttons = [
    ['📜 Tagall', `${usedPrefix}tagall`],
    ['📖 Top 100', `${usedPrefix}top 100`]
  ];

  await conn.sendButton(m.chat, menuText, null, null, buttons, m, { quoted: menuImg });
};

handler.help = ['menu'];
handler.tags = ['menu'];
handler.command = /^(menuadm|admin)$/i;

export default handler;