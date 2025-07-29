#!/bin/bash

echo "🚀 Iniciando bots do BRYDOM_BANK com Binance API..."

# Ativa ambiente virtual, se houver (opcional)
# source venv/bin/activate

# Caminho do script de loop contínuo
SCRIPT_PATH="./scripts/binanceLoop.js"

# Verifica se o script existe
if [ ! -f "$SCRIPT_PATH" ]; then
  echo "❌ Script não encontrado: $SCRIPT_PATH"
  exit 1
fi

# Executa o script com Node.js
node "$SCRIPT_PATH"

# Mensagem final (caso o script pare por algum motivo)
echo "⛔ Execução do bot finalizada (isso não deveria acontecer em produção)"
