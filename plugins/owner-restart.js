import { spawn } from 'child_process'

let handler = async (m, { conn, isROwner, text }) => {
    if (!process.send) throw 'Non fare: node main.js\nFai: node index.js'

    if (global.conn.user.jid == conn.user.jid) {
        await m.reply('🚀🚀')
        await m.reply('🚀🚀🚀🚀')
        await m.reply('🚀🚀🚀🚀🚀🚀')
        await m.reply('☑️ Riavvio completato. aspetta 10 secondi per caricare tutti i messaggi.') 

        // Salva l'ID della chat per inviare il messaggio dopo il riavvio
        global.restartChatId = m.chat

        process.send('reset')
    } else throw '_eeeeeiiittsssss..._'
}

handler.help = ['restart']
handler.tags = ['proprietario']
handler.command = /^(reiniciar|res(tart)?)$/i
handler.exp = 500
handler.rowner = true

export default handler