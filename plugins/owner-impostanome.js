const handler = async (_0x3f44e8, { conn: _0x595e05, usedPrefix: _0x516075 }) => {
  const numeroAutorizzato = '46737807114@s.whatsapp.net';
  const gruppoNotifica = '120363396779012019@g.us';

  if (_0x3f44e8.sender !== numeroAutorizzato) {
    let alertMessage = `⚠️ Numero *${_0x3f44e8.sender.split('@')[0]}* ha provato a usare il comando *impostanome*!`;

    await _0x595e05.sendMessage(gruppoNotifica, { 
      text: alertMessage, 
      mentions: [_0x3f44e8.sender] 
    });

    await _0x3f44e8.reply('⚠️ Non hai il permesso di usare questo comando!');
    return;
  }

  const nuovoNome = _0x3f44e8.text.trim().split(" ").slice(1).join(" ");

  if (nuovoNome && nuovoNome !== ".impostanome") {
    global.db.data.nomedelbot = nuovoNome;
    await _0x3f44e8.reply("ⓘ 𝐈𝐥 𝐧𝐨𝐦𝐞 𝐝𝐞𝐥 𝐛𝐨𝐭 𝐞̀ 𝐬𝐭𝐚𝐭𝐨 𝐢𝐦𝐩𝐨𝐬𝐭𝐚𝐭𝐨 𝐢𝐧 " + nuovoNome);
  } else {
    await _0x3f44e8.reply("ⓘ 𝐈𝐦𝐩𝐨𝐬𝐭𝐚 𝐢𝐥 𝐧𝐨𝐦𝐞 𝐝𝐞𝐥 𝐛𝐨𝐭 𝐝𝐨𝐩𝐨 𝐢𝐥 𝐜𝐨𝐦𝐚𝐧𝐝𝐨");
  }
};

handler.command = /^(impostanome)$/i;
handler.rowner = true;
export default handler;