import React from "react";
import { X, ShieldCheck, CheckCircle2, AlertTriangle, MessageSquare, FileText, BadgeCheck, ExternalLink, Sparkles } from "lucide-react";

export function DeepCriterionInspector({
  isOpen,
  onClose,
  criterionKey,
  listing,
  taxonomyItem
}) {
  if (!isOpen || !listing || !criterionKey) return null;

  const result = listing.criteriaResults?.[criterionKey] || {
    label: taxonomyItem?.label || criterionKey,
    category: taxonomyItem?.category || "Comodidade",
    status: "NOT_FOUND",
    statusLabel: "Não Mencionado",
    confidenceScore: 0,
    guestEvidences: []
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-scaleUp">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-800 flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-rose-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Auditoria Profunda de Evidências</span>
            </div>
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <span>{result.label}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Análise em: <strong className="text-slate-200">{listing.title}</strong>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Status Verdict Banner */}
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between ${
              result.status === "VERIFIED_CONFIRMED"
                ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
                : result.status === "ALERT_CONTRADICTED"
                ? "bg-rose-950/40 border-rose-500/40 text-rose-200"
                : result.status === "GUEST_DISCOVERED"
                ? "bg-indigo-950/40 border-indigo-500/40 text-indigo-200"
                : result.status === "HOST_PROMISE_ONLY"
                ? "bg-amber-950/40 border-amber-500/40 text-amber-200"
                : "bg-slate-950/40 border-slate-800 text-slate-400"
            }`}
          >
            <div className="flex items-center space-x-3">
              {result.status === "VERIFIED_CONFIRMED" && <BadgeCheck className="w-6 h-6 text-emerald-400" />}
              {result.status === "ALERT_CONTRADICTED" && <AlertTriangle className="w-6 h-6 text-rose-400" />}
              {result.status === "GUEST_DISCOVERED" && <Sparkles className="w-6 h-6 text-indigo-400" />}
              {result.status === "HOST_PROMISE_ONLY" && <ShieldCheck className="w-6 h-6 text-amber-400" />}
              {result.status === "NOT_FOUND" && <X className="w-6 h-6 text-slate-500" />}

              <div>
                <span className="text-xs font-bold uppercase tracking-wider block">
                  Veredito da Auditoria
                </span>
                <span className="text-sm font-extrabold text-white">{result.statusLabel}</span>
              </div>
            </div>

            {result.detailTag && (
              <span className="px-3 py-1 rounded-xl text-xs font-bold bg-white/10 text-white border border-white/20">
                {result.detailTag}
              </span>
            )}
          </div>

          {/* Section 1: Official Amenities & Host Description */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase text-slate-300">
              <FileText className="w-4 h-4 text-rose-400" />
              <span>O que diz o Anúncio & Anfitrião</span>
            </div>

            <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Comodidade oficial listada pelo Airbnb:</span>
                <span className="font-bold text-slate-200">
                  {result.hasOfficialAmenity ? (
                    <span className="text-emerald-400">✓ Sim, consta na lista</span>
                  ) : (
                    <span className="text-slate-500">✕ Não listada oficialmente</span>
                  )}
                </span>
              </div>

              {result.hostSnippet ? (
                <div className="pt-2 border-t border-slate-800/80">
                  <span className="text-slate-400 font-medium block mb-1">
                    Trecho extraído da descrição do anfitrião:
                  </span>
                  <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-slate-200 italic font-serif leading-relaxed">
                    "{result.hostSnippet}"
                  </div>
                </div>
              ) : (
                <p className="text-slate-500 italic pt-1">
                  Nenhuma menção explícita encontrada no texto da descrição do anfitrião.
                </p>
              )}
            </div>
          </div>

          {/* Section 2: Guest Reviews Evidence */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase text-slate-300">
                <MessageSquare className="w-4 h-4 text-indigo-400" />
                <span>Relatos Reais nas Avaliações dos Hóspedes</span>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                {result.guestEvidences?.length || 0} citação(ões) encontrada(s)
              </span>
            </div>

            {result.guestEvidences && result.guestEvidences.length > 0 ? (
              <div className="space-y-3">
                {result.guestEvidences.map((evidence, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                      evidence.type === "negative"
                        ? "bg-rose-950/30 border-rose-500/30 text-rose-100"
                        : "bg-slate-950/90 border-slate-800 text-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white">{evidence.author}</span>
                        <span className="text-[11px] text-slate-500">• {evidence.date}</span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          evidence.type === "negative"
                            ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                            : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                        }`}
                      >
                        {evidence.type === "negative" ? "⚠️ Ressalva de Hóspede" : "✓ Elogio / Confirmação"}
                      </span>
                    </div>

                    <p className="italic font-serif bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
                      "{evidence.snippet || evidence.fullText}"
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 bg-slate-950/50 rounded-2xl border border-slate-800 text-center text-slate-500 text-xs">
                Nenhum hóspede mencionou especificamente este item nas avaliações recentes.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <a
            href={listing.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-rose-400 hover:text-rose-300 flex items-center space-x-1 font-semibold"
          >
            <span>Conferir anúncio original no Airbnb</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition"
          >
            Fechar Auditoria
          </button>
        </div>
      </div>
    </div>
  );
}
