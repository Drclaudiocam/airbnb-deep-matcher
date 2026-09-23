import React from "react";
import { X, Sparkles, ShieldCheck, Search, CheckCircle, AlertTriangle, Users } from "lucide-react";

export function QuickHelpModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Como funciona o Airbnb Deep Match?</h3>
              <p className="text-xs text-slate-400">Inteligência analítica para quem busca acomodações com alta exigência</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-300 leading-relaxed">
          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 font-bold text-rose-400 text-sm">
              <Search className="w-4 h-4" />
              <span>1. Varredura Multicamadas</span>
            </div>
            <p>
              O sistema analisa 3 fontes de verdade em cada acomodação:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400 pl-1">
              <li><strong className="text-slate-200">Comodidades Oficiais:</strong> Tags padronizadas cadastradas no Airbnb.</li>
              <li><strong className="text-slate-200">Descrição do Anfitrião:</strong> Texto livre onde o anfitrião detalha marcas (ex: <em>Airfryer Mondial</em>, <em>Nespresso</em>, <em>Bomba de Calor</em>).</li>
              <li><strong className="text-slate-200">Avaliações de Hóspedes:</strong> Onde a verdade aparece! Buscamos confirmações reais de água quente, velocidade da internet e eletrodomésticos.</li>
            </ul>
          </div>

          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 font-bold text-emerald-400 text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>2. Score de Fidelidade (Promessa vs. Realidade)</span>
            </div>
            <p>
              Compara o que o anfitrião promete na descrição com o relato de quem realmente se hospedou.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
              <div className="p-2.5 bg-emerald-950/40 rounded-xl border border-emerald-500/30 text-emerald-200">
                <strong>✓ Confirmado:</strong> Hóspedes elogiaram e confirmaram que a piscina estava bem quentinha ou que usaram a airfryer.
              </div>
              <div className="p-2.5 bg-rose-950/40 rounded-xl border border-rose-500/30 text-rose-200">
                <strong>⚠️ Alerta:</strong> Hóspedes relataram que o aquecedor estava desligado, quebrado ou dependia de sol forte.
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center space-x-2 font-bold text-indigo-400 text-sm">
              <Users className="w-4 h-4" />
              <span>3. Votação & Exportação em Grupo</span>
            </div>
            <p>
              Planejando viajar com amigos ou família? Cada pessoa pode votar nas opções preferidas e você pode baixar o <strong>Relatório em PDF</strong> ou copiar o resumo pronto para o <strong>WhatsApp</strong>.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl transition"
          >
            Entendido, vamos lá!
          </button>
        </div>
      </div>
    </div>
  );
}
