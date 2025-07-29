import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Historico() {
  const [historico, setHistorico] = useState([]);
  const router = useRouter();
  const { cpf } = router.query;

  useEffect(() => {
    if (cpf) {
      fetch(`/api/historico?cpf=${cpf}`)
        .then(res => res.json())
        .then(data => setHistorico(data));
    }
  }, [cpf]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Histórico de Operações</h2>
      <ul>
        {historico.map((item, idx) => (
          <li key={idx}>
            Bot #{item.botId} - {item.tipo} - R${item.valor} em {item.data}
          </li>
        ))}
      </ul>
    </div>
  );
}
