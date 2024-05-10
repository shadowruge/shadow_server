const socialMediaLinks = `<b>Conecte-se conosco!</b>\n\n
1️⃣ <a href="https://www.instagram.com/infodevbrasil/">Canal Instagram</a>\n\n
2️⃣ <a href="https://www.facebook.com/infoservicesbrasil">Fan page do Facebook</a>\n\n
3️⃣ <a href="https://linktr.ee/InfododevBrasil">Linktree</a>`;


const mediaNews = `As melhores notícias!\n\n
1️⃣ https://bandnewstv.uol.com.br/ Band news\n\n
2️⃣ https://www.cnnbrasil.com.br/ao-vivo/ CNN`;

const responses = {
  'bom dia': `Olá!, bom dia!.`,
  'boa tarde': `Olá!, boa tarde!.`,
  'boa noite': `Olá!, boa noite!.`,
  'voce pode me passar suas redes sociais': `Aqui! ${socialMediaLinks}`,
  'noticias': `${mediaNews}`,
};

module.exports = {
  responses,
  socialMediaLinks,
  mediaNews,
  
};