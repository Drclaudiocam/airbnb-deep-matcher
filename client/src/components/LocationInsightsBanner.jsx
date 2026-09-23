import React from "react";
import { Sparkles, Compass, Lightbulb, CheckCircle2, AlertCircle, ArrowRight, Flame } from "lucide-react";
import { getDestinationInsight, DESTINATIONS_CATALOG } from "../data/destinationsData.js";

export function LocationInsightsBanner({
  currentLocation,
  currentEnvironment,
  onSelectQuickKeyword,
  onSwitchProfile
}) {
  // Find specific city insight or fallback to environment preset
  const insight = getDestinationInsight(currentLocation);

  // If no specific city selected, get a highlight based on environment
  let fallbackTitle = "Indicações & Dicas para Toda a Viagem";
  let fallbackTagline = "Auditoria inteligente de itens críticos para evitar surpresas";
  let fallbackTip = "Use a busca profunda para confirmar se comodidades essenciais (como piscina quente de verdade e airfryer) foram comprovadas por hóspedes anteriores.";
  let fallbackAmenities = [
    { label: "Piscina Aquecida", reason: "Confira nos relatos se esquenta mesmo em dias nublados" },
    { label: "Fritadeira Airfryer", reason: "Comodidade indispensável para refeições práticas" },
    { label: "Wi-Fi Rápido e Estável", reason: "Evita quedas em reuniões de trabalho" },
    { label: "Ar-condicionado nos Quartos", reason: "Conforto térmico para noites de sono perfeitas" }
  ];

  if (currentEnvironment === "beach") {
    fallbackTitle = "🏖️ Destaques & Recomendações para Praias & Litoral";
    fallbackTagline = "Ubatuba, Florianópolis, Ilhabela, Búzios e Litoral Brasileiro";
    fallbackTip = "Em regiões litorâneas com chuvas rápidas, piscinas aquecidas por bomba de calor elétrica garantem banho quente mesmo com tempo nublado.";
  } else if (currentEnvironment === "mountain") {
    fallbackTitle = "🌲 Destaques & Recomendações para Campo, Serra & Montanhas";
    fallbackTagline = "Gramado, Campos do Jordão, Monte Verde e Serra Gaúcha/Mantiqueira";
    fallbackTip = "No frio da serra, priorize hidromassagens aquecidas a gás ou elétricas potentes e confira se a lareira tem lenha fornecida pelo anfitrião.";
  } else if (currentEnvironment === "urban") {
    fallbackTitle = "🏙️ Destaques & Recomendações para Cidades & Metrópoles";
    fallbackTagline = "São Paulo, Rio de Janeiro e Capitais";
    fallbackTip = "Foque em acomodações com espaço de trabalho ergonômico, Wi-Fi fibra testado e cortinas blackout antirruído.";
  }

  const activeInsight = insight || {
    city: currentLocation || "Brasil",
    label: fallbackTitle,
    tagline: fallbackTagline,
    climateTip: fallbackTip,
    icon: currentEnvironment === "beach" ? "🏖️" : currentEnvironment === "mountain" ? "🌲" : "✨",
    topAmenitiesToInspect: fallbackAmenities,
    popularKeywords: ["Airfryer", "Piscina aquecida", "Lareira", "Home office"]
  };

  return (
    <div className="w-full bg-gradient-to-r from-slate-900 via-slate-900/90 to-indigo-950/40 border border-slate-800 rounded-3xl p-5 sm:p-6 backdrop-blur-xl shadow-xl animate-fadeIn">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        {/* Left column: Regional Intelligence */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center space-x-2">
            <span className="text-xl">{activeInsight.icon}</span>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500/15 text-rose-400 text-[11px] font-extrabold uppercase tracking-wider border border-rose-500/30">
              Indicações Contextuais da Região
            </span>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              {activeInsight.label || activeInsight.city}
            </h3>
            <p className="text-xs font-semibold text-rose-300 mt-0.5">
              {activeInsight.tagline}
            </p>
          </div>

          {/* Golden Regional Tip */}
          <div className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 flex items-start space-x-3">
            <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed text-slate-300">
              <strong className="text-amber-300 font-bold block mb-0.5">
                Dica de Ouro dos Hóspedes para este Destino:
              </strong>
              {activeInsight.climateTip}
            </div>
          </div>
        </div>

        {/* Right column: Priority Items to Inspect for this region */}
        <div className="lg:w-96 space-y-3 shrink-0">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
              <Flame className="w-3.5 h-3.5 text-rose-500" />
              <span>Itens Críticos para Auditar Aqui:</span>
            </span>
          </div>

          <div className="space-y-2">
            {activeInsight.topAmenitiesToInspect.map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 bg-slate-950/60 hover:bg-slate-800/60 rounded-xl border border-slate-800/80 transition flex items-center justify-between group"
              >
                <div className="flex items-center space-x-2 truncate">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <div className="truncate">
                    <span className="text-xs font-bold text-white block truncate">
                      {item.label}
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {item.reason}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Keywords Chips */}
          <div className="pt-2 flex items-center flex-wrap gap-1.5 text-[11px]">
            <span className="text-slate-400 text-[10px] mr-1">Filtros rápidos:</span>
            {activeInsight.popularKeywords.map((kw) => (
              <button
                key={kw}
                onClick={() => onSelectQuickKeyword && onSelectQuickKeyword(kw)}
                className="px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/50 transition text-[10px] font-medium"
              >
                🔍 {kw}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
