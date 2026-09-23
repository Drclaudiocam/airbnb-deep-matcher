import React, { useState } from "react";
import { Users, ThumbsUp, ThumbsDown, X, MessageSquare, Sparkles, Check } from "lucide-react";
import confetti from "canvas-confetti";

export function CompanionVoting({
  isOpen,
  onClose,
  listings,
  onCastVote
}) {
  const [selectedListingId, setSelectedListingId] = useState(listings[0]?.id || "");
  const [voterName, setVoterName] = useState("");
  const [voteType, setVoteType] = useState("like");
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentListing = listings.find((l) => l.id === selectedListingId) || listings[0];

  const handleSubmitVote = (e) => {
    e.preventDefault();
    if (!voterName.trim() || !selectedListingId) return;

    onCastVote({
      listingId: selectedListingId,
      voterName: voterName.trim(),
      voteType,
      comment: comment.trim()
    });

    if (voteType === "like") {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setComment("");
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Votação & Opinião do Grupo</h3>
              <p className="text-xs text-slate-400">Vote na sua acomodação favorita e compartilhe suas notas com os amigos</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form & Voting Tally */}
        <div className="p-6 overflow-y-auto space-y-6">
          <form onSubmit={handleSubmitVote} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Escolha a Acomodação:
              </label>
              <select
                value={selectedListingId}
                onChange={(e) => setSelectedListingId(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                {listings.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.title} (R$ {l.pricePerNight}/noite - {l.match?.matchScore}% Match)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Seu Nome ou Apelido:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Lucas, Mariana, João"
                  value={voterName}
                  onChange={(e) => setVoterName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Seu Voto:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setVoteType("like")}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 border ${
                      voteType === "like"
                        ? "bg-emerald-500 text-white border-emerald-400 shadow-md shadow-emerald-500/20"
                        : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>Aprovo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVoteType("dislike")}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center space-x-1.5 border ${
                      voteType === "dislike"
                        ? "bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/20"
                        : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-800"
                    }`}
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span>Ressalva</span>
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Comentário ou Ponto de Atenção (Opcional):
              </label>
              <input
                type="text"
                placeholder="Ex: Amei a piscina aquecida e a airfryer!"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition shadow-lg shadow-indigo-600/20 flex items-center space-x-2"
              >
                {isSubmitted ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Voto Registrado!</span>
                  </>
                ) : (
                  <>
                    <span>Confirmar Meu Voto</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Group Voting Tally / Standings */}
          <div className="pt-5 border-t border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Placar Atual do Grupo:
            </h4>

            <div className="space-y-3">
              {listings.map((l) => {
                const votes = l.votes || { likes: 0, dislikes: 0, voters: [] };
                return (
                  <div
                    key={l.id}
                    className="p-3.5 bg-slate-950/80 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-900">
                        <img src={l.images?.[0]} alt={l.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="font-bold text-white line-clamp-1">{l.title}</div>
                        <div className="text-[11px] text-slate-400">R$ {l.pricePerNight} / noite</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      <div className="flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-emerald-950/50 text-emerald-300 border border-emerald-500/30">
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span className="font-bold">{votes.likes || 0}</span>
                      </div>
                      <div className="flex items-center space-x-1.5 px-3 py-1 rounded-xl bg-rose-950/50 text-rose-300 border border-rose-500/30">
                        <ThumbsDown className="w-3.5 h-3.5" />
                        <span className="font-bold">{votes.dislikes || 0}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
