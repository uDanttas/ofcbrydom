import binance from 'binance-api-node';
import prisma from '../../lib/prisma'; // caminho corrigido

const client = binance({
  apiKey: process.env.BINANCE_API_KEY,
  apiSecret: process.env.BINANCE_API_SECRET,
});

const META_DIARIA = 500;

export default async function handler(req, res) {
  try {
    const botsAtivos = await prisma.bot.findMany({
      where: { ativo: true },
      include: { usuario: true },
    });

    for (const bot of botsAtivos) {
      const saldo = bot.saldo;
      const lucroHoje = bot.lucroHoje || 0;

      if (saldo < 5) continue;

      const destinarParaMestre = lucroHoje >= META_DIARIA;
      const valorOperacao = 5;

      try {
        const order = await client.order({
          symbol: 'USDTBRL',
          side: 'BUY',
          type: 'MARKET',
          quoteOrderQty: valorOperacao.toFixed(2),
        });

        const usdtComprado = parseFloat(order.cummulativeQuoteQty || '0') / parseFloat(order.fills[0]?.price || '5');
        const lucroSimulado = parseFloat((Math.random() * 2).toFixed(2)); // Lucro entre 0 e 2 reais

        if (destinarParaMestre) {
          const mestre = await prisma.usuario.findFirst({ where: { mestre: true } });
          if (mestre) {
            await prisma.usuario.update({
              where: { cpf: mestre.cpf },
              data: {
                saldo: mestre.saldo + lucroSimulado,
              },
            });
          }
        } else {
          await prisma.bot.update({
            where: { id: bot.id },
            data: {
              lucroHoje: lucroHoje + lucroSimulado,
            },
          });
        }

        await prisma.bot.update({
          where: { id: bot.id },
          data: {
            saldo: saldo - valorOperacao,
          },
        });

      } catch (err) {
        console.error(`Erro ao operar bot ${bot.id}:`, err.message);
      }
    }

    return res.status(200).json({ mensagem: 'Operações concluídas com sucesso.' });

  } catch (err) {
    console.error('Erro geral:', err);
    return res.status(500).json({ erro: 'Erro interno na execução dos bots.' });
  }
}
