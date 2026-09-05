export interface TickerItem {
  id: string;
  label: string;
  value: string;
  change?: number;
}

const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,ripple,cardano,solana,dogecoin&vs_currencies=usd&include_24hr_change=true";

const FOREX_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";

const CRYPTO_LABELS: Record<string, string> = {
  bitcoin: "BTC",
  ethereum: "ETH",
  binancecoin: "BNB",
  ripple: "XRP",
  cardano: "ADA",
  solana: "SOL",
  dogecoin: "DOGE",
};

const FOREX_PAIRS: Record<string, string> = {
  idr: "USD/IDR",
  eur: "USD/EUR",
  jpy: "USD/JPY",
  gbp: "USD/GBP",
  sgd: "USD/SGD",
  aud: "USD/AUD",
};

export async function fetchCryptoTicker(): Promise<TickerItem[]> {
  const res = await fetch(COINGECKO_URL, { cache: "no-store" });
  if (!res.ok) throw new Error(`CoinGecko request failed: ${res.status}`);
  const data = await res.json();

  return Object.entries(CRYPTO_LABELS)
    .filter(([id]) => data[id])
    .map(([id, label]) => {
      const price = data[id].usd;
      const change = data[id].usd_24h_change;
      return {
        id,
        label,
        value: `$${Number(price).toLocaleString("en-US", {
          maximumFractionDigits: price < 1 ? 4 : 2,
        })}`,
        change: typeof change === "number" ? change : undefined,
      };
    });
}

export async function fetchForexTicker(): Promise<TickerItem[]> {
  const res = await fetch(FOREX_URL, { cache: "no-store" });
  if (!res.ok) throw new Error(`Forex request failed: ${res.status}`);
  const data = await res.json();
  const rates = data.usd;

  return Object.entries(FOREX_PAIRS)
    .filter(([code]) => rates?.[code] !== undefined)
    .map(([code, label]) => ({
      id: code,
      label,
      value: Number(rates[code]).toLocaleString("en-US", {
        maximumFractionDigits: code === "idr" || code === "jpy" ? 0 : 4,
      }),
    }));
}

export async function fetchAllTickerItems(): Promise<TickerItem[]> {
  const [crypto, forex] = await Promise.allSettled([
    fetchCryptoTicker(),
    fetchForexTicker(),
  ]);

  return [
    ...(crypto.status === "fulfilled" ? crypto.value : []),
    ...(forex.status === "fulfilled" ? forex.value : []),
  ];
}
