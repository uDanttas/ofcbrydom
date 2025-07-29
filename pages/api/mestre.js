const prisma = require('../../lib/prisma');

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ erro: 'Método não permitido' });

  try {
    const mestre = await prisma.usuario.findUnique({
      where: { cpf: '00000000000' },
      include: { historico: true },
    });

    if (!mestre) return res.status(404).json({ erro: 'Mestre não encontrado' });

    const metaDia = 500;
    const metaSemana = 3500;

    return res.status(200).json({
      saldo: mestre.saldo,
      metaDia,
      metaSemana,
      historicoMetas: mestre.historico.map((h) => ({
        dia: new Date(h.data).toLocaleDateString('pt-BR'),
        valor: h.valor,
      })),
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ erro: 'Erro interno' });
  }
}
