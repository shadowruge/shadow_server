const TelegramBot = require('node-telegram-bot-api');
const questions = require('./questions');
const axios = require('axios');
// Token do seu bot fornecido pelo BotFather
const token = '7057872549:AAHWR4CzjBC9win-3RaocmYvXacwE3tLYk0';

// Id do seu canal
const canalId = '-1002065153465';

const bot = new TelegramBot(token, { polling: true });


bot.on('channel_post', async (msg) => {

  const canalId = msg.chat.id; // Renomeado para 'chatId'

  const text = msg.text.toLowerCase();


  if (questions.responses[text]) {

    bot.sendMessage(canalId, questions.responses[text]);

  } else if (text === 'notícias') {

    try {

      const response = await axios.get('https://newsapi.org/v2/top-headlines?country=br&apiKey=YOUR_API_KEY');

      const articles = response.data.articles;

      let message = 'As principais notícias do momento:\n\n';

      articles.forEach((article, index) => {

        message += `${index + 1}. ${article.title}\n${article.description}\n\n`;

      });

      bot.sendMessage(canalId, message, { parse_mode: 'Markdown' });

    } catch (err) {

      console.log('Erro ao obter notícias:', err);

      bot.sendMessage(canalId, 'Ocorreu um erro ao obter as notícias.');

    }

  } else {

    bot.sendMessage(canalId, 'Não entendi o que você disse. Tente novamente.');

  }


  bot.sendMessage(canalId, questions.socialMediaLinks, { parse_mode: 'HTML' });

});


bot.on('polling_error', (err) => {

  console.log('Erro no polling:', err);

});