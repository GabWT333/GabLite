// ⚡ Plugin creato da Gabs & 333 Staff ⚡
import fetch from 'node-fetch';

let handler = async (m, { isOwner, isAdmin, conn, text, participants, args, groupMetadata }) => {
    if (!(isAdmin || isOwner)) {
        global.dfail('admin', m, conn);
        return;
    }

    const messaggio = args.join` ` || '🚨 *𝐀𝐋𝐋𝐄𝐑𝐓𝐀!* 🚨';
    const titolo = `📢 ${messaggio}`;
    const membri = participants.map(p => p.id);

    const testo = `
╔═══════════════════╗
║    🔊 *TAG DI GRUPPO* 🔊    
╠═══════════════════╣
║ 📣 *Messaggio:* ${messaggio}
║ 👥 *Membri:* ${participants.length}
║ 🏷️ *Gruppo:* ${groupMetadata.subject || 'Sconosciuto'}
╚═══════════════════╝

📍 *𝐌𝐄𝐍𝐙𝐈𝐎𝐍𝐀𝐓𝐈:*
${membri.map(u => `➤ @${u.split('@')[0]}`).join('\n')}

──────────────
🚀 *By ꙰ 𝟥𝟥𝟥 ꙰ 𝔹𝕆𝕋 ꙰*
`.trim();

    const messaggioCitato = {
        key: {
            participants: "0@s.whatsapp.net",
            fromMe: false,
            id: "Halo"
        },
        message: {
            locationMessage: {
                name: '⚡ 𝐀𝐓𝐓𝐄𝐍𝐙𝐈𝐎𝐍𝐄 ⚡',
                jpegThumbnail: await (await fetch('https://telegra.ph/file/92576d96e97bb7e3939e2.png')).buffer(),
                vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
        }
    };

    await conn.sendMessage(m.chat, {
        text: testo,
        mentions: membri
    }, { quoted: messaggioCitato });
};

handler.help = ['tagall'];
handler.tags = ['group'];
handler.command = /^(tagall|marcar)$/i;
handler.group = true;

export default handler;