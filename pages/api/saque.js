const prisma = require('../../lib/prisma');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ erro: 'Método não permitido' });

  const { cpf, valor } = req.body;
  if (!cpf || !valor) return res.status(400).json({ erro: 'CPF e valor são obrigatórios' });

  try {
    const usuario = await prisma.usuario.findUnique({ where: { cpf } });
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
    if (usuario.saldo < valor) return res.status(400).json({ erro: 'Saldo insuficiente' });

    await prisma.usuario.update({
      where: { cpf },
      data: { saldo: usuario.saldo - valor },
    });

    await prisma.historico.create({
      data: { usuarioCpf: cpf, tipo: 'saque', valor: -valor },
    });

    return res.status(200).json({ mensagem: 'Saque realizado com sucesso' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ erro: 'Erro interno' });
  }
}
