import { generateWAMessageFromContent } from '@whiskeysockets/baileys'

let countdowns = {};

let startCountdown = async (conn, m, participants, text, totalSeconds, chatId) => {
    try {
        let time = totalSeconds;
        let minuteLabel = time === 60 ? "𝐦𝐢𝐧𝐮𝐭𝐨" : "𝐬𝐞𝐜𝐨𝐧𝐝𝐢";

        const fixedImageUrl = "https://qu.ax/yFpdT.png";
        const profileBuffer = await (await fetch(fixedImageUrl)).buffer();

        conn.sendMessage(chatId, {
            text: `𝐂𝐨𝐮𝐧𝐭𝐝𝐨𝐰𝐧 𝐚𝐯𝐯𝐢𝐚𝐭𝐨. 𝐇𝐢𝐝𝐞𝐭𝐚𝐠 𝐚𝐮𝐭𝐨𝐦𝐚𝐭𝐢𝐜𝐨 𝐭𝐫𝐚 ${totalSeconds} 𝐬𝐞𝐜𝐨𝐧𝐝𝐢`,
            mentions: participants.map(u => conn.decodeJid(u.id)),
        }, {
            quoted: {
                key: {
                    participants: "0@s.whatsapp.net",
                    fromMe: false,
                    id: "Halo",
                },
                message: {
                    locationMessage: {
                        name: "𝑪𝒐𝒖𝒏𝒕𝒅𝒐𝒘𝒏 𝒉𝒊𝒅𝒆𝒕𝒂𝒈 ⏳",
                        jpegThumbnail: profileBuffer,
                    },
                },
                participant: "0@s.whatsapp.net",
            },
        });

        countdowns[chatId] = countdowns[chatId] || [];
        countdowns[chatId].push(setTimeout(async () => {
            try {
                let users = participants.map(u => conn.decodeJid(u.id));
                let msg = generateWAMessageFromContent(chatId, {
                    extendedTextMessage: { text: text || "", contextInfo: { mentionedJid: users } }
                }, {});
                await conn.relayMessage(chatId, msg.message, { messageId: msg.key.id });
            } catch (innerError) {}
        }, time * 1000));
    } catch (err) {}
};

let handler = async (m, { conn, text, participants, args }) => {
    try {
        let timeArg = args[0]?.toLowerCase();
        let match = timeArg.match(/^(\d+)(s|m|h)$/);

        if (!match) {
            return conn.sendMessage(m.chat, { text: "✖ Formato tempo non valido.\n> Usa: `30s`, `5m`, `2h`\nEsempio: `.cd 5m Ciao a tutti`" }, { quoted: m });
        }

        let value = parseInt(match[1]);
        let unit = match[2];
        let seconds = 0;

        if (unit === "s") seconds = value;
        if (unit === "m") seconds = value * 60;
        if (unit === "h") seconds = value * 3600;

        if (seconds <= 0 || seconds > 86400) {
            return conn.sendMessage(m.chat, { text: "✖ Il tempo deve essere compreso tra 1 secondo e 24 ore (86400 secondi)." }, { quoted: m });
        }

        let message = args.slice(1).join(" ");
        if (!message) {
            return conn.sendMessage(m.chat, { text: "✖ Manca il messaggio da inviare al termine del countdown." }, { quoted: m });
        }

        await startCountdown(conn, m, participants, message, seconds, m.chat);
    } catch (err) {}
};

handler.command = /^(countdown|cd)$/;
handler.group = true;
handler.admin = true;
export default handler;