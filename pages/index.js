import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: 30, fontFamily: 'sans-serif' }}>
      <h1>Bem-vindo ao BRYDOM QUANT BOT</h1>
      <p>Sistema bancário com bots de operação na Binance</p>
      <ul>
        <li><Link href="/login">Login</Link></li>
        <li><Link href="/cadastro">Cadastro</Link></li>
        <li><Link href="/painel">Painel do Cliente</Link></li>
        <li><Link href="/mestre">Painel do Mestre</Link></li>
        <li><Link href="/bhacanna">Bots Bhacanna</Link></li>
        <li><Link href="/saque">Saque</Link></li>
        <li><Link href="/deposito">Depósito</Link></li>
        <li><Link href="/historico">Histórico</Link></li>
      </ul>
    </div>
  );
}
