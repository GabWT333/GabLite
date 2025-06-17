//Codice di ADMIN_richieste.js

// Codice di ADMIN_richieste.js

let handler = async (m, { conn, isAdmin, isBotAdmin }) => {
  if (!m.isGroup) return m.reply("Questo comando si usa solo nei gruppi.")
  if (!isBotAdmin) return m.reply("Devo essere admin per gestire le richieste.")
  if (!isAdmin) return m.reply("Solo gli admin del gruppo possono usare questo comando.")

  try {
    const groupId = m.chat
    const pending = await conn.groupRequestParticipantsList(groupId)
    
    if (!pending.length) return m.reply("Non ci sono richieste di partecipazione in sospeso.")
    
    const totalRequests = pending.length
    
    let txtRichieste = ''
    if (totalRequests <= 90) {
      txtRichieste = pending.map(p => {
        const numero = p.jid.split('@')[0]
        return `• +${numero}`
      }).join('\n')
      txtRichieste = '\n\nRichieste da:\n' + txtRichieste
    }
    
    const testo = `📊 Ci sono ${totalRequests} richieste di partecipazione in sospeso.${txtRichieste}\n\nCosa vuoi fare?`
    
    const pulsanti = [
        ['Accetta Tutte ✅️', '.accettarichieste'],
        ['Accetta solo i +39 ✅️', '.accetta39'],
        ['Rifiuta Tutte ❌️', '.rifiutarichieste'],
    ]
    
    await conn.sendButton(m.chat, testo, '𝐆𝐞𝐬𝐭𝐢𝐨𝐧𝐞 𝐑𝐢𝐜𝐡𝐢𝐞𝐬𝐭𝐞', null, pulsanti, m)
    
  } catch (err) {
    console.error('[ERRORE RICHIESTE]', err)
    m.reply("Errore durante la verifica delle richieste.")
  }
}

handler.command = ['richieste', 'requests']
handler.tags = ['gruppo']
handler.help = ['richieste - mostra le richieste di partecipazione con pulsanti per gestirle']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler