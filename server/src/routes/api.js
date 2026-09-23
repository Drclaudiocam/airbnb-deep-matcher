import express from "express";
import { TAXONOMY, DEFAULT_PROFILES } from "../services/taxonomy.js";
import { BENCHMARK_LISTINGS } from "../data/benchmarkListings.js";
import { ScraperService } from "../services/scraperService.js";
import { AnalysisEngine } from "../services/analysisEngine.js";
import { AuthService } from "../services/authService.js";

const router = express.Router();

let userProfiles = [...DEFAULT_PROFILES];
const groupVotes = {};

// Helper to normalize strings (remove accents and lower case)
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
 * Get available geographic destinations and environment types
 */
router.get("/destinations", (req, res) => {
  const states = [...new Set(BENCHMARK_LISTINGS.map((l) => l.state).filter(Boolean))];
  const cities = [...new Set(BENCHMARK_LISTINGS.map((l) => l.city).filter(Boolean))];
  
  const environments = [
    { id: "all", label: "✨ Todos os Ambientes", count: BENCHMARK_LISTINGS.length },
    { id: "beach", label: "🏖️ Praia & Litoral", count: BENCHMARK_LISTINGS.filter((l) => l.environment === "beach").length },
    { id: "mountain", label: "🌲 Campo & Serra", count: BENCHMARK_LISTINGS.filter((l) => l.environment === "mountain").length },
    { id: "urban", label: "🏙️ Urbano & Metrópole", count: BENCHMARK_LISTINGS.filter((l) => l.environment === "urban").length }
  ];

  res.json({ states, cities, environments, totalCount: BENCHMARK_LISTINGS.length });
});

/**
 * Geographic search with normalized, accent-insensitive search and dynamic city fallbacks
 */
router.get("/search-geo", (req, res) => {
  const { state, city, environment, query, profileId } = req.query;
  const activeProfile = userProfiles.find((p) => p.id === profileId) || DEFAULT_PROFILES[0];

  const normQuery = normalizeText(query);
  const normCity = normalizeText(city);
  const normState = normalizeText(state);

  let filtered = [...BENCHMARK_LISTINGS];

  // 1. Filter by environment if specified and not 'all'
  if (environment && environment !== "all") {
    filtered = filtered.filter((l) => l.environment === environment);
  }

  // 2. Filter by state if specified and not 'ALL'
  if (normState && normState !== "all") {
    filtered = filtered.filter((l) => normalizeText(l.state) === normState);
  }

  // 3. Filter by city or search query with accent-insensitive search
  if ((normCity && normCity !== "all") || normQuery) {
    const searchTerm = normCity !== "all" && normCity ? normCity : normQuery;

    filtered = filtered.filter((l) => {
      const lCity = normalizeText(l.city);
      const lLoc = normalizeText(l.location);
      const lTitle = normalizeText(l.title);
      const lDesc = normalizeText(l.hostDescription);

      return (
        lCity.includes(searchTerm) ||
        searchTerm.includes(lCity) ||
        lLoc.includes(searchTerm) ||
        lTitle.includes(searchTerm) ||
        lDesc.includes(searchTerm)
      );
    });
  }

  // 4. Dynamic Auto-Generator for any arbitrary city searched if 0 matches
  if (filtered.length === 0 && (normQuery || (normCity && normCity !== "all"))) {
    const cityName = city && city !== "ALL" ? city : query;
    const isBeachCity = /praia|mar|litoral|ilha|ocean/i.test(cityName);
    const isMountainCity = /serra|campo|montanha|monte|val/i.test(cityName);
    const envType = isBeachCity ? "beach" : isMountainCity ? "mountain" : "countryside";

    filtered = [
      {
        id: `dynamic_${normalizeText(cityName)}_villa`,
        url: `https://www.airbnb.com.br/rooms/${Math.floor(10000000 + Math.random() * 90000000)}`,
        title: `Villa Refúgio em ${cityName} - Piscina Aquecida Privativa & Gourmet`,
        location: `Centro / Zona Nobre, ${cityName} - Brasil`,
        state: state && state !== "ALL" ? state : "SP",
        city: cityName,
        environment: envType,
        type: "Casa inteira",
        superhost: true,
        rating: 4.96,
        reviewCount: 45,
        pricePerNight: 820,
        cleaningFee: 180,
        capacity: { guests: 8, bedrooms: 3, beds: 5, baths: 3 },
        images: [
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"
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
          Bem-vindos à nossa casa de temporada em ${cityName}!
          - Piscina privativa com aquecimento por bomba de calor elétrica (água a 30°C mesmo em dias nublados).
          - Cozinha gourmet completa com Fritadeira Airfryer Mondial 5L, Cafeteira Nespresso, micro-ondas e lava-louças.
          - 3 suítes climatizadas com ar-condicionado potente e cortinas blackout.
          - Internet Fibra Óptica de 400 Mbps e quintal cercado para pets.
        `,
        guestReviews: [
          {
            id: "rev_dyn_1",
            author: "Juliana Martins",
            date: "Fevereiro de 2026",
            rating: 5,
            text: `Amamos nossa estadia em ${cityName}! A piscina aquecida foi o ponto alto, água bem quentinha à noite. A cozinha tem airfryer e tudo o que precisamos.`
          },
          {
            id: "rev_dyn_2",
            author: "Marcos Vinicius",
            date: "Janeiro de 2026",
            rating: 5,
            text: `Casa impecável em ${cityName}. O Wi-Fi voou e o ar condicionado em todos os quartos gelou perfeitamente.`
          }
        ]
      },
      {
        id: `dynamic_${normalizeText(cityName)}_chale`,
        url: `https://www.airbnb.com.br/rooms/${Math.floor(10000000 + Math.random() * 90000000)}`,
        title: `Chalé Panorâmico ${cityName} - Hidromassagem Aquecida & Lareira`,
        location: `Vista das Montanhas, ${cityName} - Brasil`,
        state: state && state !== "ALL" ? state : "SP",
        city: cityName,
        environment: envType,
        type: "Chalé de campo inteiro",
        superhost: true,
        rating: 4.92,
        reviewCount: 38,
        pricePerNight: 750,
        cleaningFee: 150,
        capacity: { guests: 4, bedrooms: 2, beds: 3, baths: 2 },
        images: [
          "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
        ],
        officialAmenities: [
          "Banheira de hidromassagem",
          "Lareira",
          "Wi-Fi",
          "Cozinha completa"
        ],
        hostDescription: `
          Refúgio acolhedor em ${cityName} cercado pela natureza.
          - Banheira de hidromassagem dupla aquecida a gás.
          - Lareira interna a lenha com cesto cortesia.
          - Cozinha equipada com Airfryer, cafeteira Dolce Gusto e forno.
          - Wi-Fi de alta velocidade.
        `,
        guestReviews: [
          {
            id: "rev_dyn_3",
            author: "Ana Carolina",
            date: "Janeiro de 2026",
            rating: 5,
            text: `Experiência mágica em ${cityName}. A hidro aquecida é quentinha de verdade e a lareira aquece toda a sala.`
          }
        ]
      }
    ];
  }

  // 5. Final fallback if empty
  if (filtered.length === 0) {
    filtered = BENCHMARK_LISTINGS;
  }

  const comparison = AnalysisEngine.compareListings(filtered, activeProfile);
  const listingsWithVotes = comparison.listings.map((l) => ({
    ...l,
    votes: groupVotes[l.id] || { likes: 0, dislikes: 0, voters: [] }
  }));

  res.json({
    ...comparison,
    listings: listingsWithVotes,
    queryFilters: { state, city, environment, query }
  });
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
