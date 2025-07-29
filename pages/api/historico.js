import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { usuarioId } = req.query;

    if (!usuarioId) {
      return res.status(400).json({ error: 'ID do usuário não fornecido.' });
    }

    try {
      const historico = await prisma.historico.findMany({
        where: { usuarioId: parseInt(usuarioId) },
        orderBy: { data: 'desc' },
      });
      return res.status(200).json(historico);
    } catch (err) {
      console.error('Erro ao buscar histórico:', err);
      return res.status(500).json({ error: 'Erro interno ao buscar histórico.' });
    }
  } else {
    return res.status(405).json({ error: 'Método não permitido.' });
  }
}
