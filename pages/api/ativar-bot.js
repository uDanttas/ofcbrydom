import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { userId, saldo } = req.body;

      if (!userId || !saldo) {
        return res.status(400).json({ error: "Dados incompletos." });
      }
      if (saldo < 50) {
        return res.status(400).json({ error: "O saldo mínimo para ativar um bot é R$50." });
      }

      // Criar o bot vinculado ao usuário
      const bot = await prisma.bot.create({
        data: {
          usuarioId: parseInt(userId),
          saldoOperacional: parseFloat(saldo),
          status: "ativo",
        },
      });

      // Atualizar saldo do usuário (descontando)
      await prisma.usuario.update({
        where: { id: parseInt(userId) },
        data: { saldo: { decrement: parseFloat(saldo) } },
      });

      return res.status(200).json({ message: "Bot ativado com sucesso!", bot });
    } catch (error) {
      console.error("Erro ativar-bot:", error);
      return res.status(500).json({ error: "Erro interno ao ativar bot." });
    }
  } else {
    return res.status(405).json({ error: "Método não permitido" });
  }
}
