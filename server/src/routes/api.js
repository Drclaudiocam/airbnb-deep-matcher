import express from "express";
import { TAXONOMY, DEFAULT_PROFILES } from "../services/taxonomy.js";
import { BENCHMARK_LISTINGS } from "../data/benchmarkListings.js";
import { ScraperService } from "../services/scraperService.js";
import { AnalysisEngine } from "../services/analysisEngine.js";
import { AuthService } from "../services/authService.js";
import { CepService } from "../services/cepService.js";

const router = express.Router();

let userProfiles = [...DEFAULT_PROFILES];
const groupVotes = {};

function normalizeText(str) {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Health check
 */
router.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

/**
 * Get all taxonomy criteria
 */
router.get("/taxonomy", (req, res) => {
  res.json(TAXONOMY);
});

/**
 * Get all search profiles
 */
router.get("/profiles", (req, res) => {
  res.json(userProfiles);
});

/**
 * Create a new custom search profile
 */
router.post("/profiles", (req, res) => {
  const { name, description, criteria } = req.body;
  if (!name || !criteria || !Array.isArray(criteria)) {
    return res.status(400).json({ error: "Nome e lista de critérios são obrigatórios." });
  }

  const newProfile = {
    id: `custom_profile_${Date.now()}`,
    name,
    description: description || "Perfil personalizado criado pelo usuário",
    criteria: criteria.map((c) => ({
      id: c.id,
      weight: Number(c.weight) || 2,
      required: Boolean(c.required)
    }))
  };

  userProfiles.push(newProfile);
  res.json({ message: "Perfil criado com sucesso", profile: newProfile, allProfiles: userProfiles });
});

/**
 * CEP Lookup Endpoint (BrasilAPI + ViaCEP + Nominatim)
 */
router.get("/cep/lookup", async (req, res) => {
  try {
    const { cep } = req.query;
    if (!cep) {
      return res.status(400).json({ error: "Parâmetro 'cep' é obrigatório." });
    }

    const cepData = await CepService.lookupCep(cep);
    res.json(cepData);
  } catch (err) {
    res.status(400).json({ error: err.message || "Erro ao consultar o CEP." });
  }
});

/**
 * Address / Neighborhood Search Endpoint
 */
router.get("/cep/search-address", async (req, res) => {
  try {
    const { q, city, state } = req.query;
    if (!q) {
      return res.status(400).json({ error: "Parâmetro 'q' (rua/bairro) é obrigatório." });
    }

    const addresses = await CepService.searchAddress(q, city, state);
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar logradouros: " + err.message });
  }
});

/**
 * Geographic Search by CEP, Neighborhood, City, State and Filters
 */
router.get("/search-geo", async (req, res) => {
  try {
    const { cep, state, city, neighborhood, environment, query, profileId } = req.query;
    const activeProfile = userProfiles.find((p) => p.id === profileId) || DEFAULT_PROFILES[0];

    let resolvedLocation = null;

    // 1. If CEP is passed, lookup details and coordinates
    if (cep) {
      try {
        resolvedLocation = await CepService.lookupCep(cep);
      } catch (e) {
        console.warn("[API] CEP lookup failed in geo search:", e.message);
      }
    }

    const targetCity = resolvedLocation?.city || city;
    const targetState = resolvedLocation?.state || state;
    const targetNeighborhood = resolvedLocation?.neighborhood || neighborhood;

    const normQuery = normalizeText(query);
    const normCity = normalizeText(targetCity);
    const normState = normalizeText(targetState);
    const normNeighborhood = normalizeText(targetNeighborhood);

    let filtered = [...BENCHMARK_LISTINGS];

    // Filter by environment if specified and not 'all'
    if (environment && environment !== "all") {
      filtered = filtered.filter((l) => l.environment === environment);
    }

    // Filter by state if specified and not 'ALL'
    if (normState && normState !== "all") {
      filtered = filtered.filter((l) => normalizeText(l.state) === normState);
    }

    // Filter by city or neighborhood
    if (normCity && normCity !== "all") {
      filtered = filtered.filter((l) => {
        const lCity = normalizeText(l.city);
        const lLoc = normalizeText(l.location);
        return lCity.includes(normCity) || normCity.includes(lCity) || lLoc.includes(normCity);
      });
    }

    if (normNeighborhood && normNeighborhood !== "all") {
      const matchNeigh = filtered.filter((l) => {
        const lNeigh = normalizeText(l.neighborhood);
        const lLoc = normalizeText(l.location);
        return lNeigh.includes(normNeighborhood) || lLoc.includes(normNeighborhood);
      });
      if (matchNeigh.length > 0) {
        filtered = matchNeigh;
      }
    }

    // Dynamic synthesis if 0 matches for the searched location
    if (filtered.length === 0 && (normCity || normQuery || resolvedLocation)) {
      const cityName = resolvedLocation?.city || (city && city !== "ALL" ? city : query) || "Brasil";
      const stateName = resolvedLocation?.state || (state && state !== "ALL" ? state : "SP");
      const neighName = resolvedLocation?.neighborhood || "Centro";
      const baseLat = resolvedLocation?.lat || -22.6125;
      const baseLng = resolvedLocation?.lng || -46.7022;

      filtered = [
        {
          id: `dynamic_${normalizeText(cityName)}_villa`,
          url: `https://www.airbnb.com.br/rooms/${Math.floor(10000000 + Math.random() * 90000000)}`,
          title: `Villa Refúgio em ${cityName} (${neighName}) - Piscina Aquecida & Gourmet`,
          location: `${neighName}, ${cityName} - ${stateName}`,
          state: stateName,
          city: cityName,
          neighborhood: neighName,
          cep: resolvedLocation?.formattedCep || "13930-000",
          lat: baseLat + 0.003,
          lng: baseLng - 0.002,
          environment: /praia|mar|litoral/i.test(cityName) ? "beach" : "mountain",
          type: "Casa inteira",
          superhost: true,
          rating: 4.96,
          reviewCount: 48,
          pricePerNight: 850,
          cleaningFee: 180,
          capacity: { guests: 8, bedrooms: 3, beds: 5, baths: 3 },
          images: [
            "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
          ],
          officialAmenities: [
            "Piscina privativa",
            "Piscina aquecida",
            "Ar-condicionado",
            "Cozinha completa",
            "Wi-Fi",
            "Churrasqueira"
          ],
          hostDescription: `
            Casa espetacular em ${cityName} (${neighName})!
            - Piscina aquecida privativa com bomba de calor elétrica (mantém a água a 30°C mesmo em dias frios).
            - Cozinha completa com Airfryer Mondial 5L, Cafeteira Nespresso, micro-ondas e lava-louças.
            - 3 suítes amplas climatizadas com ar split potente e cortinas blackout.
            - Wi-Fi Fibra de 400 Mbps e quintal cercado para pets.
          `,
          guestReviews: [
            {
              id: "rev_dyn_1",
              author: "Mariana Silva",
              date: "Fevereiro de 2026",
              rating: 5,
              text: `A piscina aquecida em ${cityName} foi o ponto alto da viagem, meus filhos ficaram nela até à noite pois a água estava bem quentinha! A cozinha com airfryer ajudou demais.`
            }
          ]
        },
        {
          id: `dynamic_${normalizeText(cityName)}_chale`,
          url: `https://www.airbnb.com.br/rooms/${Math.floor(10000000 + Math.random() * 90000000)}`,
          title: `Chalé Suíço em ${cityName} - Hidromassagem Aquecida & Lareira`,
          location: `Alto da Serra, ${cityName} - ${stateName}`,
          state: stateName,
          city: cityName,
          neighborhood: "Alto da Serra",
          cep: resolvedLocation?.formattedCep || "13930-000",
          lat: baseLat - 0.004,
          lng: baseLng + 0.003,
          environment: /praia|mar|litoral/i.test(cityName) ? "beach" : "mountain",
          type: "Chalé inteiro",
          superhost: true,
          rating: 4.93,
          reviewCount: 38,
          pricePerNight: 780,
          cleaningFee: 150,
          capacity: { guests: 4, bedrooms: 2, beds: 3, baths: 2 },
          images: [
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80"
          ],
          officialAmenities: [
            "Banheira de hidromassagem",
            "Lareira",
            "Wi-Fi",
            "Cozinha completa"
          ],
          hostDescription: `
            Chalé aconchegante em ${cityName}.
            - Hidromassagem aquecida a gás.
            - Lareira interna a lenha com cesto cortesia.
            - Cozinha com Airfryer, cafeteira Dolce Gusto e fogão.
            - Wi-Fi de alta velocidade.
          `,
          guestReviews: [
            {
              id: "rev_dyn_2",
              author: "Lucas Prado",
              date: "Janeiro de 2026",
              rating: 5,
              text: `A hidro aquecida em ${cityName} é maravilhosa, água bem quente e relaxante.`
            }
          ]
        }
      ];
    }

    const comparison = AnalysisEngine.compareListings(filtered, activeProfile);
    const listingsWithVotes = comparison.listings.map((l) => ({
      ...l,
      votes: groupVotes[l.id] || { likes: 0, dislikes: 0, voters: [] }
    }));

    res.json({
      ...comparison,
      listings: listingsWithVotes,
      resolvedLocation: resolvedLocation || {
        city: targetCity,
        state: targetState,
        neighborhood: targetNeighborhood,
        lat: filtered[0]?.lat || -22.6125,
        lng: filtered[0]?.lng || -46.7022
      }
    });
  } catch (err) {
    console.error("[API] Error in search-geo:", err);
    res.status(500).json({ error: "Erro na busca geográfica: " + err.message });
  }
});

/**
 * Get benchmark listings with chosen profile
 */
router.get("/benchmarks", (req, res) => {
  const profileId = req.query.profileId || DEFAULT_PROFILES[0].id;
  const activeProfile = userProfiles.find((p) => p.id === profileId) || DEFAULT_PROFILES[0];

  const comparison = AnalysisEngine.compareListings(BENCHMARK_LISTINGS, activeProfile);
  const listingsWithVotes = comparison.listings.map((l) => ({
    ...l,
    votes: groupVotes[l.id] || { likes: 0, dislikes: 0, voters: [] }
  }));

  res.json({
    ...comparison,
    listings: listingsWithVotes
  });
});

/**
 * Analyze custom Airbnb URLs or IDs
 */
router.post("/analyze-urls", async (req, res) => {
  try {
    const { urls, profileId } = req.body;
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({ error: "Forneça pelo menos uma URL ou ID do Airbnb." });
    }

    const activeProfile = userProfiles.find((p) => p.id === profileId) || DEFAULT_PROFILES[0];
    const rawListings = await ScraperService.fetchMultipleListings(urls);
    const comparison = AnalysisEngine.compareListings(rawListings, activeProfile);

    const listingsWithVotes = comparison.listings.map((l) => ({
      ...l,
      votes: groupVotes[l.id] || { likes: 0, dislikes: 0, voters: [] }
    }));

    res.json({
      ...comparison,
      listings: listingsWithVotes
    });
  } catch (error) {
    console.error("[API] Error analyzing URLs:", error);
    res.status(500).json({ error: "Erro ao analisar os anúncios fornecidos: " + error.message });
  }
});

/**
 * Airbnb Auth Routes
 */
router.get("/auth/current-user", (req, res) => {
  const user = AuthService.getCurrentUser();
  res.json({ user, isAuthenticated: !!user });
});

router.post("/auth/airbnb-login", (req, res) => {
  const { email, name } = req.body;
  const user = AuthService.login(email, name);
  res.json({ message: "Conexão com Airbnb realizada com sucesso!", user });
});

router.post("/auth/logout", (req, res) => {
  AuthService.logout();
  res.json({ message: "Desconectado do Airbnb com sucesso." });
});

router.get("/wishlists", (req, res) => {
  const wishlists = AuthService.getWishlists();
  res.json({ wishlists });
});

router.post("/wishlists/import", (req, res) => {
  const { wishlistUrlOrId, profileId } = req.body;
  if (!wishlistUrlOrId) {
    return res.status(400).json({ error: "Informe o link ou ID da Wishlist." });
  }

  const result = AuthService.importWishlist(wishlistUrlOrId);
  const activeProfile = userProfiles.find((p) => p.id === profileId) || DEFAULT_PROFILES[0];
  const comparison = AnalysisEngine.compareListings(result.listings, activeProfile);

  const listingsWithVotes = comparison.listings.map((l) => ({
    ...l,
    votes: groupVotes[l.id] || { likes: 0, dislikes: 0, voters: [] }
  }));

  res.json({
    message: `Wishlist "${result.wishlistTitle}" importada com sucesso!`,
    wishlistTitle: result.wishlistTitle,
    ...comparison,
    listings: listingsWithVotes
  });
});

/**
 * Dynamic keyword ad-hoc search across listings
 */
router.post("/search-custom-keyword", (req, res) => {
  const { keyword, listings } = req.body;
  if (!keyword || !listings || !Array.isArray(listings)) {
    return res.status(400).json({ error: "Keyword e lista de anúncios são obrigatórios." });
  }

  const cleanKeyword = keyword.trim();
  const regex = new RegExp(cleanKeyword, "i");

  const results = listings.map((l) => {
    const hostText = `${l.title || ""} ${l.hostDescription || ""}`;
    const inHost = regex.test(hostText);
    const hostSnippet = inHost ? AnalysisEngine.extractSnippet(hostText, regex) : null;
    const inOfficial = (l.officialAmenities || []).some((a) => regex.test(a));

    const guestMatches = (l.guestReviews || [])
      .filter((r) => regex.test(r.text))
      .map((r) => ({
        author: r.author,
        date: r.date,
        rating: r.rating,
        snippet: AnalysisEngine.extractSnippet(r.text, regex),
        fullText: r.text
      }));

    return {
      listingId: l.id,
      title: l.title,
      keyword: cleanKeyword,
      found: inHost || inOfficial || guestMatches.length > 0,
      inOfficial,
      inHost,
      hostSnippet,
      guestMatchesCount: guestMatches.length,
      guestMatches
    };
  });

  res.json({ keyword: cleanKeyword, results });
});

/**
 * Register a vote for a trip companion
 */
router.post("/vote", (req, res) => {
  const { listingId, voterName, voteType, comment } = req.body;
  if (!listingId || !voterName) {
    return res.status(400).json({ error: "listingId e voterName são obrigatórios." });
  }

  if (!groupVotes[listingId]) {
    groupVotes[listingId] = { likes: 0, dislikes: 0, voters: [] };
  }

  const existingIndex = groupVotes[listingId].voters.findIndex((v) => v.name.toLowerCase() === voterName.toLowerCase());
  const voteValue = voteType === "like" ? "like" : "dislike";

  if (existingIndex >= 0) {
    groupVotes[listingId].voters[existingIndex] = {
      name: voterName,
      type: voteValue,
      comment: comment || "",
      timestamp: new Date().toLocaleTimeString("pt-BR")
    };
  } else {
    groupVotes[listingId].voters.push({
      name: voterName,
      type: voteValue,
      comment: comment || "",
      timestamp: new Date().toLocaleTimeString("pt-BR")
    });
  }

  groupVotes[listingId].likes = groupVotes[listingId].voters.filter((v) => v.type === "like").length;
  groupVotes[listingId].dislikes = groupVotes[listingId].voters.filter((v) => v.type === "dislike").length;

  res.json({ message: "Voto registrado", votes: groupVotes[listingId], allVotes: groupVotes });
});

export default router;
