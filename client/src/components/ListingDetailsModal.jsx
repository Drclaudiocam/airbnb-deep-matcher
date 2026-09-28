import React, { useState, useEffect } from "react";
import {
  X,
  Star,
  MapPin,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Users,
  Bed,
  Bath,
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
  Flame,
  Search,
  Share2,
  Sparkles,
  Info,
  Globe
} from "lucide-react";

export function ListingDetailsModal({
  isOpen,
  onClose,
  listing,
  taxonomy = {},
  onInspectCriterion,
  onOpenVoting
}) {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  useEffect(() => {
    setActivePhotoIdx(0);
  }, [listing?.id]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !listing) return null;

  const images = listing.images && listing.images.length > 0
    ? listing.images
    : ["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"];

  const matchScore = listing.match?.matchScore || 85;
  const fidelity = listing.fidelity || { score: 85, badge: "Alta Fidelidade", color: "emerald" };
  const criteriaResults = listing.criteriaResults || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-slate-950/90 sticky top-0 z-30 backdrop-blur-md">
          <div className="flex items-center space-x-2.5 truncate max-w-[70%]">
            <span className="px-2.5 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold shrink-0">
              {listing.type || "Acomodação"}
            </span>
            <h3 className="text-sm sm:text-base font-extrabold text-white truncate">
              {listing.title}
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={listing.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-black rounded-xl transition shadow-md flex items-center space-x-1.5"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Abrir no Airbnb</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          {/* 1. Photo Gallery Carousel */}
          <div className="space-y-2">
            <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-slate-950 group">
              <img
                src={images[activePhotoIdx]}
                alt={listing.title}
                className="w-full h-full object-cover transition-all duration-300"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActivePhotoIdx((prev) => (prev - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActivePhotoIdx((prev) => (prev + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Badges on Image */}
              <div className="absolute top-3 left-3 flex items-center space-x-2">
                {listing.superhost && (
                  <span className="px-3 py-1 bg-amber-500 text-slate-950 font-black text-xs rounded-full shadow-lg">
                    ★ Superhost
                  </span>
                )}
                <span className="px-3 py-1 bg-slate-950/80 backdrop-blur-md text-white font-bold text-xs rounded-full border border-slate-700">
                  {activePhotoIdx + 1} / {images.length} fotos
                </span>
              </div>

              <div className="absolute bottom-3 right-3 bg-slate-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-slate-700 flex items-center space-x-2">
                <span className="text-xs text-slate-400">Match Perfil:</span>
                <span className="text-sm font-black text-emerald-400">{matchScore}%</span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
              <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhotoIdx(idx)}
                    className={`relative w-16 h-12 rounded-xl overflow-hidden shrink-0 border-2 transition ${
                      idx === activePhotoIdx ? "border-rose-500 scale-105" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. Key Information Bar */}
          <div className="p-4 sm:p-5 bg-slate-950/80 rounded-2xl border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Valor da Diária
              </span>
              <span className="text-lg sm:text-xl font-black text-white">
                R$ {listing.pricePerNight}
              </span>
              <span className="text-[10px] text-slate-500 block">
                + R$ {listing.cleaningFee || 150} limpeza
              </span>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Avaliação Geral
              </span>
              <div className="flex items-center justify-center space-x-1 mt-0.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-lg font-black text-white">
                  {listing.rating?.toFixed(2) || "4.95"}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 block">
                {listing.reviewCount || 30} avaliações
              </span>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Capacidade
              </span>
              <span className="text-base sm:text-lg font-black text-white">
                {listing.capacity?.guests || 6} hóspedes
              </span>
              <span className="text-[10px] text-slate-500 block">
                {listing.capacity?.bedrooms || 2} qtos • {listing.capacity?.beds || 3} camas • {listing.capacity?.baths || 2} banh
              </span>
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Fidelidade Anúncio
              </span>
              <span className="text-lg sm:text-xl font-black text-emerald-400">
                {fidelity.score}%
              </span>
              <span className="text-[10px] text-emerald-300 block">
                {fidelity.badge}
              </span>
            </div>
          </div>

          {/* 3. Location & Coordinates Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800 text-xs">
            <div className="flex items-center space-x-2 text-slate-300">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
              <span>
                <strong>{listing.neighborhood ? `${listing.neighborhood}, ` : ""}</strong>
                {listing.location} {listing.cep ? `• CEP ${listing.cep}` : ""}
              </span>
            </div>

            {listing.lat && listing.lng && (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${listing.lat},${listing.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-indigo-300 flex items-center space-x-1 font-semibold"
              >
                <span>Ver no Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          {/* 4. Deep Audited Amenities Matrix */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-rose-500" />
                <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
                  Auditoria de Comodidades nas Avaliações
                </h4>
              </div>
              <span className="text-[11px] text-slate-400">
                Cruzamento de promessas vs relatos reais de hóspedes
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { key: "pool_heated", label: "🏊 Piscina Aquecida", fallback: "Água aquecida confirmada por hóspedes" },
                { key: "kitchen_airfryer", label: "🍳 Fritadeira Airfryer", fallback: "Airfryer disponível na cozinha" },
                { key: "kitchen_coffee", label: "☕ Cafeteira Nespresso / Especial", fallback: "Cafeteira Nespresso/Dolce Gusto" },
                { key: "fast_wifi", label: "💻 Wi-Fi 400M+ para Home Office", fallback: "Conexão de alta velocidade testada" },
                { key: "ac_all_rooms", label: "❄️ Ar-condicionado nos Quartos", fallback: "Ar-condicionado split silencioso" },
                { key: "heating_fireplace", label: "🔥 Lareira / Hidromassagem", fallback: "Lareira e jacuzzi aquecida" },
                { key: "bbq_grill", label: "🥩 Espaço Gourmet & Churrasqueira", fallback: "Churrasqueira com utensílios" },
                { key: "kids_safety", label: "👶 Proteção / Telas para Crianças", fallback: "Redes e telas de proteção" },
                { key: "pet_friendly", label: "🐾 Pet Friendly", fallback: "Quintal cercado e seguro" }
              ].map((item) => {
                const res = criteriaResults[item.key];
                const status = res?.status || "NOT_MENTIONED";
                const isVerified = status === "VERIFIED_CONFIRMED";
                const isHostPromise = status === "HOST_PROMISE_ONLY";
                const isAlert = status === "ALERT_FLAG";

                return (
                  <div
                    key={item.key}
                    onClick={() => onInspectCriterion && onInspectCriterion(item.key, listing)}
                    className={`p-3 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                      isVerified
                        ? "bg-emerald-950/20 border-emerald-500/40 hover:border-emerald-500/80"
                        : isHostPromise
                        ? "bg-amber-950/20 border-amber-500/30 hover:border-amber-500/60"
                        : isAlert
                        ? "bg-rose-950/30 border-rose-500/50 hover:border-rose-500"
                        : "bg-slate-950/40 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{item.label}</span>
                      {isVerified && (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-black flex items-center gap-1 border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" /> Confirmado
                        </span>
                      )}
                      {isHostPromise && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-black flex items-center gap-1 border border-amber-500/30">
                          <HelpCircle className="w-3 h-3" /> Anúncio
                        </span>
                      )}
                      {isAlert && (
                        <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 text-[10px] font-black flex items-center gap-1 border border-rose-500/30">
                          <AlertTriangle className="w-3 h-3" /> Alerta Hóspede
                        </span>
                      )}
                      {!isVerified && !isHostPromise && !isAlert && (
                        <span className="text-[10px] text-slate-500">Não mencionado</span>
                      )}
                    </div>

                    {res?.guestQuotes && res.guestQuotes.length > 0 && (
                      <p className="mt-2 text-[11px] text-slate-300 italic line-clamp-2 bg-slate-950/60 p-2 rounded-xl border border-slate-800">
                        "{res.guestQuotes[0]}"
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. Host Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Descrição do Anfitrião:
            </h4>
            <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed">
              {listing.hostDescription || "Acomodação completa com excelente infraestrutura para estadia confortável."}
            </div>
          </div>

          {/* 6. Guest Reviews Feed */}
          {listing.guestReviews && listing.guestReviews.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <span>Relatos de Hóspedes Anteriores ({listing.guestReviews.length}):</span>
              </h4>
              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {listing.guestReviews.map((rev, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-950/60 rounded-2xl border border-slate-800/80 space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{rev.author || "Hóspede"}</span>
                      <div className="flex items-center space-x-1 text-amber-400 text-[11px]">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{rev.rating || 5}</span>
                        <span className="text-slate-500 ml-1">({rev.date || "2026"})</span>
                      </div>
                    </div>
                    <p className="text-slate-300 leading-relaxed italic">
                      "{rev.text}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/90 flex flex-wrap items-center justify-between gap-3 sticky bottom-0 z-30 backdrop-blur-md">
          <button
            onClick={() => onOpenVoting && onOpenVoting(listing.id)}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition flex items-center space-x-2"
          >
            <ThumbsUp className="w-4 h-4 text-indigo-400" />
            <span>Votar para a Viagem</span>
            {listing.votes?.likes > 0 && (
              <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px] font-bold">
                +{listing.votes.likes}
              </span>
            )}
          </button>

          <a
            href={listing.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 hover:from-rose-500 hover:to-rose-400 text-white text-xs sm:text-sm font-black rounded-2xl transition shadow-xl shadow-rose-600/30 flex items-center space-x-2 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Globe className="w-4 h-4" />
            <span>Ver Anúncio Oficial no Airbnb</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
