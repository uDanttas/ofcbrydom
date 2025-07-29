import Link from 'next/link';

export default function Menu() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-zinc-900 text-white p-4 shadow-md flex justify-between items-center z-50">
      <div className="font-bold text-xl text-green-400">
        BRYDOM BANK
      </div>
      <ul className="flex gap-4">
        <li>
          <Link href="/">
            <span className="cursor-pointer hover:text-green-400">Início</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard">
            <span className="cursor-pointer hover:text-green-400">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link href="/ativar-bot">
            <span className="cursor-pointer hover:text-green-400">Ativar Bot</span>
          </Link>
        </li>
        <li>
          <Link href="/saque">
            <span className="cursor-pointer hover:text-green-400">Saque</span>
          </Link>
        </li>
        <li>
          <Link href="/deposito">
            <span className="cursor-pointer hover:text-green-400">Depósito</span>
          </Link>
        </li>
        <li>
          <Link href="/bhacanna">
            <span className="cursor-pointer hover:text-green-400">Bhacanna</span>
          </Link>
        </li>
        <li>
          <Link href="/mestre">
            <span className="cursor-pointer hover:text-green-400">Painel Mestre</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
