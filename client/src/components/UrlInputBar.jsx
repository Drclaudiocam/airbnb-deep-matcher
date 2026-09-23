import React, { useState } from "react";
import { Link2, Sparkles, Plus, Trash2, Search, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

export function UrlInputBar({
  onAnalyzeUrls,
  onLoadBenchmarks,
  isLoading,
  currentListingsCount
}) {
  const [urlsText, setUrlsText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!urlsText.trim()) return;

    // Split by newlines, commas or spaces
    const urls = urlsText
      .split(/[\n, ]+/)
      .map((u) => u.trim())
      .filter((u) => u.length > 5);

    if (urls.length === 0) {
      alert("Por favor, cole links válidos do Airbnb.");
      return;
    }

    onAnalyzeUrls(urls);
    setIsExpanded(false);
  };

  return (
    <div className="w-full bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Heading & Test Drive Button */}
        <div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center justify-center p-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Link2 className="w-4 h-4" />
            </span>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Análise Profunda de Acomodações
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Cole links do Airbnb para cruzar comodidades oficiais, descrições do anfitrião e depoimentos de hóspedes, ou carregue nossos benchmarks pré-analisados.
          </p>
        </div>

        {/* Right: 1-Click Benchmark Action */}
        <div className="flex items-center flex-wrap gap-2.5">
          <button
            onClick={onLoadBenchmarks}
            disabled={isLoading}
            className="px-4 py-2.5 rounded-2xl text-xs font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition flex items-center space-x-2 shadow-sm hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>⚡ Carregar 5 Exemplos Reais (1-Clique)</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center space-x-2 border ${
              isExpanded
                ? "bg-slate-800 text-white border-slate-600"
                : "bg-rose-600 text-white hover:bg-rose-500 border-rose-500 shadow-lg shadow-rose-600/20"
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>{isExpanded ? "Fechar Inserção de Links" : "Adicionar Links do Airbnb"}</span>
          </button>
        </div>
      </div>

      {/* Expandable URL Input Form */}
      {isExpanded && (
        <form onSubmit={handleSubmit} className="mt-5 pt-5 border-t border-slate-800/80 animate-fadeIn">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Cole URLs ou IDs do Airbnb (uma por linha ou separadas por vírgula):
              </label>
              <button
                type="button"
                onClick={() => setUrlsText("")}
                className="text-[11px] text-slate-500 hover:text-slate-300 flex items-center space-x-1"
              >
                <Trash2 className="w-3 h-3" />
                <span>Limpar</span>
              </button>
            </div>
            <textarea
              rows={3}
              required
              placeholder={`https://www.airbnb.com.br/rooms/10849201\nhttps://www.airbnb.com.br/rooms/20938492\nhttps://www.airbnb.com.br/rooms/30192847`}
              value={urlsText}
              onChange={(e) => setUrlsText(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700/80 rounded-2xl text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-rose-500 font-mono transition resize-none"
            />
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Dica: Você pode comparar de 2 até 10 links simultaneamente.
            </span>
            <button
              type="submit"
              disabled={isLoading || !urlsText.trim()}
              className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 rounded-xl transition shadow-lg shadow-rose-600/30 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analisando Anúncios & Reviews...</span>
                </>
              ) : (
                <>
                  <span>Executar Varredura Profunda</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Quick Status Bar */}
      {currentListingsCount > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-800/40 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>
              <strong className="text-slate-200">{currentListingsCount}</strong> acomodações carregadas na matriz comparativa
            </span>
          </div>
          <span className="text-[11px] text-slate-500">
            Atualização em tempo real conforme o perfil selecionado
          </span>
        </div>
      )}
    </div>
  );
}
