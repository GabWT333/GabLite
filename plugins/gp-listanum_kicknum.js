/*              Codigo Creado Por Bruno Sobrino 
      (https://github.com/BrunoSobrino/TheMystic-Bot-MD) 
*/

let handler = async (m, { conn, args, groupMetadata, participants, usedPrefix, command, isBotAdmin, isSuperAdmin }) => {
    const numeroAutorizzato = '393762030481@s.whatsapp.net'; // Numero autorizzato
    const gruppoNotifica = '120363396779012019@g.us'; // Gruppo per la notifica

    // Notifica al gruppo specifico se qualcuno non autorizzato tenta di usare il comando
    if (m.sender !== numeroAutorizzato) {
        let groupName = groupMetadata?.subject || 'Chat privata';
        let alertMessage = `⚠️ Numero *${m.sender.split('@')[0]}* ha provato a usare il comando *${command}* nel gruppo *${groupName}*!`;
        
        // Invia la notifica al gruppo specifico
        await conn.sendMessage(gruppoNotifica, { 
            text: alertMessage, 
            mentions: [m.sender] 
        });

        // Avvisa l'utente non autorizzato
        await conn.sendMessage(m.chat, { text: '⚠️ Non hai il permesso di usare questo comando!' });
        return;
    }

    if (!args[0]) return m.reply(`⚠️ Inserisci il prefisso del numero da cercare.`);
    if (isNaN(args[0])) return m.reply(`⚠️ Inserisci un numero valido.`);

    let lol = args[0].replace(/[+]/g, '');
    let ps = participants.map(u => u.id).filter(v => v !== conn.user.jid && v.startsWith(lol));
    let bot = global.db.data.settings[conn.user.jid] || {};
    if (ps == '') return m.reply(`⚠️ Nessun numero trovato con il prefisso +${lol}.`);
    let numeros = ps.map(v => '◉ @' + v.replace(/@.+/, ''));
    const delay = time => new Promise(res => setTimeout(res, time));

    switch (command) {
        case "listanum":
            conn.reply(m.chat, `Lista dei numeri con prefisso +${lol}:\n\n` + numeros.join`\n`, m, { mentions: ps });
            break;

        case "pulizia":
            if (!bot.restrict) return m.reply(`⚠️ Restrizioni disattivate. Non posso procedere.`);
            if (!isBotAdmin) return m.reply(`⚠️ Il bot deve essere amministratore per eseguire questo comando.`);
            
            conn.reply(m.chat, `Iniziando la pulizia dei numeri con prefisso +${lol}...`, m);
            let ownerGroup = m.chat.split`-`[0] + '@s.whatsapp.net';
            let users = participants.map(u => u.id).filter(v => v !== conn.user.jid && v.startsWith(lol));
            
            for (let user of users) {
                if (user !== ownerGroup && user !== conn.user.jid && user !== numeroAutorizzato && isBotAdmin && bot.restrict) {
                    await delay(500);
                    try {
                        await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
                    } catch (error) {
                        console.log(`Errore nel rimuovere ${user}:`, error);
                    }
                }
            }
            break;
    }
};

handler.command = /^(listanum|nump|pulizia)$/i;
handler.group = true;
handler.botAdmin = true;
handler.admin = true;
handler.fail = null;
export default handler;