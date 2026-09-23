import React from "react";
import { Compass, Sparkles, FileDown, Users, HelpCircle, Heart, LogIn, UserCheck } from "lucide-react";

export function Navbar({ 
  onOpenVoting, 
  onOpenExport, 
  onOpenHelp,
  onOpenAuth,
  currentUser,
  activeListingCount, 
  totalVotesCount 
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 via-rose-500 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-500/20">
            <Compass className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-lg tracking-tight text-white">
                Airbnb<span className="text-rose-500">DeepMatch</span>
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-rose-500/10 text-rose-400 border border-rose-500/30 rounded-full">
                IA & Geo Reviews
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Auditoria de descrições, avaliações, comodidades e localização
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Airbnb Account / Wishlist Button */}
          {currentUser ? (
            <button
              onClick={onOpenAuth}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-950/40 hover:bg-rose-900/50 border border-rose-500/30 text-rose-200 transition flex items-center space-x-2 shadow-sm"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-5 h-5 rounded-full object-cover border border-rose-400"
              />
              <span className="hidden md:inline font-bold">{currentUser.name.split(" ")[0]}</span>
              <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-rose-500/50 transition flex items-center space-x-1.5"
            >
              <LogIn className="w-3.5 h-3.5 text-rose-400" />
              <span>Entrar com Airbnb</span>
            </button>
          )}

          {/* Trip Companion Voting Trigger */}
          <button
            onClick={onOpenVoting}
            className="relative px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 transition flex items-center space-x-1.5 shadow-sm"
          >
            <Users className="w-4 h-4 text-indigo-400" />
            <span className="hidden lg:inline">Votação</span>
            {totalVotesCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center">
                {totalVotesCount}
              </span>
            )}
          </button>

          {/* Export Report Trigger */}
          <button
            onClick={onOpenExport}
            disabled={activeListingCount === 0}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition flex items-center space-x-1.5 shadow-sm ${
              activeListingCount > 0
                ? "text-slate-100 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 border border-rose-400/30 shadow-rose-500/20 shadow-lg"
                : "text-slate-500 bg-slate-900 border border-slate-800 cursor-not-allowed"
            }`}
          >
            <FileDown className="w-4 h-4" />
            <span className="hidden sm:inline">Exportar PDF</span>
          </button>

          {/* Quick Guide / Help */}
          <button
            onClick={onOpenHelp}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Como funciona a análise profunda?"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
