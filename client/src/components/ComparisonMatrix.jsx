import React, { useState } from "react";
import { Check, X, ShieldAlert, Sparkles, AlertTriangle, Eye, Trophy, Filter, Star, Info } from "lucide-react";

export function ComparisonMatrix({
  listings,
  taxonomy,
  activeProfile,
  categoryWinners,
  onInspectCriterion
}) {
  const [showOnlyDifferences, setShowOnlyDifferences] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  if (!listings || listings.length === 0) return null;

  // Group taxonomy items by category
  const categories = {};
  Object.entries(taxonomy).forEach(([key, item]) => {
    const cat = item.category || "Outros";
    if (!categories[cat]) categories[cat] = [];
    categories[cat].push({ key, ...item });
  });

  // Filter categories based on profile criteria or diffs
  const renderedCategories = Object.entries(categories).map(([catName, items]) => {
    let filteredItems = items;

    if (showOnlyDifferences) {
      filteredItems = items.filter(({ key }) => {
        const statuses = listings.map((l) => l.criteriaResults?.[key]?.status || "NOT_FOUND");
        const allSame = statuses.every((s) => s === statuses[0]);
        return !allSame;
      });
    }

    return { catName, items: filteredItems };
  }).filter((group) => group.items.length > 0);

  return (
    <div className="w-full bg-slate-900/70 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl backdrop-blur-xl">
      {/* Matrix Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Matriz Comparativa Detalhada Lado a Lado</span>
            <span className="px-2.5 py-0.5 text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30 rounded-full">
              {listings.length} Acomodações
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Clique em qualquer comodidade para abrir a auditoria com citações de hóspedes
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowOnlyDifferences(!showOnlyDifferences)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-1.5 border ${
              showOnlyDifferences
                ? "bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-sm"
                : "bg-slate-800/80 text-slate-300 border-slate-700/60 hover:bg-slate-700"
            }`}
          >
            <Filter className="w-3.5 h-3.5 text-rose-400" />
            <span>{showOnlyDifferences ? "✓ Apenas Diferenças" : "Mostrar Apenas Diferenças"}</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-left">
          {/* Header Row: Listing mini-cards */}
          <thead>
            <tr>
              <th className="p-4 bg-slate-950/80 min-w-[220px] max-w-[240px] sticky left-0 z-30 border-b border-r border-slate-800 backdrop-blur-md rounded-tl-2xl">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Critérios Analisados
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Varredura em Título + Descrição + Avaliações
                </div>
              </th>

              {listings.map((listing, idx) => {
                const isTop = idx === 0;
                return (
                  <th
                    key={listing.id}
                    className={`p-4 min-w-[240px] max-w-[280px] border-b border-slate-800 align-top transition ${
                      isTop ? "bg-rose-950/20 border-t-2 border-t-rose-500" : "bg-slate-950/60"
                    }`}
                  >
                    <div className="space-y-2">
                      {isTop && (
                        <div className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold uppercase tracking-wide shadow-sm">
                          <Trophy className="w-3 h-3" />
                          <span>Top Pick</span>
                        </div>
                      )}

                      <div className="h-20 rounded-xl overflow-hidden relative group">
                        <img
                          src={listing.images?.[0] || ""}
                          alt={listing.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2">
                          <span className="text-xs font-bold text-white">
                            R$ {listing.pricePerNight} <span className="text-[10px] font-normal text-slate-300">/noite</span>
                          </span>
                        </div>
                      </div>

                      <div className="text-xs font-bold text-white line-clamp-1">
                        {listing.title}
                      </div>

                      {/* Match Score & Stars */}
                      <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
                        <div className="flex items-center space-x-1 text-amber-400 font-semibold text-[11px]">
                          <Star className="w-3 h-3 fill-amber-400" />
                          <span>{listing.rating?.toFixed(2)}</span>
                          <span className="text-slate-500">({listing.reviewCount})</span>
                        </div>
                        <span className="text-xs font-black text-rose-400">
                          {listing.match?.matchScore}% Match
                        </span>
                      </div>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          {/* Matrix Rows by Category */}
          <tbody className="divide-y divide-slate-800/60">
            {renderedCategories.map(({ catName, items }) => (
              <React.Fragment key={catName}>
                {/* Category Header Row */}
                <tr className="bg-slate-950/90">
                  <td
                    colSpan={listings.length + 1}
                    className="py-2.5 px-4 text-xs font-bold text-rose-400 uppercase tracking-wider bg-gradient-to-r from-slate-900 to-slate-950 border-y border-slate-800"
                  >
                    {catName}
                  </td>
                </tr>

                {/* Criteria Rows */}
                {items.map(({ key, label, description }) => {
                  const winnerData = categoryWinners[key];

                  return (
                    <tr key={key} className="hover:bg-slate-800/40 transition">
                      {/* Criterion Label Cell */}
                      <td className="p-4 text-xs font-semibold text-slate-200 sticky left-0 z-20 bg-slate-900/90 border-r border-slate-800/80 backdrop-blur-md">
                        <div className="flex items-center space-x-1.5">
                          <span>{label}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 font-normal mt-0.5 line-clamp-1">
                          {description}
                        </div>
                      </td>

                      {/* Listing Result Cells */}
                      {listings.map((listing) => {
                        const res = listing.criteriaResults?.[key] || {
                          status: "NOT_FOUND",
                          statusLabel: "Não encontrado"
                        };
                        const isWinner = winnerData?.winnerListingId === listing.id;

                        return (
                          <td
                            key={listing.id}
                            onClick={() => onInspectCriterion(key, listing)}
                            className={`p-3 text-xs align-middle cursor-pointer transition border-r border-slate-800/40 ${
                              isWinner ? "bg-emerald-950/15" : ""
                            } hover:bg-slate-800/80`}
                            title="Clique para auditar as avaliações deste item"
                          >
                            <div className="flex flex-col space-y-1">
                              {/* Status Badge */}
                              <div className="flex items-center space-x-1.5">
                                {res.status === "VERIFIED_CONFIRMED" && (
                                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-lg text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                                    <Check className="w-3 h-3 stroke-[3]" />
                                    <span>Confirmado ({res.positiveReviewsCount})</span>
                                  </span>
                                )}

                                {res.status === "HOST_PROMISE_ONLY" && (
                                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-lg text-[11px] font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30">
                                    <span>No Anúncio</span>
                                  </span>
                                )}

                                {res.status === "GUEST_DISCOVERED" && (
                                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-lg text-[11px] font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                                    <Sparkles className="w-3 h-3" />
                                    <span>Em Reviews ({res.positiveReviewsCount})</span>
                                  </span>
                                )}

                                {res.status === "ALERT_CONTRADICTED" && (
                                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-lg text-[11px] font-bold bg-rose-500/15 text-rose-300 border border-rose-500/40 animate-pulse">
                                    <AlertTriangle className="w-3 h-3" />
                                    <span>Alerta ({res.negativeReviewsCount})</span>
                                  </span>
                                )}

                                {res.status === "NOT_FOUND" && (
                                  <span className="text-slate-600 text-xs">—</span>
                                )}

                                {isWinner && (
                                  <span className="text-[10px] text-amber-400 font-bold" title="Melhor avaliação neste item">
                                    ★
                                  </span>
                                )}
                              </div>

                              {/* Detail Snippet or Tag */}
                              {res.detailTag && (
                                <span className="text-[10px] text-slate-400 line-clamp-1 italic">
                                  {res.detailTag}
                                </span>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
