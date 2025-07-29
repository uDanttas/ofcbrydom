const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Criação do mestre
  await prisma.usuario.upsert({
    where: { cpf: '00000000000' },
    update: {},
    create: {
      cpf: '00000000000',
      nome: 'Mestre',
      senha: 'sagui',
      saldo: 10000,
      tipo: 'mestre',
    },
  });

  // Usuários de teste
  await prisma.usuario.upsert({
    where: { cpf: '11111111111' },
    update: {},
    create: {
      cpf: '11111111111',
      nome: 'Usuário Teste',
      senha: 'gato',
      saldo: 500,
      tipo: 'cliente',
    },
  });

  console.log('Seed executado com sucesso!');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
