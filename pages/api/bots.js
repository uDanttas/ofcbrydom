import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  try {
    const usuario = JSON.parse(req.headers['usuario'] || '{}');
    if (!usuario || !usuario.cpf) {
      return res.status(401).json({ erro: 'Usuário não autenticado.' });
    }

    if (req.method === 'GET') {
      // Lista bots do usuário
      const user = await prisma.usuario.findUnique({
        where: { cpf: usuario.cpf },
        include: { bots: true },
      });

      if (!user) {
        return res.status(404).json({ erro: 'Usuário não encontrado.' });
      }

      const lucroHoje = user.bots.reduce((acc, bot) => acc + (bot.lucroHoje || 0), 0);

      return res.status(200).json({
        saldo: user.saldo,
        lucroHoje,
        bots: user.bots.map((b) => ({
          id: b.id,
          saldo: b.saldo,
          lucroHoje: b.lucroHoje || 0,
          ativo: b.ativo,
        })),
      });
    }

    if (req.method === 'POST') {
      const { acao, saldoInicial } = req.body;

      if (acao === 'ativar') {
        if (!saldoInicial || saldoInicial < 50) {
          return res.status(400).json({ erro: 'Valor mínimo para ativar bot é R$50.' });
        }

        const user = await prisma.usuario.findUnique({
          where: { cpf: usuario.cpf },
        });

        if (!user) {
          return res.status(404).json({ erro: 'Usuário não encontrado.' });
        }

        if (user.saldo < saldoInicial) {
          return res.status(400).json({ erro: 'Saldo insuficiente para ativar bot.' });
        }

        // Cria o novo bot
        await prisma.bot.create({
          data: {
            usuarioCpf: usuario.cpf,
            saldo: saldoInicial,
            lucroHoje: 0,
            ativo: true,
          },
        });

        // Atualiza saldo do usuário
        await prisma.usuario.update({
          where: { cpf: usuario.cpf },
          data: { saldo: user.saldo - saldoInicial },
        });

        return res.status(200).json({ mensagem: 'Bot ativado com sucesso.' });
      }

      return res.status(400).json({ erro: 'Ação inválida.' });
    }

    return res.status(405).json({ erro: 'Método não permitido.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro interno no servidor.' });
  }
}
