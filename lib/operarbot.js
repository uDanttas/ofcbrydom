import prisma from './prisma.js';
import binance from './binance.js';

/**
 * Função para operar os bots de um usuário.
 * @param {number} botId - ID do bot.
 * @param {number} valor - Valor da operação.
 */
export async function operarBot(botId, valor) {
  const bot = await prisma.bot.findUnique({
    where: { id: botId },
    include: { usuario: true }
  });

  if (!bot) {
    throw new Error('Bot não encontrado');
  }

  // Simula uma operação na Binance
  console.log(`Operando bot #${botId} com valor R$${valor}`);

  // Atualiza saldo do bot e do usuário
  await prisma.bot.update({
    where: { id: botId },
    data: {
      saldoBot: { increment: valor },
      Operacao: {
        create: {
          usuarioId: bot.usuarioId,
          valor
        }
      }
    }
  });

  await prisma.usuario.update({
    where: { id: bot.usuarioId },
    data: { saldo: { increment: valor } }
  });
}
