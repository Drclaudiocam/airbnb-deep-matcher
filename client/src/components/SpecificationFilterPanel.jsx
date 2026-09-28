import React from "react";
import { SlidersHorizontal, Check, ShieldCheck, Star, Sparkles, Filter, X } from "lucide-react";

export function SpecificationFilterPanel({
  listings,
  activeFilters,
  onUpdateFilters,
  onResetFilters
}) {
  // Extract all distinct neighborhoods available in current listings
  const availableNeighborhoods = [
    ...new Set(listings.map((l) => l.neighborhood || l.location.split(",")[0].trim()).filter(Boolean))
  ];

  // Helper to count how many listings have a specific audited criterion verified
  const countCriterion = (criterionKey) => {
    return listings.filter((l) => {
      const res = l.criteriaResults?.[criterionKey];
      return res && (res.status === "VERIFIED_CONFIRMED" || res.status === "HOST_PROMISE_ONLY" || res.status === "GUEST_DISCOVERED");
    }).length;
  };

  const toggleAmenity = (key) => {
    const current = activeFilters.amenities || [];
    const next = current.includes(key) ? current.filter((k) => k !== key) : [...current, key];
    onUpdateFilters({ ...activeFilters, amenities: next });
  };

  const toggleNeighborhood = (neigh) => {
    const current = activeFilters.neighborhoods || [];
    const next = current.includes(neigh) ? current.filter((n) => n !== neigh) : [...current, neigh];
    onUpdateFilters({ ...activeFilters, neighborhoods: next });
  };

  const countPool = countCriterion("pool_heated");
  const countAirfryer = countCriterion("kitchen_airfryer");
  const countCoffee = countCriterion("kitchen_coffee");
  const countWifi = countCriterion("fast_wifi");
  const countAc = countCriterion("ac_all_rooms");
  const countFireplace = countCriterion("heating_fireplace");
  const countBbq = countCriterion("bbq_grill");
  const countSafety = countCriterion("kids_safety");
  const countPets = countCriterion("pet_friendly");

  const activeAmenitiesCount = activeFilters.amenities?.length || 0;
  const activeNeighCount = activeFilters.neighborhoods?.length || 0;
  const isFiltered = activeAmenitiesCount > 0 || activeNeighCount > 0 || activeFilters.superhostOnly || activeFilters.minFidelity > 50 || activeFilters.maxPrice < 2000;

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-5 shadow-xl backdrop-blur-xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-4 h-4 text-rose-500" />
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Refinar por Especificações
          </h4>
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs text-rose-400 hover:text-rose-300 flex items-center space-x-1 font-semibold"
          >
            <X className="w-3.5 h-3.5" />
            <span>Limpar</span>
          </button>
        )}
      </div>

      {/* 1. Comodidades Auditadas (The Core) */}
      <div className="space-y-2.5">
        <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
          Comodidades Auditadas nas Reviews:
        </span>

        <div className="space-y-2 text-xs">
          {[
            { key: "pool_heated", label: "🏊 Piscina Aquecida", count: countPool },
            { key: "kitchen_airfryer", label: "🍳 Fritadeira Airfryer", count: countAirfryer },
            { key: "kitchen_coffee", label: "☕ Cafeteira Nespresso / Especial", count: countCoffee },
            { key: "fast_wifi", label: "💻 Wi-Fi 400M+ Testado", count: countWifi },
            { key: "ac_all_rooms", label: "❄️ Ar-condicionado nos Quartos", count: countAc },
            { key: "heating_fireplace", label: "🔥 Lareira / Hidro Aquecida", count: countFireplace },
            { key: "bbq_grill", label: "🥩 Churrasqueira Gourmet", count: countBbq },
            { key: "kids_safety", label: "👶 Redes / Proteção Crianças", count: countSafety },
            { key: "pet_friendly", label: "🐾 Aceita Animais (Pets)", count: countPets }
          ].map((item) => {
            const isChecked = (activeFilters.amenities || []).includes(item.key);
            return (
              <label
                key={item.key}
                className={`p-2.5 rounded-xl border transition flex items-center justify-between cursor-pointer select-none ${
                  isChecked
                    ? "bg-rose-950/40 border-rose-500/60 text-white font-bold"
                    : "bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/80"
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleAmenity(item.key)}
                    className="w-4 h-4 rounded text-rose-500 bg-slate-900 border-slate-700 focus:ring-rose-500"
                  />
                  <span className="text-xs">{item.label}</span>
                </div>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                    isChecked
                      ? "bg-rose-500 text-white"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {item.count}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. Bairros da Região */}
      {availableNeighborhoods.length > 1 && (
        <div className="space-y-2 pt-3 border-t border-slate-800">
          <span className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
            Filtrar por Bairro:
          </span>

          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
            {availableNeighborhoods.map((neigh) => {
              const isChecked = (activeFilters.neighborhoods || []).includes(neigh);
              return (
                <label
                  key={neigh}
                  className="flex items-center space-x-2 text-xs text-slate-300 hover:text-white cursor-pointer select-none py-1"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleNeighborhood(neigh)}
                    className="w-3.5 h-3.5 rounded text-rose-500 bg-slate-950 border-slate-700 focus:ring-rose-500"
                  />
                  <span className="truncate">{neigh}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Faixa de Preço Máximo */}
      <div className="space-y-2 pt-3 border-t border-slate-800">
        <div className="flex items-center justify-between text-xs">
          <span className="font-extrabold uppercase tracking-wider text-slate-400">
            Preço Máximo / Noite:
          </span>
          <span className="font-black text-rose-400">
            R$ {activeFilters.maxPrice || 1500}
          </span>
        </div>
        <input
          type="range"
          min="400"
          max="2000"
          step="50"
          value={activeFilters.maxPrice || 1500}
          onChange={(e) =>
            onUpdateFilters({ ...activeFilters, maxPrice: Number(e.target.value) })
          }
          className="w-full accent-rose-500 bg-slate-950 rounded-lg cursor-pointer h-2"
        />
      </div>

      {/* 4. Score de Fidelidade Mínimo */}
      <div className="space-y-2 pt-3 border-t border-slate-800">
        <div className="flex items-center justify-between text-xs">
          <span className="font-extrabold uppercase tracking-wider text-slate-400">
            Fidelidade Mínima:
          </span>
          <span className="font-black text-emerald-400">
            {activeFilters.minFidelity || 70}%
          </span>
        </div>
        <input
          type="range"
          min="50"
          max="95"
          step="5"
          value={activeFilters.minFidelity || 70}
          onChange={(e) =>
            onUpdateFilters({ ...activeFilters, minFidelity: Number(e.target.value) })
          }
          className="w-full accent-emerald-500 bg-slate-950 rounded-lg cursor-pointer h-2"
        />
        <p className="text-[10px] text-slate-500">
          Filtra apenas acomodações com relatos positivos confirmados por hóspedes
        </p>
      </div>

      {/* 5. Superhost Only Switch */}
      <div className="pt-3 border-t border-slate-800">
        <label className="flex items-center justify-between cursor-pointer select-none text-xs">
          <div className="flex items-center space-x-2 text-slate-300">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="font-bold">Apenas Superhosts</span>
          </div>
          <input
            type="checkbox"
            checked={Boolean(activeFilters.superhostOnly)}
            onChange={(e) =>
              onUpdateFilters({ ...activeFilters, superhostOnly: e.target.checked })
            }
            className="w-4 h-4 rounded text-rose-500 bg-slate-950 border-slate-700"
          />
        </label>
      </div>
    </div>
  );
}
