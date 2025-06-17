let handler = async (message, { conn, args, usedPrefix, command }) => {
    let groupAction = {
        '': 'not_announcement'
    }[args[0] || ''];
    
    if (groupAction === undefined) return;
    
    await conn.groupSettingUpdate(message.chat, groupAction);
    conn.reply(message.chat, '𝐏𝐚𝐫𝐥𝐚𝐭𝐞 𝐩𝐥𝐞𝐛𝐞𝐢');
};

handler.help = ['group open / close', 'gruppo aperto / chiuso'];
handler.tags = ['group'];
handler.command = /^(aperto)$/i;
handler.admin = true;
handler.botAdmin = true;

export default handler;