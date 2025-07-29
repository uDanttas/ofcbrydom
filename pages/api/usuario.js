const prisma = require('../../lib/prisma');

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ erro: 'Método não permitido' });

  try {
    const { usuario } = req.headers;
    if (!usuario) return res.status(400).json({ erro: 'Usuário não informado' });

    const { cpf } = JSON.parse(usuario);
    const user = await prisma.usuario.findUnique({
      where: { cpf },
      include: { historico: true },
    });

    if (!user) return res.status(404).json({ erro: 'Usuário não encontrado' });
    return res.status(200).json(user);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ erro: 'Erro interno' });
  }
}
