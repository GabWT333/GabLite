const handler = async (m, { conn, isAdmin, isBotAdmin, isOwner, command }) => {
  if (!(isAdmin || isOwner)) {
    throw '*Solo gli admin possono usare questo comando*'
  }
  
  if (!isBotAdmin) {
    throw '*Il bot deve essere admin per usare questa funzione*'
  }

  const pending = await conn.groupRequestParticipantsList(m.chat)
  
  for (let p of pending) {
    const jid = p.jid
    const number = jid.split('@')[0]
    
    if (number.startsWith('39') && !number.slice(2).startsWith('0')) {
      await conn.groupRequestParticipantsUpdate(m.chat, [jid], 'approve')
    }
  }
}

handler.command = /^(accetta39)$/i
handler.group = true

export default handler