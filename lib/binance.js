import Binance from 'node-binance-api';
import dotenv from 'dotenv';

dotenv.config();

const binance = new Binance().options({
  APIKEY: process.env.BINANCE_API_KEY,
  APISECRET: process.env.BINANCE_API_SECRET,
  useServerTime: true,
  recvWindow: 60000
});

export default binance;
