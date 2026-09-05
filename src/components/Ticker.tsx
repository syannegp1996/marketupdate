"use client";

import { useEffect, useState } from "react";
import { fetchAllTickerItems, type TickerItem } from "@/lib/ticker";

const REFRESH_INTERVAL_MS = 60_000;

export default function Ticker() {
  const [items, setItems] = useState<TickerItem[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let ignore = false;

    async function loadData() {
      try {
        const data = await fetchAllTickerItems();
        if (ignore) return;
        if (data.length > 0) {
          setItems(data);
          setStatus("ready");
        } else {
          setStatus("error");
        }
      } catch {
        if (!ignore) setStatus("error");
      }
    }

    loadData();
    const interval = setInterval(loadData, REFRESH_INTERVAL_MS);
    return () => {
      ignore = true;
      clearInterval(interval);
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="w-full bg-brand-panel text-slate-300 text-sm py-2 px-4 text-center">
        Memuat data pasar...
      </div>
    );
  }

  if (status === "error" || items.length === 0) {
    return (
      <div className="w-full bg-brand-panel text-slate-400 text-sm py-2 px-4 text-center">
        Data pasar tidak tersedia saat ini.
      </div>
    );
  }

  const loopItems = [...items, ...items];

  return (
    <div className="w-full overflow-hidden bg-brand-panel border-b border-slate-800">
      <div className="flex animate-marquee whitespace-nowrap py-2">
        {loopItems.map((item, idx) => (
          <TickerEntry key={`${item.id}-${idx}`} item={item} />
        ))}
      </div>
    </div>
  );
}

function TickerEntry({ item }: { item: TickerItem }) {
  const isUp = (item.change ?? 0) >= 0;
  return (
    <div className="flex items-center gap-2 px-4 text-sm font-medium border-r border-slate-800/60">
      <span className="text-slate-200">{item.label}</span>
      <span className="text-slate-100">{item.value}</span>
      {item.change !== undefined && (
        <span className={isUp ? "text-brand-accent" : "text-brand-danger"}>
          {isUp ? "▲" : "▼"} {Math.abs(item.change).toFixed(2)}%
        </span>
      )}
    </div>
  );
}
