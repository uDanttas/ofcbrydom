import prisma from './prisma.js';

/**
 * Função para calcular os lucros dos 3.000 bots Bhacanna do mestre.
 */
export async function operarBhacanna() {
  const mestre = await prisma.usuario.findFirst({
    where: { tipo: 'mestre' }
  });

  if (!mestre) {
    throw new Error('Usuário mestre não encontrado');
  }

  let totalLucro = 0;
  for (let i = 0; i < 3000; i++) {
    const lucro = Math.random() * 10;
    totalLucro += lucro;
  }

  await prisma.usuario.update({
    where: { id: mestre.id },
    data: {
      saldo: { increment: totalLucro },
      lucroHoje: { increment: totalLucro }
    }
  });

  console.log(`Lucro total Bhacanna: R$${totalLucro.toFixed(2)}`);
}
