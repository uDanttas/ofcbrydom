import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-white shadow mb-6">
      <nav className="max-w-5xl mx-auto p-4 flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/mestre">Mestre</Link>
        <Link href="/historico">Histórico</Link>
        <Link href="/deposito">Depósito</Link>
        <Link href="/saque">Saque</Link>
        <Link href="/login" className="ml-auto">Login</Link>
      </nav>
    </header>
  );
}
