let handler = async (m, {
conn, command, text, groupMetadata, isAdmin }) => {
if (command == 'muta') {
if (!isAdmin) return '𝐒𝐨𝐥𝐨 𝐮𝐧 𝐚𝐝𝐦𝐢𝐧 𝐩𝐮𝐨̀ 𝐞𝐬𝐞𝐠𝐮𝐢𝐫𝐞 𝐪𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 👑'
let menzione = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
if (menzione == conn.user.jid) return 'ⓘ 𝐍𝐨𝐧 𝐩𝐮𝐨𝐢 𝐦𝐮𝐭𝐚𝐫𝐞 𝐢𝐥 𝐛𝐨𝐭'
let utente = global.db.data.users[menzione]
if (!utente) return m.reply('𝐌𝐞𝐧𝐳𝐢𝐨𝐧𝐚 𝐥𝐚 𝐩𝐞𝐫𝐬𝐨𝐧𝐚 𝐜𝐡𝐞 𝐝𝐞𝐬𝐢𝐝𝐞𝐫𝐢 𝐦𝐮𝐭𝐚𝐫𝐞 👤')
if (utente.muto == true) return '𝐐𝐮𝐞𝐬𝐭𝐨 𝐮𝐭𝐞𝐧𝐭𝐞 𝐞̀ 𝐠𝐢𝐚 𝐬𝐭𝐚𝐭𝐨 𝐦𝐮𝐭𝐚𝐭𝐨/𝐚 🔇'
let prova = { "key": {"participants":"0@s.whatsapp.net", "fromMe": false, "id": "Halo"
}, "message": { 
"locationMessage": { name: '𝐔𝐓𝚵𝐍𝐓𝚵 𝐌𝐔𝐓𝚲𝐓Ꮻ/𝚲 🔇',
"jpegThumbnail": await(await fetch('https://telegra.ph/file/f8324d9798fa2ed2317bc.png')).buffer(),
"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` 
}}, "participant": "0@s.whatsapp.net"
}
conn.reply(m.chat, `𝐈 𝐬𝐮𝐨𝐢 𝐦𝐞𝐬𝐬𝐚𝐠𝐠𝐢 𝐯𝐞𝐫𝐫𝐚𝐧𝐧𝐨 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐭𝐢`, prova, null, {
mentions: [menzione]
})
global.db.data.users[menzione].muto = true
}
if (command == 'smuta') {
if (!isAdmin) return '𝐒𝐨𝐥𝐨 𝐮𝐧 𝐚𝐝𝐦𝐢𝐧 𝐩𝐮𝐨̀ 𝐞𝐬𝐞𝐠𝐮𝐢𝐫𝐞 𝐪𝐮𝐞𝐬𝐭𝐨 𝐜𝐨𝐦𝐚𝐧𝐝𝐨 👑'
let menzione = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text
let utente = global.db.data.users[menzione]
if (!utente) return m.reply('𝐌𝐞𝐧𝐳𝐢𝐨𝐧𝐚 𝐥𝐚 𝐩𝐞𝐫𝐬𝐨𝐧𝐚 𝐜𝐡𝐞 𝐝𝐞𝐬𝐢𝐝𝐞𝐫𝐢 𝐬𝐦𝐮𝐭𝐚𝐫𝐞 👤')
global.db.data.users[menzione].muto = false
let prova = { "key": {"participants":"0@s.whatsapp.net", "fromMe": false, "id": "Halo"
}, "message": { 
"locationMessage": { name: '𝐔𝐓𝚵𝐍𝐓𝚵 𝐒𝐌𝐔𝐓𝚲𝐓Ꮻ/𝚲 🔊',
"jpegThumbnail": await(await fetch('https://telegra.ph/file/aea704d0b242b8c41bf15.png')).buffer(),
"vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
}}, "participant": "0@s.whatsapp.net"
}
conn.reply(m.chat, `𝐈 𝐬𝐮𝐨𝐢 𝐦𝐞𝐬𝐬𝐚𝐠𝐠𝐢 𝐧𝐨𝐧 𝐯𝐞𝐫𝐫𝐚𝐧𝐧𝐨 𝐩𝐢𝐮̀ 𝐞𝐥𝐢𝐦𝐢𝐧𝐚𝐭𝐢`, prova, null, {
mentions: [menzione]
})
}
}
handler.command = /^(muta|smuta)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true
export default handler