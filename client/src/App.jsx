import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar.jsx";
import { CepSearchBar } from "./components/CepSearchBar.jsx";
import { InteractiveMap } from "./components/InteractiveMap.jsx";
import { SpecificationFilterPanel } from "./components/SpecificationFilterPanel.jsx";
import { GeoSearchBar } from "./components/GeoSearchBar.jsx";
import { LocationInsightsBanner } from "./components/LocationInsightsBanner.jsx";
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
import { ListingDetailsModal } from "./components/ListingDetailsModal.jsx";
import {
  Sparkles,
  Trophy,
  ShieldCheck,
  Flame,
  Loader2,
  RefreshCw,
  Heart,
  MapPin,
  Map as MapIcon,
  LayoutGrid,
  Columns,
  Filter,
  SlidersHorizontal,
  Info
} from "lucide-react";

import { TAXONOMY as FALLBACK_TAXONOMY, DEFAULT_PROFILES as FALLBACK_PROFILES } from "../../server/src/services/taxonomy.js";

export function App() {
  const [taxonomy, setTaxonomy] = useState(FALLBACK_TAXONOMY);
  const [profiles, setProfiles] = useState(FALLBACK_PROFILES);
  const [activeProfileId, setActiveProfileId] = useState(FALLBACK_PROFILES[0].id);
  
  const [listings, setListings] = useState([]);
  const [categoryWinners, setCategoryWinners] = useState({});
  const [topPick, setTopPick] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Resolved Location from CEP / Geocoding
  const [resolvedLocation, setResolvedLocation] = useState(null);

  // Geographic Filters State
  const [geoFilters, setGeoFilters] = useState({
    environment: "all",
    state: "SP",
    city: "Serra Negra",
    query: ""
  });

  // Post-Search Specification Filters
  const [specificationFilters, setSpecificationFilters] = useState({
    amenities: [],
    neighborhoods: [],
    maxPrice: 2000,
    minFidelity: 50,
    superhostOnly: false
  });

  // View Mode: "split" (List + Sticky Map) | "grid" (Full Grid) | "map" (Full Map)
  const [viewMode, setViewMode] = useState("split");

  // Airbnb User Auth State
  const [currentUser, setCurrentUser] = useState(null);
  const [wishlists, setWishlists] = useState([]);

  // Modal States
  const [selectedListingDetails, setSelectedListingDetails] = useState(null);
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

      // Load initial listings with Serra Negra as default
      executeGeoSearch({ city: "Serra Negra", state: "SP", query: "Serra Negra" }, FALLBACK_PROFILES[0].id);
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
        neighborhood: filters.neighborhood || "ALL",
        query: filters.query || "",
        cep: filters.cep || "",
        profileId: profileId
      });

      const res = await fetch(`/api/search-geo?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setListings(data.listings || []);
        setCategoryWinners(data.categoryWinners || {});
        setTopPick(data.topPick || null);
        if (data.resolvedLocation) {
          setResolvedLocation(data.resolvedLocation);
        }
      }
    } catch (err) {
      console.error("Geo search failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Triggered by CepSearchBar
  const handleSearchLocation = (searchParams) => {
    const nextFilters = {
      ...geoFilters,
      ...searchParams
    };
    setGeoFilters(nextFilters);
    executeGeoSearch(nextFilters, activeProfileId);
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

  const handleResetSpecFilters = () => {
    setSpecificationFilters({
      amenities: [],
      neighborhoods: [],
      maxPrice: 2000,
      minFidelity: 50,
      superhostOnly: false
    });
  };

  // Compute filtered listings dynamically based on post-search specifications
  const filteredListings = listings.filter((l) => {
    // 1. Amenity verification check
    if (specificationFilters.amenities && specificationFilters.amenities.length > 0) {
      for (const amenKey of specificationFilters.amenities) {
        const res = l.criteriaResults?.[amenKey];
        const isValid = res && (res.status === "VERIFIED_CONFIRMED" || res.status === "HOST_PROMISE_ONLY" || res.status === "GUEST_DISCOVERED");
        if (!isValid) return false;
      }
    }

    // 2. Neighborhood check
    if (specificationFilters.neighborhoods && specificationFilters.neighborhoods.length > 0) {
      const lNeigh = l.neighborhood || l.location?.split(",")[0]?.trim();
      if (!specificationFilters.neighborhoods.includes(lNeigh)) {
        return false;
      }
    }

    // 3. Max price check
    if (specificationFilters.maxPrice && l.pricePerNight > specificationFilters.maxPrice) {
      return false;
    }

    // 4. Fidelity score check
    const fidelityScore = l.fidelity?.score ?? (l.match?.fidelityScore || 80);
    if (specificationFilters.minFidelity && fidelityScore < specificationFilters.minFidelity) {
      return false;
    }

    // 5. Superhost check
    if (specificationFilters.superhostOnly && !l.superhost) {
      return false;
    }

    return true;
  });

  const totalVotesCount = listings.reduce(
    (acc, l) => acc + (l.votes?.likes || 0) + (l.votes?.dislikes || 0),
    0
  );

  const activeProfile = profiles.find((p) => p.id === activeProfileId) || profiles[0];
  const activeLocation = resolvedLocation?.city || geoFilters.city || geoFilters.query || "Brasil";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-rose-500 selection:text-white pb-20">
      {/* Top Navbar */}
      <Navbar
        onOpenVoting={() => setIsVotingOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        currentUser={currentUser}
        activeListingCount={filteredListings.length}
        totalVotesCount={totalVotesCount}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-7 flex-1 w-full">
        {/* Hero Banner with Status & Tagline */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-indigo-950/30 border border-slate-800 p-6 sm:p-7 backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-2.5">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              <span>Busca por CEP & Bairros com Mapa Interativo e Filtros Auditados</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Encontre sua estadia ideal com{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-rose-500">
                auditoria real e mapa georreferenciado
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Consulte qualquer CEP ou bairro do Brasil via API gratuita, veja os imóveis no mapa e filtre por piscina aquecida comprovada, airfryer, lareira e Wi-Fi de alta velocidade.
            </p>
          </div>
        </section>

        {/* 1. Intelligent CEP & Neighborhood Search Bar */}
        <section>
          <CepSearchBar
            onSearchLocation={handleSearchLocation}
            resolvedLocation={resolvedLocation}
            isLoading={isLoading}
          />
        </section>

        {/* 2. Dynamic Location Insights & Recommendations */}
        <section>
          <LocationInsightsBanner
            currentLocation={activeLocation}
            currentEnvironment={geoFilters.environment}
            onSelectQuickKeyword={(kw) => {
              const el = document.getElementById("custom-keyword-input");
              if (el) {
                el.value = kw;
                el.focus();
              }
            }}
          />
        </section>

        {/* 3. Deep Matcher Profile Selector */}
        <section>
          <ProfileSelector
            profiles={profiles}
            activeProfileId={activeProfileId}
            onSelectProfile={handleSelectProfile}
            onCreateProfile={handleCreateProfile}
            allTaxonomy={taxonomy}
          />
        </section>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="p-12 flex flex-col items-center justify-center space-y-3 bg-slate-900/60 rounded-3xl border border-slate-800">
            <Loader2 className="w-8 h-8 text-rose-500 animate-spin" />
            <span className="text-sm font-bold text-slate-300">
              Consultando CEP/Região e auditando comodidades nas reviews dos hóspedes...
            </span>
          </div>
        )}

        {/* 4. Results Section: Filters + Listings + Interactive Map */}
        {!isLoading && listings.length > 0 && (
          <section className="space-y-4">
            {/* Discovery Control Bar (Counter + View Switcher) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/70 border border-slate-800/80 p-4 rounded-2xl backdrop-blur-md">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-rose-500" />
                <h2 className="text-base sm:text-lg font-bold text-white">
                  <span>{filteredListings.length} acomodações</span>
                  <span className="text-xs font-normal text-slate-400 ml-2">
                    (de {listings.length} encontradas em {activeLocation})
                  </span>
                </h2>
              </div>

              {/* View Switcher Buttons */}
              <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setViewMode("split")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                    viewMode === "split"
                      ? "bg-rose-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Columns className="w-3.5 h-3.5" />
                  <span>Lista & Mapa</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                    viewMode === "grid"
                      ? "bg-rose-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Grade</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("map")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
                    viewMode === "map"
                      ? "bg-rose-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <MapIcon className="w-3.5 h-3.5" />
                  <span>Mapa Cheio</span>
                </button>
              </div>
            </div>

            {/* Main Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Specification Filters (Always accessible) */}
              <div className="lg:col-span-4 xl:col-span-3">
                <SpecificationFilterPanel
                  listings={listings}
                  activeFilters={specificationFilters}
                  onUpdateFilters={setSpecificationFilters}
                  onResetFilters={handleResetSpecFilters}
                />
              </div>

              {/* Right/Middle Area: Cards and/or Map according to viewMode */}
              {viewMode === "split" && (
                <>
                  {/* Listing Cards (Middle) */}
                  <div className="lg:col-span-4 xl:col-span-4 space-y-4">
                    {filteredListings.length === 0 ? (
                      <div className="p-8 text-center bg-slate-900/60 rounded-3xl border border-slate-800 space-y-3">
                        <Info className="w-8 h-8 text-amber-400 mx-auto" />
                        <h4 className="text-sm font-bold text-white">
                          Nenhuma acomodação atende a todos os filtros selecionados
                        </h4>
                        <p className="text-xs text-slate-400">
                          Tente desmarcar comodidades ou aumentar o valor máximo para ver mais opções.
                        </p>
                        <button
                          onClick={handleResetSpecFilters}
                          className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl transition"
                        >
                          Limpar Filtros de Especificações
                        </button>
                      </div>
                    ) : (
                      filteredListings.map((listing, idx) => (
                        <ListingCard
                          key={listing.id}
                          listing={listing}
                          isTopPick={idx === 0}
                          onSelectListing={setSelectedListingDetails}
                          onInspectCriterion={handleInspectCriterion}
                          onOpenVoting={() => setIsVotingOpen(true)}
                        />
                      ))
                    )}
                  </div>

                  {/* Sticky Leaflet Map (Right) */}
                  <div className="lg:col-span-4 xl:col-span-5 sticky top-20 h-[680px]">
                    <InteractiveMap
                      listings={filteredListings}
                      centerLocation={resolvedLocation}
                      onSelectListing={setSelectedListingDetails}
                      onInspectListing={handleInspectCriterion}
                    />
                  </div>
                </>
              )}

              {viewMode === "grid" && (
                <div className="lg:col-span-8 xl:col-span-9">
                  {filteredListings.length === 0 ? (
                    <div className="p-12 text-center bg-slate-900/60 rounded-3xl border border-slate-800 space-y-3">
                      <Info className="w-8 h-8 text-amber-400 mx-auto" />
                      <h4 className="text-sm font-bold text-white">
                        Nenhuma acomodação atende a todos os filtros selecionados
                      </h4>
                      <button
                        onClick={handleResetSpecFilters}
                        className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl transition"
                      >
                        Limpar Filtros
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredListings.map((listing, idx) => (
                        <ListingCard
                          key={listing.id}
                          listing={listing}
                          isTopPick={idx === 0}
                          onSelectListing={setSelectedListingDetails}
                          onInspectCriterion={handleInspectCriterion}
                          onOpenVoting={() => setIsVotingOpen(true)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {viewMode === "map" && (
                <div className="lg:col-span-8 xl:col-span-9 h-[680px]">
                  <InteractiveMap
                    listings={filteredListings}
                    centerLocation={resolvedLocation}
                    onSelectListing={setSelectedListingDetails}
                    onInspectListing={handleInspectCriterion}
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {/* 5. Detailed Side-by-Side Comparison Matrix */}
        {!isLoading && filteredListings.length > 0 && (
          <section className="pt-4">
            <ComparisonMatrix
              listings={filteredListings}
              taxonomy={taxonomy}
              activeProfile={activeProfile}
              categoryWinners={categoryWinners}
              onInspectCriterion={handleInspectCriterion}
            />
          </section>
        )}

        {/* 6. Dynamic Keyword In-depth Search */}
        <section id="custom-keyword-section">
          <CustomKeywordSearch listings={filteredListings.length > 0 ? filteredListings : listings} />
        </section>

        {/* 7. URL Ingestion & 1-Click Test Drive Section */}
        <section>
          <UrlInputBar
            onAnalyzeUrls={handleAnalyzeUrls}
            onLoadBenchmarks={() => executeGeoSearch(geoFilters, activeProfileId)}
            isLoading={isLoading}
            currentListingsCount={listings.length}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-slate-900 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            Airbnb Deep Matcher © 2026 • Ferramenta analítica independente para comparação avançada de acomodações com geolocalização e auditoria de comodidades.
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
      <ListingDetailsModal
        isOpen={Boolean(selectedListingDetails)}
        onClose={() => setSelectedListingDetails(null)}
        listing={selectedListingDetails}
        taxonomy={taxonomy}
        onInspectCriterion={handleInspectCriterion}
        onOpenVoting={(id) => setIsVotingOpen(true)}
      />

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
        listings={filteredListings}
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
