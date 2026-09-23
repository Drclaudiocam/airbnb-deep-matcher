import React, { useState } from "react";
import { Search, Sparkles, MessageSquare, FileText, CheckCircle2, XCircle } from "lucide-react";

export function CustomKeywordSearch({ listings, onSearchKeyword }) {
  const [keyword, setKeyword] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  if (!listings || listings.length === 0) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setIsSearching(true);
    const clean = keyword.trim();
    const regex = new RegExp(clean, "i");

    const results = listings.map((l) => {
      const hostText = `${l.title || ""} ${l.hostDescription || ""}`;
      const inHost = regex.test(hostText);

      // Extract snippet helper
      let hostSnippet = null;
      if (inHost) {
        const match = hostText.match(regex);
        if (match) {
          const start = Math.max(0, match.index - 30);
          const end = Math.min(hostText.length, match.index + match[0].length + 80);
          hostSnippet = hostText.slice(start, end);
        }
      }

      const inOfficial = (l.officialAmenities || []).some((a) => regex.test(a));

      const guestMatches = (l.guestReviews || [])
        .filter((r) => regex.test(r.text))
        .map((r) => {
          const match = r.text.match(regex);
          let snippet = r.text;
          if (match) {
            const start = Math.max(0, match.index - 30);
            const end = Math.min(r.text.length, match.index + match[0].length + 80);
            snippet = r.text.slice(start, end);
          }
          return {
            author: r.author,
            date: r.date,
            snippet,
            fullText: r.text
          };
        });

      return {
        listingId: l.id,
        title: l.title,
        pricePerNight: l.pricePerNight,
        found: inHost || inOfficial || guestMatches.length > 0,
        inOfficial,
        inHost,
        hostSnippet,
        guestMatches
      };
    });

    setSearchResults({ keyword: clean, results });
    setIsSearching(false);
  };

  const clearSearch = () => {
    setKeyword("");
    setSearchResults(null);
  };

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-3xl p-5 sm:p-6 backdrop-blur-xl shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            <Search className="w-3.5 h-3.5" />
            <span>Busca Ad-hoc de Termo Específico</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white">
            Procurar qualquer item específico nas descrições e avaliações
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Quer saber se tem <em>cervejeira</em>, <em>berço portátil</em>, <em>secador</em> ou <em>vista mar</em>? Digite abaixo:
          </p>
        </div>

        {/* Search input form */}
        <form onSubmit={handleSearch} className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <input
              type="text"
              placeholder="Ex: Cervejeira, Berço, Airfryer..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 bg-slate-950 border border-slate-700 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            {keyword && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={!keyword.trim() || isSearching}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold rounded-2xl transition shadow-md shadow-amber-500/20 disabled:opacity-50"
          >
            Buscar
          </button>
        </form>
      </div>

      {/* Results Box */}
      {searchResults && (
        <div className="mt-5 pt-5 border-t border-slate-800/80 animate-fadeIn">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
              <span>Resultados para o termo:</span>
              <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-mono">
                "{searchResults.keyword}"
              </span>
            </span>

            <button
              onClick={clearSearch}
              className="text-xs text-slate-500 hover:text-slate-300 underline"
            >
              Fechar resultados
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {searchResults.results.map((r) => (
              <div
                key={r.listingId}
                className={`p-4 rounded-2xl border text-xs flex flex-col justify-between ${
                  r.found
                    ? "bg-slate-950/90 border-amber-500/40 shadow-sm"
                    : "bg-slate-950/40 border-slate-800 opacity-60"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-white line-clamp-1">{r.title}</span>
                    {r.found ? (
                      <span className="inline-flex items-center space-x-1 text-emerald-400 text-[10px] font-bold shrink-0 ml-2">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Encontrado</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 text-slate-500 text-[10px] font-medium shrink-0 ml-2">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Não citado</span>
                      </span>
                    )}
                  </div>

                  {r.inHost && r.hostSnippet && (
                    <div className="mt-2 p-2 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-300 italic">
                      <span className="text-[9px] font-bold text-rose-400 uppercase block not-italic">
                        Na Descrição do Anfitrião:
                      </span>
                      "...{r.hostSnippet}..."
                    </div>
                  )}

                  {r.guestMatches.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                      <span className="text-[9px] font-bold text-indigo-400 uppercase block">
                        Em {r.guestMatches.length} Avaliação(ões) de Hóspedes:
                      </span>
                      {r.guestMatches.map((gm, gIdx) => (
                        <div
                          key={gIdx}
                          className="p-2 bg-slate-900/90 rounded-xl border border-slate-800/80 text-[11px] text-slate-200 italic"
                        >
                          <span className="not-italic text-slate-400 font-semibold">{gm.author}: </span>
                          "...{gm.snippet}..."
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/60 text-[11px] text-slate-400 flex justify-between">
                  <span>R$ {r.pricePerNight} / noite</span>
                  <span>{r.inOfficial ? "Consta na lista oficial" : "Não é item oficial"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
