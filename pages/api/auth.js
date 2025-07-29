import prisma from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { cpf, senha } = req.body;

    if (!cpf || !senha) {
      return res.status(400).json({ error: 'CPF e senha são obrigatórios.' });
    }

    try {
      const usuario = await prisma.usuario.findUnique({
        where: { cpf },
      });

      if (!usuario || usuario.senha !== senha) {
        return res.status(401).json({ error: 'CPF ou senha inválidos.' });
      }

      // Diferenciar mestre e cliente
      return res.status(200).json({
        message: 'Login realizado com sucesso!',
        usuario: {
          id: usuario.id,
          cpf: usuario.cpf,
          tipo: usuario.tipo, // mestre ou cliente
          saldo: usuario.saldo,
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  } else {
    return res.status(405).json({ error: 'Método não permitido.' });
  }
}
