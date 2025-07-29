import cron from 'node-cron';
import executarBotsBhacanna from './operarBhacanna.js';

console.log('⏳ Rodando agendador dos bots Bhacanna a cada minuto...');

cron.schedule('* * * * *', async () => {
  console.log(`🕐 Executando em: ${new Date().toLocaleString()}`);
  await executarBotsBhacanna();
});