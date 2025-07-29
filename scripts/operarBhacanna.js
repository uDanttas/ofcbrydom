import prisma from '../lib/prisma.js';

export default async function executarBotsBhacanna() {
  console.log('🤖 Iniciando operação dos 3.000 bots Bhacanna...');

  const mestre = await prisma.usuario.findUnique({
    where: { cpf: '00000000000' }, // Mestre
  });

  if (!mestre) {
    console.error('⚠️ Usuário mestre não encontrado.');
    return;
  }

  let totalLucro = 0;
  for (let i = 1; i <= 3000; i++) {
    const lucro = Math.random() * 10; // até R$10 por execução
    totalLucro += lucro;
  }

  await prisma.usuario.update({
    where: { id: mestre.id },
    data: {
      saldo: { increment: totalLucro },
      lucroHoje: { increment: totalLucro },
    },
  });

  console.log(`✅ Lucro acumulado: R$${totalLucro.toFixed(2)}`);
}