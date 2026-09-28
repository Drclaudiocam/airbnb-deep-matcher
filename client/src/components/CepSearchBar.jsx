import React, { useState } from "react";
import { Search, MapPin, Sparkles, Navigation, Loader2, X, CheckCircle2 } from "lucide-react";

const QUICK_CEP_PRESETS = [
  { label: "🌲 Serra Negra (SP)", cep: "13930-000", city: "Serra Negra", state: "SP" },
  { label: "🌲 Campos do Jordão (SP)", cep: "12460-000", city: "Campos do Jordão", state: "SP" },
  { label: "🏖️ Ubatuba (SP)", cep: "11680-000", city: "Ubatuba", state: "SP" },
  { label: "🏖️ Jurerê Floripa (SC)", cep: "88053-300", city: "Florianópolis", state: "SC" },
  { label: "🏙️ Pinheiros SP (SP)", cep: "05414-001", city: "São Paulo", state: "SP" },
  { label: "🌲 Gramado (RS)", cep: "95670-000", city: "Gramado", state: "RS" }
];

export function CepSearchBar({
  onSearchLocation,
  resolvedLocation,
  isLoading
}) {
  const [inputValue, setInputValue] = useState("");

  // Format CEP mask as user types
  const handleInputChange = (e) => {
    let val = e.target.value;
    // If only digits entered, apply CEP mask
    if (/^\d+$/.test(val.replace(/\D/g, "")) && val.replace(/\D/g, "").length <= 8) {
      const clean = val.replace(/\D/g, "");
      if (clean.length > 5) {
        val = `${clean.slice(0, 5)}-${clean.slice(5, 8)}`;
      } else {
        val = clean;
      }
    }
    setInputValue(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const clean = inputValue.trim();
    const isCep = /^\d{5}-?\d{3}$/.test(clean);

    if (isCep) {
      onSearchLocation({ cep: clean.replace(/\D/g, ""), query: clean });
    } else {
      onSearchLocation({ query: clean, city: clean });
    }
  };

  const handleSelectPreset = (preset) => {
    setInputValue(preset.cep);
    onSearchLocation({ cep: preset.cep.replace(/\D/g, ""), city: preset.city, state: preset.state, query: preset.city });
  };

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-xl space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-rose-400 uppercase tracking-wider mb-0.5">
            <Navigation className="w-3.5 h-3.5" />
            <span>Busca por CEP, Logradouro ou Bairro</span>
          </div>
          <h3 className="text-base sm:text-xl font-extrabold text-white">
            Onde você procura acomodação?
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Digite um CEP ou nome de bairro/cidade para ver todas as opções disponíveis com mapa interativo
          </p>
        </div>

        {/* Resolved Location Badge */}
        {resolvedLocation && (
          <div className="px-3.5 py-2 bg-slate-950/80 border border-emerald-500/30 rounded-2xl flex items-center space-x-2 text-xs text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>{resolvedLocation.neighborhood ? `${resolvedLocation.neighborhood}, ` : ""}</strong>
              {resolvedLocation.city} - {resolvedLocation.state}
              {resolvedLocation.formattedCep ? ` (${resolvedLocation.formattedCep})` : ""}
            </span>
          </div>
        )}
      </div>

      {/* Main CEP/Address Search Input */}
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <div className="relative flex-1 flex items-center bg-slate-950 border border-slate-700/80 rounded-2xl px-4 py-3 shadow-inner hover:border-slate-600 transition">
          <MapPin className="w-5 h-5 text-rose-500 shrink-0 mr-3" />
          <input
            type="text"
            placeholder="Digite o CEP (ex: 13930-000) ou nome do Bairro / Cidade..."
            value={inputValue}
            onChange={handleInputChange}
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none font-medium"
          />
          {inputValue && (
            <button
              type="button"
              onClick={() => setInputValue("")}
              className="p-1 text-slate-500 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="ml-3 px-6 py-3.5 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white text-xs sm:text-sm font-extrabold rounded-2xl transition shadow-lg shadow-rose-600/30 flex items-center space-x-2 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Buscando...</span>
            </>
          ) : (
            <>
              <Search className="w-4 h-4" />
              <span>Ver Acomodações</span>
            </>
          )}
        </button>
      </form>

      {/* Quick CEP Presets Chips */}
      <div className="flex items-center flex-wrap gap-2 pt-1 text-xs text-slate-400">
        <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Testar CEPs rápidos:</span>
        </span>
        {QUICK_CEP_PRESETS.map((preset) => (
          <button
            key={preset.cep}
            type="button"
            onClick={() => handleSelectPreset(preset)}
            className="px-2.5 py-1 rounded-xl bg-slate-950/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition text-[11px] font-medium"
          >
            {preset.label} <span className="font-mono text-slate-500">({preset.cep})</span>
          </button>
        ))}
      </div>
    </div>
  );
}
