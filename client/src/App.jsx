import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar.jsx";
import { GeoSearchBar } from "./components/GeoSearchBar.jsx";
import { ProfileSelector } from "./components/ProfileSelector.jsx";
import { UrlInputBar } from "./components/UrlInputBar.jsx";
import { ListingCard } from "./components/ListingCard.jsx";
import { ComparisonMatrix } from "./components/ComparisonMatrix.jsx";
import { DeepCriterionInspector } from "./components/DeepCriterionInspector.jsx";
import { CompanionVoting } from "./components/CompanionVoting.jsx";
import { ExportShareModal } from "./components/ExportShareModal.jsx";
import { CustomKeywordSearch } from "./components/CustomKeywordSearch.jsx";
import { QuickHelpModal } from "./components/QuickHelpModal.jsx";
import { AirbnbAuthModal } from "./components/AirbnbAuthModal.jsx";
import { Sparkles, Trophy, ShieldCheck, Flame, Loader2, RefreshCw, Heart } from "lucide-react";

import { TAXONOMY as FALLBACK_TAXONOMY, DEFAULT_PROFILES as FALLBACK_PROFILES } from "../../server/src/services/taxonomy.js";

export function App() {
  const [taxonomy, setTaxonomy] = useState(FALLBACK_TAXONOMY);
  const [profiles, setProfiles] = useState(FALLBACK_PROFILES);
  const [activeProfileId, setActiveProfileId] = useState(FALLBACK_PROFILES[0].id);
  
  const [listings, setListings] = useState([]);
  const [categoryWinners, setCategoryWinners] = useState({});
  const [topPick, setTopPick] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Geographic Filters State
  const [geoFilters, setGeoFilters] = useState({
    environment: "all",
    state: "ALL",
    city: "ALL",
    query: ""
  });

  // Airbnb User Auth State
  const [currentUser, setCurrentUser] = useState(null);
  const [wishlists, setWishlists] = useState([]);

  // Modal States
  const [inspectModal, setInspectModal] = useState({ isOpen: false, criterionKey: null, listing: null });
  const [isVotingOpen, setIsVotingOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Fetch initial data on load
  useEffect(() => {
    fetchInitialData();
    checkCurrentUser();
  }, []);

  const checkCurrentUser = async () => {
    try {
      const res = await fetch("/api/auth/current-user");
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
      }
      const wlRes = await fetch("/api/wishlists");
      if (wlRes.ok) {
        const wlData = await wlRes.json();
        setWishlists(wlData.wishlists || []);
      }
    } catch (e) {
      console.warn("Auth check failed", e);
    }
  };

  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      const [taxRes, profRes] = await Promise.all([
        fetch("/api/taxonomy").then((r) => (r.ok ? r.json() : FALLBACK_TAXONOMY)).catch(() => FALLBACK_TAXONOMY),
        fetch("/api/profiles").then((r) => (r.ok ? r.json() : FALLBACK_PROFILES)).catch(() => FALLBACK_PROFILES)
      ]);

      setTaxonomy(taxRes);
      setProfiles(profRes);

      // Load initial listings with geo search
      executeGeoSearch(geoFilters, FALLBACK_PROFILES[0].id);
    } catch (err) {
      console.warn("Initial API load error", err);
    } finally {
      setIsLoading(false);
    }
  };

  const executeGeoSearch = async (filters, profileId = activeProfileId) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        environment: filters.environment || "all",
        state: filters.state || "ALL",
        city: filters.city || "ALL",
        query: filters.query || "",
        profileId: profileId
      });

      const res = await fetch(`/api/search-geo?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setListings(data.listings || []);
        setCategoryWinners(data.categoryWinners || {});
        setTopPick(data.topPick || null);
      }
    } catch (err) {
      console.error("Geo search failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchGeo = (filters) => {
    setGeoFilters(filters);
    executeGeoSearch(filters, activeProfileId);
  };

  const handleSelectProfile = (profileId) => {
    setActiveProfileId(profileId);
    executeGeoSearch(geoFilters, profileId);
  };

  const handleCreateProfile = async (newProfileData) => {
    try {
      const res = await fetch("/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProfileData)
      });

      if (res.ok) {
        const data = await res.json();
        setProfiles(data.allProfiles || [...profiles, data.profile]);
        handleSelectProfile(data.profile.id);
      }
    } catch (err) {
      console.error("Failed to save custom profile", err);
    }
  };

  const handleAnalyzeUrls = async (urls) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/analyze-urls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls, profileId: activeProfileId })
      });

      if (res.ok) {
        const data = await res.json();
        setListings(data.listings || []);
        setCategoryWinners(data.categoryWinners || {});
        setTopPick(data.topPick || null);
      } else {
        const errData = await res.json();
        alert(errData.error || "Erro ao analisar os links fornecidos.");
      }
    } catch (err) {
      alert("Erro de conexão ao processar os links do Airbnb: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Airbnb Auth Handlers
  const handleAirbnbLogin = async (email, name) => {
    try {
      const res = await fetch("/api/auth/airbnb-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name })
      });

      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
        const wlRes = await fetch("/api/wishlists");
        if (wlRes.ok) {
          const wlData = await wlRes.json();
          setWishlists(wlData.wishlists || []);
        }
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const handleAirbnbLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setCurrentUser(null);
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleImportWishlist = async (wishlistUrlOrId) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/wishlists/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wishlistUrlOrId, profileId: activeProfileId })
      });

      if (res.ok) {
        const data = await res.json();
        setListings(data.listings || []);
        setCategoryWinners(data.categoryWinners || {});
        setTopPick(data.topPick || null);
      }
    } catch (err) {
      console.error("Wishlist import failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Cast vote for trip companions
  const handleCastVote = async (voteData) => {
    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(voteData)
      });

      if (res.ok) {
        const data = await res.json();
        setListings((prev) =>
          prev.map((l) => (l.id === voteData.listingId ? { ...l, votes: data.votes } : l))
        );
      }
    } catch (err) {
      console.error("Vote failed", err);
    }
  };

  const handleInspectCriterion = (key, listing) => {
    setInspectModal({
      isOpen: true,
      criterionKey: key,
      listing
    });
  };

  const totalVotesCount = listings.reduce(
    (acc, l) => acc + (l.votes?.likes || 0) + (l.votes?.dislikes || 0),
    0
  );

  const activeProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-rose-500 selection:text-white pb-20">
      {/* Top Navbar */}
      <Navbar
        onOpenVoting={() => setIsVotingOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        currentUser={currentUser}
        activeListingCount={listings.length}
        totalVotesCount={totalVotesCount}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8 flex-1 w-full">
        {/* Hero Banner with Status & Tagline */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-indigo-950/30 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span>Varredura profunda por Praia, Campo e Cidades no Airbnb</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Encontre sua estadia ideal com{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-rose-500">
                auditoria real de descrições e avaliações
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Filtre por praia ou serra, cruze promessas do anfitrião com relatos reais de hóspedes e encontre piscina aquecida garantida, airfryer e Wi-Fi estável.
            </p>
          </div>
        </section>

        {/* 1. Geographic & Environment Search Bar */}
        <section>
          <GeoSearchBar
            onSearchGeo={handleSearchGeo}
            currentFilters={geoFilters}
          />
        </section>

        {/* 2. Profile Selector Section */}
        <section>
          <ProfileSelector
            profiles={profiles}
            activeProfileId={activeProfileId}
            onSelectProfile={handleSelectProfile}
            onCreateProfile={handleCreateProfile}
            allTaxonomy={taxonomy}
          />
        </section>

        {/* 3. URL Ingestion & 1-Click Test Drive Section */}
        <section>
          <UrlInputBar
            onAnalyzeUrls={handleAnalyzeUrls}
            onLoadBenchmarks={() => executeGeoSearch(geoFilters, activeProfileId)}
            isLoading={isLoading}
            currentListingsCount={listings.length}
          />
        </section>

        {/* 4. Ad-hoc Dynamic Keyword Search */}
        <section>
          <CustomKeywordSearch listings={listings} />
        </section>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="p-12 flex flex-col items-center justify-center space-y-3 bg-slate-900/60 rounded-3xl border border-slate-800">
            <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
            <span className="text-sm font-bold text-slate-300">
              Auditando descrições, comodidades e centenas de avaliações...
            </span>
          </div>
        )}

        {/* Listings Cards Grid */}
        {!isLoading && listings.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <span>Acomodações Encontradas ({listings.length})</span>
                  <span className="text-xs font-semibold text-slate-400">
                    (Classificadas por Match com o perfil {activeProfile?.name})
                  </span>
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing, idx) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  isTopPick={idx === 0}
                  onInspectCriterion={handleInspectCriterion}
                  onOpenVoting={(id) => setIsVotingOpen(true)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Detailed Side-by-Side Comparison Matrix */}
        {!isLoading && listings.length > 0 && (
          <section className="pt-4">
            <ComparisonMatrix
              listings={listings}
              taxonomy={taxonomy}
              activeProfile={activeProfile}
              categoryWinners={categoryWinners}
              onInspectCriterion={handleInspectCriterion}
            />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            Airbnb Deep Matcher © 2026 • Ferramenta analítica independente para comparação avançada de acomodações.
          </p>
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsHelpOpen(true)} className="hover:text-slate-300">
              Metodologia de Auditoria
            </button>
            <button onClick={() => setIsExportOpen(true)} className="hover:text-slate-300">
              Exportar Dados
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AirbnbAuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onLogin={handleAirbnbLogin}
        onLogout={handleAirbnbLogout}
        onImportWishlist={handleImportWishlist}
        wishlists={wishlists}
      />

      <DeepCriterionInspector
        isOpen={inspectModal.isOpen}
        onClose={() => setInspectModal({ isOpen: false, criterionKey: null, listing: null })}
        criterionKey={inspectModal.criterionKey}
        listing={inspectModal.listing}
        taxonomyItem={taxonomy[inspectModal.criterionKey]}
      />

      <CompanionVoting
        isOpen={isVotingOpen}
        onClose={() => setIsVotingOpen(false)}
        listings={listings}
        onCastVote={handleCastVote}
      />

      <ExportShareModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        listings={listings}
        activeProfile={activeProfile}
      />

      <QuickHelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
}

export default App;
