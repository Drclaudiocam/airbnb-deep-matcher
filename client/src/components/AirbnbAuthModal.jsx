import React, { useState } from "react";
import { X, ShieldCheck, Heart, Sparkles, LogOut, CheckCircle2, ArrowRight, UserCheck, Link2 } from "lucide-react";

export function AirbnbAuthModal({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  onImportWishlist,
  wishlists
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [customWishlistUrl, setCustomWishlistUrl] = useState("");
  const [isImporting, setIsImporting] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    onLogin(email || "usuario@airbnb.com.br", name || "Hóspede Airbnb");
  };

  const handleQuickDemoLogin = () => {
    onLogin("lucas.mendonca@example.com", "Lucas Mendonça");
  };

  const handleImportWishlist = (wishlistIdOrUrl) => {
    setIsImporting(true);
    onImportWishlist(wishlistIdOrUrl);
    setTimeout(() => {
      setIsImporting(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden animate-scaleUp">
        {/* Header with Airbnb brand identity */}
        <div className="p-6 bg-gradient-to-r from-slate-950 via-rose-950/30 to-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 to-rose-500 flex items-center justify-center shadow-lg shadow-rose-500/20">
              <span className="text-white font-black text-xl">A</span>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {currentUser ? "Sua Conta do Airbnb Conectada" : "Conectar Conta do Airbnb"}
              </h3>
              <p className="text-xs text-slate-400">
                {currentUser
                  ? "Sincronize listas de favoritos e estadias salvas"
                  : "Acesse seus favoritos e importe wishlists para comparar"}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {currentUser ? (
            /* Logged In View */
            <div className="space-y-5">
              {/* User Profile Card */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3.5">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-rose-500"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-bold text-white">{currentUser.name}</h4>
                      <span className="px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 text-[10px] font-bold border border-rose-500/30">
                        {currentUser.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{currentUser.email}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Membro desde {currentUser.joinedYear} • {currentUser.tripsCount} viagens realizadas
                    </p>
                  </div>
                </div>

                <button
                  onClick={onLogout}
                  title="Desconectar"
                  className="p-2 text-slate-400 hover:text-rose-400 rounded-xl hover:bg-slate-800 transition"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>

              {/* Wishlists Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-rose-400 uppercase tracking-wider">
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                    <span>Suas Listas de Favoritos (Wishlists)</span>
                  </div>
                  <span className="text-[11px] text-slate-500">Clique para carregar</span>
                </div>

                <div className="space-y-2.5">
                  {(wishlists || currentUser.wishlists || []).map((wl) => (
                    <div
                      key={wl.id}
                      className="p-3.5 bg-slate-950/80 hover:bg-slate-800/80 rounded-2xl border border-slate-800 hover:border-rose-500/40 transition flex items-center justify-between group cursor-pointer"
                      onClick={() => handleImportWishlist(wl.id)}
                    >
                      <div>
                        <h5 className="text-xs font-bold text-white group-hover:text-rose-400 transition">
                          {wl.title}
                        </h5>
                        <p className="text-[11px] text-slate-400">{wl.count} acomodações salvas</p>
                      </div>

                      <button
                        type="button"
                        className="px-3 py-1.5 bg-rose-500/15 text-rose-300 group-hover:bg-rose-600 group-hover:text-white rounded-xl text-xs font-bold transition flex items-center space-x-1"
                      >
                        <span>Comparar Lista</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Import Custom Wishlist URL */}
              <div className="pt-3 border-t border-slate-800">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Ou cole o link de outra Wishlist do Airbnb:
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="https://www.airbnb.com.br/wishlists/..."
                    value={customWishlistUrl}
                    onChange={(e) => setCustomWishlistUrl(e.target.value)}
                    className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                  <button
                    type="button"
                    disabled={!customWishlistUrl.trim() || isImporting}
                    onClick={() => handleImportWishlist(customWishlistUrl)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition disabled:opacity-50"
                  >
                    Importar
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Login Form View */
            <div className="space-y-4">
              <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
                <div className="flex items-center space-x-2 text-rose-400 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Conexão Segura & Sincronização</span>
                </div>
                <p>
                  Conecte sua conta do Airbnb para importar instantaneamente suas <strong>Wishlists</strong> e listas de favoritos de viagem para auditoria profunda.
                </p>
              </div>

              {/* 1-Click Demo Login */}
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full py-3 px-4 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white text-xs font-extrabold rounded-2xl transition shadow-lg shadow-rose-600/30 flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>⚡ Conectar como Lucas Mendonça (Superguest - 1 Clique)</span>
              </button>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-800" />
                <span className="flex-shrink mx-4 text-[10px] uppercase font-bold text-slate-500">
                  Ou entre com seus dados
                </span>
                <div className="flex-grow border-t border-slate-800" />
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    Nome Completo:
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                    E-mail da sua conta Airbnb:
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="seu.email@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition"
                >
                  Confirmar e Conectar
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
