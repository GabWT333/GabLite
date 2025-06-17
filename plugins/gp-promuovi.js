let handler = async (m, { conn, text }) => {
    let users = [];

    // Controlla se ci sono tag, messaggi citati o testo
    if (m.mentionedJid.length) {
        users = m.mentionedJid; // Aggiungi gli utenti taggati
    } else if (m.quoted) {
        users.push(m.quoted.sender); // Aggiungi l'utente del messaggio citato
    } else if (text) {
        let numbers = text.split(/\s+/).filter(v => v.length > 0); // Dividi input in numeri separati da spazi
        for (let number of numbers) {
            if (isNaN(number)) {
                if (number.includes('@')) {
                    users.push(number.split`@`[1] + '@s.whatsapp.net');
                }
            } else {
                users.push(number + '@s.whatsapp.net');
            }
        }
    }

    // Se non ci sono utenti validi, termina
    if (users.length === 0) return;

    // Promuovi tutti gli utenti elencati
    for (let user of users) {
        await conn.groupParticipantsUpdate(m.chat, [user], 'promote');
    }
};

handler.command = /^(promote|promuovi|mettiadmin|p)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.fail = null;

export default handler;