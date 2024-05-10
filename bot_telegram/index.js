const TelegramBot = require('node-telegram-bot-api');
const questions = require('./questions');

// Token do seu bot fornecido pelo BotFather
const token = '7057872549:AAHWR4CzjBC9win-3RaocmYvXacwE3tLYk0';

// Id do seu canal
const canalId = '-1002065153465';

const bot = new TelegramBot(token, { polling: true });


bot.on('channel_post', async (msg) => {

  const canalId = msg.chat.id; // Renomeado para 'chatId'

  const text = msg.text;


  bot.sendMessage(canalId, questions.socialMediaLinks, { parse_mode: 'HTML' });
  bot.sendMessage(canalId, questions.mediaNews, { parse_mode: 'HTML' });


});


bot.on('polling_error', (err) => {

  console.log('Erro no polling:', err);

});