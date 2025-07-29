import Binance from 'node-binance-api';
import prisma from '../lib/prisma.js';
import dotenv from 'dotenv';

dotenv.config();

const binance = new Binance().options({
  APIKEY: process.env.BINANCE_API_KEY,
  APISECRET: process.env.BINANCE_API_SECRET,
  useServerTime: true,
});

async function operarBotsClientes() {
  const clientes = await prisma.usuario.findMany({
    where: { tipo: 'cliente' },
    include: { bots: true },
  });

  for (const cliente of clientes) {
    let lucroTotal = 0;

    for (const bot of cliente.bots) {
      if (!bot.ativo) continue;

      const valorOperacao = Math.random() * 5;
      lucroTotal += valorOperacao;

      await prisma.operacao.create({
        data: {
          usuarioId: cliente.id,
          botId: bot.id,
          valor: valorOperacao,
        },
      });
    }

    if (lucroTotal > 0) {
      await prisma.usuario.update({
        where: { id: cliente.id },
        data: { saldo: { increment: lucroTotal } },
      });
      console.log(`💰 Cliente ${cliente.cpf} ganhou R$${lucroTotal.toFixed(2)} nesta execução.`);
    }
  }
}

setInterval(operarBotsClientes, 60000); // executa a cada 1 minuto
console.log('🚀 Bots de clientes iniciados...');
