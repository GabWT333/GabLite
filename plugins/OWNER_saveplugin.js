import fs from 'fs'

function getNextAvailableName(pluginName) {
  let counter = 0;
  let newName = pluginName;
  let path = `plugins/${newName}.js`;
  
  while (fs.existsSync(path)) {
    newName = `${pluginName}${counter}`;
    path = `plugins/${newName}.js`;
    counter++;
  }
  
  return { name: newName, path: path };
}

let handler = async (m, { text, usedPrefix, command, conn }) => {
    if (!text) throw `uhm.. che nome do al plugin?`
    if (!m.quoted.text) throw `Rispondi al msg!`
    
    // Pulisce il nome del plugin da caratteri speciali
    const cleanName = text.replace(/[^a-zA-Z0-9\-_]/g, '');
    
    // Trova il prossimo nome disponibile
    const { name: finalName, path: finalPath } = getNextAvailableName(cleanName);
    
    // Controlla se il nome è stato modificato
    const wasRenamed = finalName !== cleanName;
    
    try {
        await fs.writeFileSync(finalPath, m.quoted.text)
        
        let prova = { 
            "key": {
                "participants":"0@s.whatsapp.net", 
                "fromMe": false, 
                "id": "Halo"
            }, 
            "message": { 
                "locationMessage": { 
                    name: wasRenamed ? '𝐏𝐥𝐮𝐠𝐢𝐧 𝐬𝐚𝐥𝐯𝐚𝐭𝐨 𝐞 𝐫𝐢𝐧𝐨𝐦𝐢𝐧𝐚𝐭𝐨 ✓' : '𝐏𝐥𝐮𝐠𝐢𝐧 𝐬𝐚𝐥𝐯𝐚𝐭𝐨 ✓',
                    "jpegThumbnail": await(await fetch('https://telegra.ph/file/876cc3f192ec040e33aba.png')).buffer(),
                    "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }, 
            "participant": "0@s.whatsapp.net"
        }
        
        let responseMessage = `📁 *Plugin salvato con successo!*\n\n`;
        responseMessage += `📝 *Nome originale:* \`${text}\`\n`;
        responseMessage += `📄 *Nome finale:* \`${finalName}.js\`\n`;
        responseMessage += `📍 *Percorso:* \`${finalPath}\`\n`;
        
        if (wasRenamed) {
            responseMessage += `\n🔄 *Auto-rinominato:* Il nome è stato modificato perché esisteva già un plugin con questo nome`;
        }
        
        conn.reply(m.chat, responseMessage, prova)
        
    } catch (error) {
        throw `❌ Errore durante il salvataggio del plugin: ${error.message}`
    }
}

handler.help = ['saveplugin'].map(v => v + ' <nombre>')
handler.tags = ['owner']
handler.command = ["salvar", "saveplugin"]
handler.rowner = true

export default handler