import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

/**
 * Finnhub /quote — one request per symbol.
 * https://finnhub.io/docs/api/quote
 */
const TICKERS = [
  { symbol: 'BINANCE:BTCUSDT', label: 'BTC-USD', format: 'crypto' },
  { symbol: 'BINANCE:ETHUSDT', label: 'ETH-USD', format: 'crypto' },
  { symbol: 'OANDA:EUR_USD', label: 'EUR/USD', format: 'fx' },
  { symbol: 'OANDA:GBP_USD', label: 'GBP/USD', format: 'fx' },
  { symbol: 'AAPL', label: 'AAPL', format: 'stock' },
  { symbol: 'MSFT', label: 'MSFT', format: 'stock' },
  { symbol: 'AMZN', label: 'AMZN', format: 'stock' },
  { symbol: 'GOOGL', label: 'GOOGL', format: 'stock' },
  { symbol: 'NVDA', label: 'NVDA', format: 'stock' },
  { symbol: 'META', label: 'META', format: 'stock' },
  { symbol: 'TSLA', label: 'TSLA', format: 'stock' },
  { symbol: 'AMD', label: 'AMD', format: 'stock' },
  { symbol: 'NFLX', label: 'NFLX', format: 'stock' },
  { symbol: 'JPM', label: 'JPM', format: 'stock' },
  { symbol: 'SPY', label: 'SPY', format: 'stock' },
];

function formatPrice(c, format) {
  if (c == null || Number.isNaN(Number(c))) return '—';
  const n = Number(c);
  if (format === 'fx') return n.toFixed(4);
  if (format === 'crypto') return n >= 1000 ? n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : n.toFixed(2);
  return n.toFixed(2);
}

function formatChange(d) {
  if (d == null || Number.isNaN(Number(d))) return '—';
  const n = Number(d);
  const abs = Math.abs(n);
  if (abs < 0.0005 && abs > 0) return n.toFixed(4);
  if (abs < 1) return n.toFixed(4);
  return n.toFixed(2);
}

export default function MarketTicker() {
  const token = process.env.REACT_APP_FINNHUB_API_KEY;
  const prefersReducedMotion = usePrefersReducedMotion();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchQuote = async (t) => {
      const url = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(t.symbol)}&token=${encodeURIComponent(token)}`;
      const res = await fetch(url);
      if (!res.ok) return { ...t, error: true };
      const data = await res.json();
      const c = data.c;
      const d = data.d;
      const dp = data.dp;
      if (c == null && data.pc == null) return { ...t, error: true };
      return { ...t, c, d: d ?? 0, dp: dp ?? 0 };
    };

    (async () => {
      setLoading(true);
      try {
        const results = await Promise.all(TICKERS.map((t) => fetchQuote(t)));
        if (!cancelled) setRows(results.filter((r) => !r.error));
      } catch {
        if (!cancelled) setRows([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    const id = setInterval(() => {
      Promise.all(TICKERS.map((t) => fetchQuote(t))).then((results) => {
        if (!cancelled) setRows(results.filter((r) => !r.error));
      });
    }, 60000);

    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [token]);

  if (!token) {
    return null;
  }

  const displayRows =
    loading && rows.length === 0
      ? TICKERS.map((t) => ({ ...t, c: null, d: null, dp: null, loading: true }))
      : rows;

  const loopRows = prefersReducedMotion ? displayRows : [...displayRows, ...displayRows];

  return (
    <div className="glass-liquid glass-edge-light bg-white/60 dark:bg-black/40 text-gray-900 dark:text-white border-b border-black/5 dark:border-white/5 text-[11px] sm:text-xs leading-tight transition-colors duration-300">
      <div
        className={`max-w-[100vw] ticker-marquee-wrap ${prefersReducedMotion ? 'overflow-x-auto' : 'overflow-hidden'}`}
      >
        <div
          className={`flex w-max items-stretch py-2 gap-0 px-2 sm:px-4 ${
            prefersReducedMotion ? '' : 'ticker-marquee-track'
          }`}
        >
          {loopRows.map((row, i) => (
            <div
              key={`${row.symbol}-${i}`}
              className={`flex-shrink-0 px-3 sm:px-5 border-r border-black/10 dark:border-white/10 last:border-r-0 ${
                i === 0 ? 'pl-2 sm:pl-4' : ''
              }`}
            >
              <TickerCell row={row} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TickerCell({ row }) {
  return (
    <>
      <div className="flex justify-between gap-4 min-w-[7.5rem] sm:min-w-[8.5rem]">
        <span className="font-medium text-gray-900 dark:text-white tracking-tight">{row.label}</span>
        <span className="tabular-nums text-gray-900 dark:text-white">
          {row.loading ? '…' : formatPrice(row.c, row.format)}
        </span>
      </div>
      <div className="flex items-center gap-1 mt-0.5 tabular-nums">
        {row.loading || row.c == null ? (
          <span className="text-gray-400 dark:text-gray-500">…</span>
        ) : (
          <>
            {row.dp >= 0 ? (
              <ChevronUp className="w-3 h-3 shrink-0 text-emerald-600 dark:text-emerald-400" strokeWidth={2.5} />
            ) : (
              <ChevronDown className="w-3 h-3 shrink-0 text-rose-600 dark:text-rose-400" strokeWidth={2.5} />
            )}
            <span className={row.dp >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
              {`${row.dp >= 0 ? '+' : ''}${Number(row.dp).toFixed(2)}% (${row.d >= 0 ? '+' : ''}${formatChange(row.d)})`}
            </span>
          </>
        )}
      </div>
    </>
  );
}
