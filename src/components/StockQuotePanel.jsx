import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

/** One Alpha Vantage call returns many tickers — avoids free-tier rate limits on multiple GLOBAL_QUOTE calls. */
function parseTopGainers(data) {
  const list = data?.top_gainers;
  if (!Array.isArray(list) || list.length === 0) return [];
  return list.slice(0, 3).map((row) => {
    const sym = row.ticker || row.symbol || '';
    const price = parseFloat(row.price, 10);
    const pctStr = (row.change_percentage || '0%').toString().replace('%', '');
    const changePct = parseFloat(pctStr, 10);
    return { symbol: sym, price, changePct };
  });
}

function parseMostActive(data) {
  const list = data?.most_actively_traded;
  if (!Array.isArray(list) || list.length === 0) return [];
  return list.slice(0, 3).map((row) => {
    const sym = row.ticker || row.symbol || '';
    const price = parseFloat(row.price, 10);
    const pctStr = (row.change_percentage || '0%').toString().replace('%', '');
    const changePct = parseFloat(pctStr, 10);
    return { symbol: sym, price, changePct };
  });
}

export default function StockQuotePanel() {
  const apiKey = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!apiKey) {
      setLoading(false);
      setError('Add REACT_APP_ALPHA_VANTAGE_API_KEY to enable live quotes.');
      return;
    }

    let cancelled = false;

    (async () => {
      setLoading(true);
      setError('');
      try {
        const url = `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${encodeURIComponent(apiKey)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Network error');
        const data = await res.json();
        if (cancelled) return;
        if (data.Note || data.Information) {
          setError('Rate limit — try again in a minute.');
          setQuotes([]);
          setLoading(false);
          return;
        }
        let rows = parseTopGainers(data);
        if (rows.length === 0) {
          rows = parseMostActive(data);
        }
        if (rows.length === 0) {
          setError('No market data right now (market closed or API format changed).');
        } else {
          setQuotes(rows);
        }
      } catch {
        if (!cancelled) setError('Could not load quotes.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [apiKey]);

  return (
    <div className="glass-liquid glass-edge-light rounded-[1.75rem] p-6 md:p-8 bg-white/30 dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-xl shadow-black/5 dark:shadow-black/20 w-full">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Market snapshot</h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Top gainers (US) — one request, no rate-limit queue</p>

      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 rounded-xl bg-white/40 dark:bg-white/5 animate-pulse" />
          ))}
        </div>
      )}

      {!loading && error && !quotes.length && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{error}</p>
      )}

      {!loading && quotes.length > 0 && (
        <ul className="space-y-3">
          {quotes.map((q) => {
            const up = q.changePct > 0;
            const flat = q.changePct === 0 || Number.isNaN(q.changePct);
            return (
              <li
                key={q.symbol}
                className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/5"
              >
                <span className="font-semibold text-gray-900 dark:text-white tabular-nums">{q.symbol}</span>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900 dark:text-white tabular-nums">
                    ${Number.isFinite(q.price) ? q.price.toFixed(2) : '—'}
                  </div>
                  <div
                    className={`text-xs flex items-center justify-end gap-0.5 tabular-nums ${
                      flat
                        ? 'text-gray-500'
                        : up
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {flat ? <Minus size={12} /> : up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {flat ? '0.00%' : `${up ? '+' : ''}${q.changePct.toFixed(2)}%`}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
