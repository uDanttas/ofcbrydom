const prisma = require('../../lib/prisma');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ erro: 'Método não permitido' });

  const { cpf, senha } = req.body;
  if (!cpf || !senha) return res.status(400).json({ erro: 'CPF e senha são obrigatórios' });

  try {
    const usuario = await prisma.usuario.findUnique({ where: { cpf } });
    if (!usuario || usuario.senha !== senha) {
      return res.status(401).json({ erro: 'CPF ou senha incorretos' });
    }
    return res.status(200).json({ usuario });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ erro: 'Erro interno' });
  }
}
