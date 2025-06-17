import fs from 'fs'
import { performance } from 'perf_hooks'
import os from 'os'

const toMathematicalAlphanumericSymbols = number => {
  const map = {
    '0': '𝟎', '1': '𝟏', '2': '𝟐', '3': '𝟑', '4': '𝟒', '5': '𝟓', '6': '𝟔', '7': '𝟕', '8': '𝟖', '9': '𝟗'
  }
  return number.toString().split('').map(digit => map[digit] || digit).join('')
}

const formatUptime = (uptime) => {
  const seconds = Math.floor(uptime % 60)
  const minutes = Math.floor((uptime / 60) % 60)
  const hours = Math.floor((uptime / (60 * 60)) % 24)
  const days = Math.floor(uptime / (60 * 60 * 24))
  return `${days}d ${hours}h ${minutes}m ${seconds}s`
}

const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const getPluginCount = () => {
  try {
    if (fs.existsSync('./plugins')) {
      const files = fs.readdirSync('./plugins')
      return files.filter(file => file.endsWith('.js') && !file.startsWith('_')).length
    }
    return Object.keys(global.plugins || {}).length
  } catch (error) {
    return Object.keys(global.plugins || {}).length
  }
}

const reloadPlugins = async () => {
  try {
    if (global.reload) {
      await global.reload()
    }
  } catch (error) {
    console.log('Impossibile ricaricare i plugin:', error)
  }
}

const handler = async (m, { conn, usedPrefix, command }) => {
  const loadingMessage = await conn.sendMessage(m.chat, {
    text: `${global.nomebot} avviato...\n\n` +
          `⌛ Caricamento informazioni del sistema...\n` +
          `█▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ 5%`
  })

  await new Promise(resolve => setTimeout(resolve, 1000))

  await conn.sendMessage(m.chat, {
    text: `${global.nomebot} avviato...\n\n` +
          `⌛ Analisi delle prestazioni...\n` +
          `███████▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒ 35%`,
    edit: loadingMessage.key
  })

  await new Promise(resolve => setTimeout(resolve, 1000))

  await conn.sendMessage(m.chat, {
    text: `${global.nomebot} avviato...\n\n` +
          `⌛ Raccolta dati del database...\n` +
          `██████████████▒▒▒▒▒▒▒▒ 70%`,
    edit: loadingMessage.key
  })

  await new Promise(resolve => setTimeout(resolve, 500))

  await reloadPlugins()

  await conn.sendMessage(m.chat, {
    text: `${global.nomebot} avviato...\n\n` +
          `⌛ Finalizzando...\n` +
          `████████████████████▒▒ 90%`,
    edit: loadingMessage.key
  })

  await new Promise(resolve => setTimeout(resolve, 1000))

  let botUptime = formatUptime(process.uptime())
  let message = ""
  for (const [ownerNumber] of global.owner) {
    message += `\n👑 wa.me/${ownerNumber}`
  }

  const mention = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.quoted
  const who = mention ? mention : m.sender
  const user = global.db.data.users[who] || {}
  const chats = Object.entries(conn.chats).filter(([id, data]) => id && data.isChats)
  const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'))
  const privateChats = chats.length - groupsIn.length
  let totalreg = Object.keys(global.db.data.users).length
  let rtotalreg = Object.values(global.db.data.users).filter(user => user.instagram).length
  
  const totalPlugins = getPluginCount()
  
  const activeUsers = Object.values(global.db.data.users).filter(user => user.lastActive && (Date.now() - user.lastActive < 86400000)).length
  const premiumUsers = Object.values(global.db.data.users).filter(user => user.premium).length
  const platform = os.platform()
  const freeMemory = formatBytes(os.freemem())
  const totalMemory = formatBytes(os.totalmem())
  const cpuLoad = os.loadavg()[0].toFixed(2)
  const dbSize = formatBytes(JSON.stringify(global.db.data).length * 2)
  
  let image
  try {
    image = fs.readFileSync('./icone/settings.png')
  } catch (error) {
    console.log('Immagine non trovata:', error.message)
    image = null
  }
  
  const finalText = `╭══════《 ${global.nomebot} 》══════⊷
┃ 𝐏𝐞𝐫 𝐯𝐞𝐝𝐞𝐫𝐞 𝐢 𝐜𝐨𝐦𝐚𝐧𝐝𝐢 𝐮𝐬𝐚𝐫𝐞 ${usedPrefix}𝐦𝐞𝐧𝐮
╰═════════════════════⊷

╭═══〘 𝐒𝐓𝐀𝐓𝐈𝐒𝐓𝐈𝐂𝐇𝐄 〙═══⊷
┃ ➣ 𝐆𝐫𝐮𝐩𝐩𝐢: ${toMathematicalAlphanumericSymbols(groupsIn.length)}
┃ ➣ 𝐂𝐡𝐚𝐭 𝐩𝐫𝐢𝐯𝐚𝐭𝐞: ${toMathematicalAlphanumericSymbols(privateChats)}
┃ ➣ 𝐂𝐡𝐚𝐭 𝐭𝐨𝐭𝐚𝐥𝐢: ${toMathematicalAlphanumericSymbols(chats.length)}
┃ ➣ 𝐔𝐭𝐞𝐧𝐭𝐢 𝐫𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐭𝐢: ${toMathematicalAlphanumericSymbols(totalreg)}
┃ ➣ 𝐔𝐭𝐞𝐧𝐭𝐢 𝐚𝐭𝐭𝐢𝐯𝐢: ${toMathematicalAlphanumericSymbols(activeUsers)}
┃ ➣ 𝐔𝐭𝐞𝐧𝐭𝐢 𝐩𝐫𝐞𝐦𝐢𝐮𝐦: ${toMathematicalAlphanumericSymbols(premiumUsers)}
┃ ➣ 𝐈𝐠 𝐫𝐞𝐠𝐢𝐬𝐭𝐫𝐚𝐭𝐢: ${toMathematicalAlphanumericSymbols(rtotalreg)}/${toMathematicalAlphanumericSymbols(totalreg)}
┃ ➣ 𝐏𝐥𝐮𝐠𝐢𝐧𝐬: ${toMathematicalAlphanumericSymbols(totalPlugins)}
╰═════════════════════⊷

╭═══〘 𝐒𝐈𝐒𝐓𝐄𝐌𝐀 〙════⊷
┃ ➣ 𝐏𝐢𝐚𝐭𝐭𝐚𝐟𝐨𝐫𝐦𝐚: ${platform}
┃ ➣ 𝐓𝐞𝐦𝐩𝐨 𝐚𝐭𝐭𝐢𝐯𝐢𝐭à: ${botUptime}
┃ ➣ 𝐌𝐞𝐦𝐨𝐫𝐢𝐚: ${freeMemory}/${totalMemory}
┃ ➣ 𝐂𝐏𝐔 𝐥𝐨𝐚𝐝: ${cpuLoad}%
┃ ➣ 𝐃𝐢𝐦𝐞𝐧𝐬𝐢𝐨𝐧𝐞 𝐃𝐁: ${dbSize}
╰═════════════════════⊷

╭═══〘 𝐎𝐖𝐍𝐄𝐑 〙════⊷
┃${message}
╰═════════════════════⊷

⚠️ *𝐕𝐞𝐫𝐬𝐢𝐨𝐧𝐞 𝐅𝐢𝐧𝐚𝐥𝐞*`

  if (image) {
    await conn.sendMessage(m.chat, {
      text: finalText,
      contextInfo: {
        externalAdReply: {
          title: `🤖 𝐒𝐭𝐚𝐭𝐨 𝐝𝐞𝐥 𝐒𝐢𝐬𝐭𝐞𝐦𝐚: ${global.nomebot}`,
          body: `Informazioni del sistema`,
          mediaType: 1,
          thumbnail: image,
          sourceUrl: 'https://wa.me/' + global.owner[0][0]
        }
      }
    }, { quoted: m })
  } else {
    await conn.sendMessage(m.chat, { text: finalText }, { quoted: m })
  }
  
  await conn.sendMessage(m.chat, { delete: loadingMessage.key })
}

handler.help = ['infobot', 'bot']
handler.tags = ['info', 'main']
handler.command = ['infobot', 'bot', 'info', 'stato', 'status']
export default handler