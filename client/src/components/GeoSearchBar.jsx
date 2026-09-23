import React, { useState } from "react";
import { MapPin, Compass, Search, Palmtree, Trees, Building2, Sparkles, X, ChevronDown } from "lucide-react";

export function GeoSearchBar({
  onSearchGeo,
  destinationsData,
  currentFilters
}) {
  const [query, setQuery] = useState(currentFilters?.query || "");
  const [selectedState, setSelectedState] = useState(currentFilters?.state || "ALL");
  const [selectedCity, setSelectedCity] = useState(currentFilters?.city || "ALL");
  const [selectedEnvironment, setSelectedEnvironment] = useState(currentFilters?.environment || "all");

  const environments = [
    { id: "all", label: "✨ Todos os Ambientes", icon: Sparkles },
    { id: "beach", label: "🏖️ Praia & Litoral", icon: Palmtree },
    { id: "mountain", label: "🌲 Campo & Serra", icon: Trees },
    { id: "urban", label: "🏙️ Urbano & Cidade", icon: Building2 }
  ];

  const handleApplyFilters = (env = selectedEnvironment, st = selectedState, ct = selectedCity, q = query) => {
    onSearchGeo({
      environment: env,
      state: st,
      city: ct,
      query: q
    });
  };

  const handleSelectEnv = (envId) => {
    setSelectedEnvironment(envId);
    handleApplyFilters(envId, selectedState, selectedCity, query);
  };

  const handleReset = () => {
    setQuery("");
    setSelectedState("ALL");
    setSelectedCity("ALL");
    setSelectedEnvironment("all");
    onSearchGeo({ environment: "all", state: "ALL", city: "ALL", query: "" });
  };

  const hasActiveFilters =
    selectedEnvironment !== "all" || selectedState !== "ALL" || selectedCity !== "ALL" || query.trim() !== "";

  return (
    <div className="w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col space-y-4">
        {/* Title and Environment Pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-rose-400 uppercase tracking-wider mb-0.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Explorar por Destino & Estilo</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Para onde você quer viajar?
            </h3>
          </div>

          {/* Quick Environment Selector */}
          <div className="flex items-center flex-wrap gap-2">
            {environments.map((env) => {
              const isActive = selectedEnvironment === env.id;
              const Icon = env.icon;
              return (
                <button
                  key={env.id}
                  onClick={() => handleSelectEnv(env.id)}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition flex items-center space-x-1.5 ${
                    isActive
                      ? "bg-gradient-to-r from-rose-600 to-rose-500 text-white shadow-md shadow-rose-500/25 ring-2 ring-rose-400/40"
                      : "bg-slate-950/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{env.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Input Bar (Airbnb Style Large Search Box) */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleApplyFilters();
          }}
          className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 p-2 bg-slate-950 border border-slate-700/80 rounded-2xl shadow-inner"
        >
          {/* Destination Text Query */}
          <div className="sm:col-span-6 relative flex items-center px-3 py-2 bg-slate-900/80 rounded-xl border border-slate-800">
            <MapPin className="w-4 h-4 text-rose-400 shrink-0 mr-2.5" />
            <div className="flex-1">
              <span className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                Destino ou Cidade
              </span>
              <input
                type="text"
                placeholder="Ex: Ubatuba, Gramado, Campos do Jordão..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
              />
            </div>
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-slate-500 hover:text-white p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* State Filter */}
          <div className="sm:col-span-3 flex items-center px-3 py-2 bg-slate-900/80 rounded-xl border border-slate-800">
            <div className="flex-1">
              <span className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                Estado (UF)
              </span>
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  handleApplyFilters(selectedEnvironment, e.target.value, selectedCity, query);
                }}
                className="w-full bg-transparent text-xs sm:text-sm text-slate-200 focus:outline-none cursor-pointer"
              >
                <option value="ALL" className="bg-slate-900 text-white">Todos os Estados</option>
                <option value="SP" className="bg-slate-900 text-white">São Paulo (SP)</option>
                <option value="RJ" className="bg-slate-900 text-white">Rio de Janeiro (RJ)</option>
                <option value="RS" className="bg-slate-900 text-white">Rio Grande do Sul (RS)</option>
                <option value="SC" className="bg-slate-900 text-white">Santa Catarina (SC)</option>
                <option value="MG" className="bg-slate-900 text-white">Minas Gerais (MG)</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="sm:col-span-3 flex items-center space-x-2">
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white text-xs font-extrabold rounded-xl transition shadow-lg shadow-rose-600/30 flex items-center justify-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>Filtrar Destinos</span>
            </button>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleReset}
                title="Limpar filtros"
                className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl transition"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>

        {/* Quick popular destinations links */}
        <div className="flex items-center flex-wrap gap-2 text-xs text-slate-400 pt-1">
          <span className="text-[11px] font-semibold text-slate-500">Destinos populares:</span>
          {["Ubatuba", "Gramado", "Campos do Jordão", "Florianópolis", "Búzios", "Monte Verde"].map((city) => (
            <button
              key={city}
              onClick={() => {
                setQuery(city);
                handleApplyFilters(selectedEnvironment, selectedState, "ALL", city);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-950/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition text-[11px]"
            >
              📍 {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
