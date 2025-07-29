export default async function handler(req, res) {
  try {
    // Simulando 3.000 bots do mestre
    const bots = Array.from({ length: 3000 }, (_, i) => ({
      id: i + 1,
      metaBatida: Math.random() > 0.7, // 30% já atingiram meta
      lucroHoje: parseFloat((Math.random() * 600).toFixed(2)),
    }));

    res.status(200).json({ bots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao carregar bots Bhacanna" });
  }
}
