"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";

function StoreFilters({ origins, roastLevels, types, smells }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [origin, setOrigin] = useState(searchParams.get("origin") || "");
  const [roastLevel, setRoastLevel] = useState(
    searchParams.get("roastLevel") || ""
  );
  const [type, setType] = useState(searchParams.get("type") || "");
  const [smell, setSmell] = useState(searchParams.get("smell") || "");
  const [priceMin, setPriceMin] = useState(searchParams.get("priceMin") || "");
  const [priceMax, setPriceMax] = useState(searchParams.get("priceMax") || "");

  const minPrices = [10, 12, 14, 16, 20, 25];
  const maxPrices = [12, 14, 16, 20, 25, 30];

  const applyFilters = async () => {
    const params = new URLSearchParams();

    if (origin) params.set("origin", origin);
    if (roastLevel) params.set("roastLevel", roastLevel);
    if (type) params.set("type", type);
    if (smell) params.set("smell", smell);
    if (priceMin) params.set("priceMin", priceMin);
    if (priceMax) params.set("priceMax", priceMax);

    router.push(`/store?${params.toString()}`);

    const scrollTop = window.innerWidth < 768 ? 300 : 500;
    const timeout = setTimeout(() => {
      window.scrollTo({ top: scrollTop, behavior: "smooth" });
    }, 1000); // delay in ms
  };
  useEffect(() => {
    applyFilters();
  }, [origin, roastLevel, type, smell, priceMin, priceMax]);

  useEffect(() => {
    const scrollTop = window.innerWidth < 768 ? 300 : 500;
    const timeout = setTimeout(() => {
      window.scrollTo({ top: scrollTop, behavior: "smooth" });
    }, 1000); // delay in ms

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-8 gap-2 text-base">
      <select
        value={origin}
        onChange={(e) => setOrigin(e.target.value)}
        className="border p-1 rounded-full"
      >
        <option value="">All Origins</option>
        {origins.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>

      <select
        value={roastLevel}
        onChange={(e) => setRoastLevel(e.target.value)}
        className="border p-1 rounded-full"
      >
        <option value="">All Roast</option>
        {roastLevels.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border p-1 rounded-full"
      >
        <option value="">All Types</option>
        {types.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <select
        value={smell}
        onChange={(e) => setSmell(e.target.value)}
        className="border p-1 rounded-full"
      >
        <option value="">All Smells</option>
        {smells.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <select
        value={priceMin}
        onChange={(e) => setPriceMin(e.target.value)}
        className="border p-1 rounded-full"
      >
        <option value="">Min Price</option>
        {minPrices.map((s) => (
          <option key={s} value={s}>
            {s} €
          </option>
        ))}
      </select>

      <select
        value={priceMax}
        onChange={(e) => setPriceMax(e.target.value)}
        className="border p-1 rounded-full"
      >
        <option value="">Max Price</option>
        {maxPrices.map((s) => (
          <option key={s} value={s}>
            {s} €
          </option>
        ))}
      </select>
    </div>
  );
}

export default StoreFilters;
