const handler = async (msg, { conn, text, args, usedPrefix, command }) => {
    const exampleMsg = `𝐄𝐬𝐞𝐦𝐩𝐢𝐨:\n✧‌⃟ᗒ ${usedPrefix}${command} @${msg.sender.split('@')[0]}\n✧‌⃟ᗒ ${usedPrefix}${command} ${msg.sender.split('@')[0]}\n✧‌⃟ᗒ ${usedPrefix}${command} <𝐫𝐢𝐩𝐫𝐞𝐧𝐝𝐢 𝐦𝐞𝐬𝐬𝐚𝐠𝐠𝐢𝐨>`;

    const targetJid = msg.mentionedJid?.[0] 
        ?? msg.quoted?.sender 
        ?? (text ? text.replace(/[^0-9]/g, '') + "@s.whatsapp.net" : false);

    if (!targetJid) {
        return conn.reply(msg.chat, exampleMsg, msg, { mentions: [msg.sender] });
    }

    switch (command) {
        case "addowner":
            global.owner.push([targetJid]);
            await conn.reply(
                msg.chat,
                `*${targetJid.split('@')[0]}* è stato aggiunto come owner!`,
                msg
            );
            break;

        case "delowner":
            const ownerIndex = global.owner.findIndex(owner => owner[0] === targetJid);
            if (ownerIndex !== -1) {
                global.owner.splice(ownerIndex, 1);
                await conn.reply(
                    msg.chat,
                    `*${targetJid.split('@')[0]}* è stato rimosso dagli owner!`,
                    msg
                );
            }
            break;
    }
};

handler.command = /^(addowner|delowner)$/i;
handler.rowner = true;

export default handler;