let handler = async (m) => {
global.db.data.chats[m.chat].isBanned = false
m.reply('𝑪𝒐𝒎𝒂𝒏𝒅𝒊 𝒔𝒃𝒍𝒐𝒄𝒄𝒂𝒕𝒊 ✅')
}
handler.help = ['unbanchat']
handler.tags = ['owner']
handler.command = /^go$/i
handler.rowner = true
export default handler