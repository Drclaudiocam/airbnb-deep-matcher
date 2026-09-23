import React, { useState } from "react";
import { SlidersHorizontal, Plus, Check, Sparkles, X, ShieldAlert } from "lucide-react";

export function ProfileSelector({
  profiles,
  activeProfileId,
  onSelectProfile,
  onCreateProfile,
  allTaxonomy
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customDesc, setCustomDesc] = useState("");
  const [selectedCriteria, setSelectedCriteria] = useState({});

  const activeProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0];

  const handleOpenModal = () => {
    // initialize criteria with defaults
    const initial = {};
    Object.keys(allTaxonomy).forEach((key) => {
      initial[key] = { enabled: false, weight: 2, required: false };
    });
    setSelectedCriteria(initial);
    setCustomName("");
    setCustomDesc("");
    setIsModalOpen(true);
  };

  const toggleCriterion = (key) => {
    setSelectedCriteria((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        enabled: !prev[key]?.enabled
      }
    }));
  };

  const updateWeight = (key, weight) => {
    setSelectedCriteria((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        weight
      }
    }));
  };

  const toggleRequired = (key) => {
    setSelectedCriteria((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        required: !prev[key]?.required
      }
    }));
  };

  const handleSaveCustomProfile = (e) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const criteriaList = Object.entries(selectedCriteria)
      .filter(([_, val]) => val.enabled)
      .map(([id, val]) => ({
        id,
        weight: val.weight,
        required: val.required
      }));

    if (criteriaList.length === 0) {
      alert("Selecione pelo menos um critério para o perfil.");
      return;
    }

    onCreateProfile({
      name: customName,
      description: customDesc || "Perfil personalizado",
      criteria: criteriaList
    });

    setIsModalOpen(false);
  };

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 backdrop-blur-md">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Profile Intro */}
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-rose-400 uppercase tracking-wider mb-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Perfil de Prioridades & Match</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span>{activeProfile?.name}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {activeProfile?.description}
          </p>
        </div>

        {/* Profile Selector Pills */}
        <div className="flex items-center flex-wrap gap-2">
          {profiles.map((p) => {
            const isActive = p.id === activeProfileId;
            return (
              <button
                key={p.id}
                onClick={() => onSelectProfile(p.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-1.5 ${
                  isActive
                    ? "bg-rose-500 text-white shadow-md shadow-rose-500/25 ring-2 ring-rose-400/40"
                    : "bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700/50"
                }`}
              >
                {isActive && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                <span>{p.name.split(" ")[0]} {p.name.split(" ")[1] || ""}</span>
              </button>
            );
          })}

          {/* Create Custom Profile Button */}
          <button
            onClick={handleOpenModal}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/50 hover:bg-slate-700/60 border border-dashed border-slate-600 transition flex items-center space-x-1.5"
          >
            <Plus className="w-3.5 h-3.5 text-rose-400" />
            <span>Criar Perfil</span>
          </button>
        </div>
      </div>

      {/* Active Tracked Criteria Badges */}
      <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center flex-wrap gap-2 text-xs">
        <span className="text-slate-400 text-[11px] font-medium mr-1">Critérios avaliados neste perfil:</span>
        {activeProfile?.criteria?.map((c) => {
          const item = allTaxonomy[c.id];
          if (!item) return null;
          return (
            <span
              key={c.id}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium flex items-center space-x-1.5 border ${
                c.required
                  ? "bg-rose-500/10 text-rose-300 border-rose-500/30"
                  : "bg-slate-800/60 text-slate-300 border-slate-700/40"
              }`}
            >
              <span>{item.label}</span>
              {c.required && (
                <span className="text-[9px] font-bold uppercase tracking-wider text-rose-400 bg-rose-950/60 px-1 rounded">
                  Obrigatório
                </span>
              )}
              <span className="text-[10px] text-slate-400">({c.weight}x)</span>
            </span>
          );
        })}
      </div>

      {/* Modal: Create Custom Profile */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Criar Perfil de Busca Personalizado</h3>
                  <p className="text-xs text-slate-400">Defina os itens que não podem faltar na sua viagem</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCustomProfile} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Nome do Perfil
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Fim de Semana com Churrasco & Wi-Fi"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Descrição (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: Foco em lazer com amigos e reuniões rápidas"
                  value={customDesc}
                  onChange={(e) => setCustomDesc(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Selecione os Critérios para Varredura:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-60 overflow-y-auto pr-1">
                  {Object.entries(allTaxonomy).map(([key, item]) => {
                    const state = selectedCriteria[key] || { enabled: false, weight: 2, required: false };
                    return (
                      <div
                        key={key}
                        className={`p-3 rounded-xl border transition ${
                          state.enabled
                            ? "bg-slate-800/80 border-rose-500/50"
                            : "bg-slate-950/60 border-slate-800 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <label className="flex items-center space-x-2.5 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={state.enabled}
                              onChange={() => toggleCriterion(key)}
                              className="w-4 h-4 rounded text-rose-500 bg-slate-900 border-slate-700 focus:ring-rose-500"
                            />
                            <span className="text-xs font-semibold text-slate-200">{item.label}</span>
                          </label>
                          <span className="text-[10px] text-slate-500">{item.category}</span>
                        </div>

                        {state.enabled && (
                          <div className="mt-2 pt-2 border-t border-slate-700/50 flex items-center justify-between text-[11px]">
                            <label className="flex items-center space-x-1 cursor-pointer text-slate-300">
                              <input
                                type="checkbox"
                                checked={state.required}
                                onChange={() => toggleRequired(key)}
                                className="w-3.5 h-3.5 text-rose-500 rounded bg-slate-900 border-slate-700"
                              />
                              <span className="text-rose-400 font-medium">Obrigatório</span>
                            </label>

                            <div className="flex items-center space-x-1 text-slate-400">
                              <span>Peso:</span>
                              <select
                                value={state.weight}
                                onChange={(e) => updateWeight(key, Number(e.target.value))}
                                className="bg-slate-900 border border-slate-700 text-slate-200 rounded px-1.5 py-0.5 text-xs"
                              >
                                <option value={1}>1x (Baixo)</option>
                                <option value={2}>2x (Médio)</option>
                                <option value={3}>3x (Alto)</option>
                              </select>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-400 hover:text-white rounded-xl transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition shadow-lg shadow-rose-600/20"
                >
                  Salvar Perfil de Busca
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
