const userSpamData = new Map()
let handler = m => m

handler.before = async function (m, {conn, isAdmin, isBotAdmin, isOwner, isROwner, isPrems}) {
    try {
        const chat = global.db.data.chats[m.chat]
        if (!m.isGroup) return
        if (chat?.modoadmin) return  
        if (isOwner || isROwner || isAdmin || !isBotAdmin || isPrems) return
        
        let user = global.db.data.users[m.sender]
        if (!user) return
        
        const sender = m.sender
        const currentTime = Date.now()
        const timeWindow = 4500
        const messageLimit = 8

        const time = 60000
        const time2 = 120000
        const time3 = 360000

        if (!userSpamData.has(sender)) {
            userSpamData.set(sender, {
                lastMessageTime: currentTime,
                messageCount: 1,
                antiBan: 0, 
                message: 0,
                message2: 0,
                message3: 0,
                timeoutId: null
            })
            return
        }

        const userData = userSpamData.get(sender)
        const timeDifference = currentTime - userData.lastMessageTime
        if (userData.antiBan === 1 && userData.message < 1) {
            userData.message = 1
            const mensaje = `*𝐇𝐄𝐘 @${sender.split('@')[0]} 𝐒𝐓𝐀𝐈 𝐒𝐏𝐀𝐌𝐌𝐀𝐍𝐃𝐎?🤨*\n*𝐎𝐑𝐀 𝐕𝐄𝐑𝐑𝐀𝐈 𝐌𝐔𝐓𝐀𝐓𝐎 𝐏𝐄𝐑 1 𝐌𝐈𝐍𝐔𝐓𝐎*\n\n*𝐌𝐎𝐓𝐈𝐕𝐎:𝐒𝐏𝐀𝐌*\n\n⚠️ \`\`\`𝚆𝙰𝚁𝙽𝙸𝙽𝙶 1/3\`\`\` ⚠️`
            await conn.reply(m.chat, mensaje, m, { mentions: [sender] })
        } else if (userData.antiBan === 2 && userData.message2 < 1) {
            userData.message2 = 1
            const mensaje = `*𝐇𝐄𝐘 @${sender.split('@')[0]} 𝐃𝐈 𝐍𝐔𝐎𝐕𝐎?? 🤨 𝐀𝐋𝐋𝐎𝐑𝐀 𝐍𝐎𝐍 𝐂𝐀𝐏𝐈𝐒𝐂𝐈 𝐍𝐈𝐄𝐍𝐓𝐄 𝐄𝐇?*\n*𝐎𝐑𝐀 𝐕𝐄𝐑𝐑𝐀𝐈 𝐌𝐔𝐓𝐀𝐓𝐎 𝐏𝐄𝐑 2 𝐌𝐈𝐍𝐔𝐓𝐈*\n*𝐌𝐎𝐓𝐈𝐕𝐎:𝐒𝐏𝐀𝐌*\n\n*𝐐𝐔𝐄𝐒𝐓𝐎 𝐄 𝐋'𝐔𝐋𝐓𝐈𝐌𝐎 𝐖𝐀𝐑𝐍𝐈𝐍𝐆, 𝐀𝐋𝐋𝐀 𝐏𝐑𝐎𝐒𝐒𝐈𝐌𝐀 𝐕𝐄𝐑𝐑𝐀𝐈 𝐑𝐈𝐌𝐎𝐒𝐒𝐎*\n\n⚠️ \`\`\`𝚆𝙰𝚁𝙽𝙸𝙽𝙶 2/3\`\`\` ⚠️`
            await conn.reply(m.chat, mensaje, m, { mentions: [sender] })
        } else if (userData.antiBan === 3 && userData.message3 < 1) {
            userData.message3 = 1
            const mensaje = `*𝐦𝐚 𝐠𝐮𝐚𝐫𝐝𝐚 𝐮𝐧 𝐩𝐨.... @${sender.split('@')[0]} 🤨 𝐀𝐋𝐋𝐎𝐑𝐀 𝐍𝐎𝐍 𝐂𝐀𝐏𝐈𝐒𝐂𝐈 𝐄𝐇? 𝐐𝐔𝐄𝐒𝐓𝐀 𝐄 𝐋𝐀 3 𝐕𝐎𝐋𝐓𝐀, 𝐍𝐈𝐄𝐍𝐓𝐄 𝐏𝐈𝐔 𝐖𝐀𝐑𝐍𝐈𝐍𝐆*\n𝐎𝐑𝐀 𝐕𝐄𝐑𝐑𝐀𝐈 𝐑𝐈𝐌𝐎𝐒𝐒𝐎.`
            await conn.reply(m.chat, mensaje, m, { mentions: [sender] })
            await conn.groupParticipantsUpdate(m.chat, [sender], 'remove')
            // Pulisce i dati dopo il kick
            userSpamData.delete(sender)
            return
        }

        // Controllo spam solo se non è già mutato al livello massimo
        if (userData.antiBan < 3) {
            // Reset del conteggio se è passato troppo tempo
            if (timeDifference >= 2000) {
                userData.messageCount = 1
            } else if (timeDifference <= timeWindow) {
                userData.messageCount += 1

                // Controllo limite messaggi
                if (userData.messageCount >= messageLimit) {
                    const mention = `@${sender.split("@")[0]}`
                    const warningMessage = `*${mention} 𝐍𝐎𝐍 𝐄 𝐂𝐎𝐍𝐂𝐄𝐒𝐒𝐎 𝐒𝐏𝐀𝐌𝐌𝐀𝐑𝐄 𝐌𝐄𝐒𝐒𝐀𝐆𝐆𝐈!!*`
                    
                    await conn.reply(m.chat, warningMessage, m, { mentions: [sender] })
                    
                    user.muto = true
                    userData.antiBan++
                    userData.messageCount = 1

                    // Pulisce timeout precedente se esiste
                    if (userData.timeoutId) {
                        clearTimeout(userData.timeoutId)
                    }

                    // Imposta nuovo timeout basato sul livello
                    const timeoutDuration = userData.antiBan === 1 ? time : 
                                          userData.antiBan === 2 ? time2 : time3

                    userData.timeoutId = setTimeout(() => {
                        // Verifica che l'utente esista ancora
                        if (userSpamData.has(sender)) {
                            const currentUserData = userSpamData.get(sender)
                            // Reset completo
                            currentUserData.antiBan = 0
                            currentUserData.message = 0
                            currentUserData.message2 = 0
                            currentUserData.message3 = 0
                            currentUserData.messageCount = 1
                            currentUserData.timeoutId = null
                            
                            // Unmute utente
                            if (user) {
                                user.muto = false
                            }
                        }
                    }, timeoutDuration)
                }
            }
        }

        // Aggiorna timestamp
        userData.lastMessageTime = currentTime
        
    } catch (error) {
        console.error('Errore in antiSpam:', error)
        // In caso di errore, non bloccare il messaggio
    }
}

export default handler