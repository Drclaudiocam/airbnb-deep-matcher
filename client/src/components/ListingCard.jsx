import React, { useState } from "react";
import { Star, ShieldCheck, MapPin, Users, Bed, Bath, ExternalLink, ThumbsUp, AlertTriangle, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

export function ListingCard({
  listing,
  isTopPick,
  onInspectCriterion,
  onOpenVoting
}) {
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const images = listing.images || ["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"];

  const nextImage = (e) => {
    e.stopPropagation();
    setActiveImgIdx((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setActiveImgIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const matchScore = listing.match?.matchScore || 0;
  const fidelity = listing.fidelity || { score: 85, badge: "Alta Fidelidade", color: "emerald" };

  return (
    <div
      className={`relative rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between ${
        isTopPick
          ? "bg-slate-900/90 border-rose-500/60 shadow-2xl shadow-rose-500/10 ring-1 ring-rose-500/30"
          : "bg-slate-900/60 border-slate-800 hover:border-slate-700/80 shadow-lg"
      }`}
    >
      {/* Top Pick Ribbon */}
      {isTopPick && (
        <div className="absolute top-3 left-3 z-20 px-3 py-1 bg-gradient-to-r from-rose-600 to-amber-600 text-white rounded-full text-[11px] font-extrabold uppercase tracking-wider shadow-lg flex items-center space-x-1.5 animate-bounce-short">
          <span>🏆 Melhor Escolha do Perfil</span>
        </div>
      )}

      {/* Image Carousel */}
      <div className="relative h-52 w-full overflow-hidden group bg-slate-950">
        <img
          src={images[activeImgIdx]}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Carousel controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition z-10"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition z-10"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            {/* Dots */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 z-10">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    idx === activeImgIdx ? "bg-white w-3" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Match Score Badge (Circular floating) */}
        <div className="absolute top-3 right-3 z-20 bg-slate-950/90 backdrop-blur-md rounded-2xl px-3 py-1.5 border border-slate-700/80 shadow-xl flex items-center space-x-2">
          <div className="text-right">
            <span className="text-[9px] uppercase font-bold text-slate-400 block leading-none">
              Match
            </span>
            <span
              className={`text-sm font-black ${
                matchScore >= 80
                  ? "text-emerald-400"
                  : matchScore >= 60
                  ? "text-amber-400"
                  : "text-rose-400"
              }`}
            >
              {matchScore}%
            </span>
          </div>
        </div>

        {/* Price tag on image */}
        <div className="absolute bottom-3 left-3 z-10 bg-slate-950/90 backdrop-blur-md rounded-xl px-2.5 py-1 border border-slate-800 text-white">
          <span className="text-sm font-extrabold text-white">
            R$ {listing.pricePerNight}
          </span>
          <span className="text-[10px] text-slate-400 ml-1">/ noite</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Rating Header */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
            <div className="flex items-center space-x-1 truncate max-w-[65%]">
              <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span className="truncate">{listing.location}</span>
            </div>

            <div className="flex items-center space-x-1 font-semibold text-slate-200">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{listing.rating?.toFixed(2) || "4.9"}</span>
              <span className="text-[11px] text-slate-500">({listing.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h4 className="text-sm sm:text-base font-bold text-white line-clamp-2 leading-snug hover:text-rose-400 transition cursor-pointer">
            {listing.title}
          </h4>

          {/* Capacity icons */}
          <div className="mt-3 flex items-center space-x-3 text-xs text-slate-400 border-y border-slate-800/80 py-2">
            <span className="flex items-center space-x-1">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              <span>{listing.capacity?.guests || 6} hóspedes</span>
            </span>
            <span className="flex items-center space-x-1">
              <Bed className="w-3.5 h-3.5 text-slate-500" />
              <span>{listing.capacity?.bedrooms || 2} qtos</span>
            </span>
            <span className="flex items-center space-x-1">
              <Bath className="w-3.5 h-3.5 text-slate-500" />
              <span>{listing.capacity?.baths || 2} banh</span>
            </span>
          </div>

          {/* Fidelity Score & Stats */}
          <div className="mt-3 p-3 bg-slate-950/60 rounded-2xl border border-slate-800/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck
                  className={`w-4 h-4 ${
                    fidelity.color === "emerald"
                      ? "text-emerald-400"
                      : fidelity.color === "amber"
                      ? "text-amber-400"
                      : "text-rose-400"
                  }`}
                />
                <span className="text-xs font-bold text-slate-200">
                  Fidelidade Anúncio vs Reviews
                </span>
              </div>
              <span
                className={`text-xs font-black px-2 py-0.5 rounded-lg ${
                  fidelity.color === "emerald"
                    ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                    : fidelity.color === "amber"
                    ? "bg-amber-500/10 text-amber-300 border border-amber-500/30"
                    : "bg-rose-500/10 text-rose-300 border border-rose-500/30"
                }`}
              >
                {fidelity.score}%
              </span>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-1.5 text-[11px] text-slate-400">
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                <span>{fidelity.stats?.confirmedByGuests || 0} itens confirmados</span>
              </div>
              {fidelity.stats?.alerts > 0 ? (
                <div className="flex items-center space-x-1 text-rose-400 font-semibold">
                  <AlertTriangle className="w-3 h-3 text-rose-400" />
                  <span>{fidelity.stats?.alerts} alerta(s) de hóspedes</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1 text-emerald-400">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  <span>0 ressalvas graves</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <a
            href={listing.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-white flex items-center space-x-1 transition font-medium"
          >
            <span>Ver no Airbnb</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            onClick={() => onOpenVoting(listing.id)}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition flex items-center space-x-1.5"
          >
            <ThumbsUp className="w-3.5 h-3.5 text-indigo-400" />
            <span>Votar</span>
            {listing.votes?.likes > 0 && (
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-1 rounded">
                +{listing.votes.likes}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
