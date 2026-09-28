import { BRAZIL_CITIES_CATALOG, searchBrazilCities, normalize } from "./brazilCities.js";

export const DESTINATIONS_CATALOG = BRAZIL_CITIES_CATALOG;

/**
 * Curated deep insights for major Brazilian destinations
 */
export const CURATED_INSIGHTS = {
  "serra negra": {
    city: "Serra Negra",
    state: "SP",
    label: "Serra Negra, Circuito das Águas - SP",
    environment: "mountain",
    environmentLabel: "Campo & Serra",
    icon: "🌲",
    tagline: "Circuito das Águas Paulista, Clima de Montanha & Compras de Malhas",
    climateTip: "Clima ameno durante o dia e noites frescas. Piscinas aquecidas por bomba de calor e chalés com lareira garantem conforto o ano inteiro.",
    topAmenitiesToInspect: [
      { label: "Piscina Aquecida (Bomba de Calor)", reason: "Permite aproveitar mesmo com o vento fresco da serra" },
      { label: "Fritadeira Elétrica (Airfryer)", reason: "Praticidade para refeições e petiscos em família" },
      { label: "Espaço Gourmet & Churrasqueira", reason: "Excelente para confraternizações e almoços ao ar livre" },
      { label: "Lareira Interna ou Aquecedor", reason: "Garante aconchego nas noites frias de inverno" }
    ],
    popularKeywords: ["Piscina aquecida", "Airfryer", "Lareira", "Circuito das Águas"]
  },
  "ubatuba": {
    city: "Ubatuba",
    state: "SP",
    label: "Ubatuba, Litoral Norte - SP",
    environment: "beach",
    environmentLabel: "Praia & Litoral",
    icon: "🏖️",
    tagline: "Litoral Norte Paulista & Mata Atlântica",
    climateTip: "Região com chuvas rápidas frequentes. Piscinas com bomba de calor elétrica garantem água quentinha mesmo em dias nublados.",
    topAmenitiesToInspect: [
      { label: "Piscina Aquecida por Bomba de Calor", reason: "Não depende do sol para esquentar" },
      { label: "Fritadeira Airfryer", reason: "Indispensável para petiscos rápidos pós-praia" },
      { label: "Ar-condicionado em Todos os Quartos", reason: "O calor e umidade no verão são intensos" }
    ],
    popularKeywords: ["Airfryer", "Bomba de calor", "Churrasqueira", "Perto da praia"]
  },
  "gramado": {
    city: "Gramado",
    state: "RS",
    label: "Gramado, Serra Gaúcha - RS",
    environment: "mountain",
    environmentLabel: "Campo & Serra",
    icon: "🌲",
    tagline: "Serra Gaúcha, Romantismo & Clima Europeu",
    climateTip: "Temperaturas caem muito à noite (frequentemente abaixo de 10°C). Priorize lareiras e hidros aquecidas a gás.",
    topAmenitiesToInspect: [
      { label: "Banheira de Hidromassagem Aquecida a Gás", reason: "Aquecimento rápido e água muito quente" },
      { label: "Lareira Interna (Lenha Inclusa)", reason: "Aconchego e aquecimento natural da sala" },
      { label: "Calefação ou Ar Quente/Frio", reason: "Essencial para não passar frio de madrugada" }
    ],
    popularKeywords: ["Hidromassagem", "Lareira", "Calefação", "Fondue"]
  },
  "campos do jordao": {
    city: "Campos do Jordão",
    state: "SP",
    label: "Campos do Jordão, Serra da Mantiqueira - SP",
    environment: "mountain",
    environmentLabel: "Campo & Serra",
    icon: "🌲",
    tagline: "Suíça Brasileira & Gastronomia de Altitude",
    climateTip: "Aquecedores solares costumam falhar em semanas nubladas de inverno. Verifique se há aquecedor elétrico auxiliar.",
    topAmenitiesToInspect: [
      { label: "Lareira Central & Espaço Gourmet", reason: "Perfeito para noites de vinho com amigos" },
      { label: "Aquecimento na Piscina / Hidro", reason: "Confira nos relatos se a água fica realmente quente" },
      { label: "Cozinha com Airfryer & Forno", reason: "Praticidade para refeições em família" }
    ],
    popularKeywords: ["Lareira", "Capivari", "Vista montanha", "Airfryer"]
  },
  "florianopolis": {
    city: "Florianópolis",
    state: "SC",
    label: "Florianópolis, Ilha da Magia - SC",
    environment: "beach",
    environmentLabel: "Praia & Litoral",
    icon: "🏖️",
    tagline: "Capital Catarinense, Praias Paradisíacas & Home Office",
    climateTip: "Destino muito procurado por nômades digitais e famílias. A conexão de internet de alta velocidade é ponto-chave.",
    topAmenitiesToInspect: [
      { label: "Internet Fibra 400M+ & Cadeira Ergonômica", reason: "Ideal para trabalhar com vista pro mar" },
      { label: "Cozinha Completa com Airfryer & Nespresso", reason: "Conforto diário sem precisar ir a restaurantes" },
      { label: "Redes de Proteção nas Janelas", reason: "Segurança total em apartamentos altos para crianças" }
    ],
    popularKeywords: ["Home office", "600 megas", "Jurerê", "Airfryer"]
  },
  "balneario camboriu": {
    city: "Balneário Camboriú",
    state: "SC",
    label: "Balneário Camboriú, Litoral Norte - SC",
    environment: "beach",
    environmentLabel: "Praia & Litoral",
    icon: "🏖️",
    tagline: "Dubai Brasileira, Arranha-céus & Gastronomia à Beira-Mar",
    climateTip: "Como os prédios altos na praia central projetam sombra à tarde, piscinas aquecidas e churrasqueiras na sacada são altamente valorizadas.",
    topAmenitiesToInspect: [
      { label: "Piscina Aquecida no Rooftop ou Condomínio", reason: "Permite aproveitar o dia todo independente da sombra dos edifícios" },
      { label: "Churrasqueira a Carvão na Sacada", reason: "Tradição em apartamentos de alto padrão em BC" },
      { label: "Ar-condicionado em Todos os Cômodos", reason: "Calor intenso na temporada de verão" }
    ],
    popularKeywords: ["Barra Sul", "Frente mar", "Churrasqueira na sacada", "Piscina aquecida"]
  },
  "caldas novas": {
    city: "Caldas Novas",
    state: "GO",
    label: "Caldas Novas, Maior Estância Hidrotermal - GO",
    environment: "countryside",
    environmentLabel: "Interior & Águas Termais",
    icon: "♨️",
    tagline: "Paraíso das Águas Termais & Parques Aquáticos",
    climateTip: "Águas naturalmente quentes em toda a cidade. Certifique-se de que a cozinha conta com utensílios e airfryer para refeições entre os banhos termais.",
    topAmenitiesToInspect: [
      { label: "Piscinas com Águas Termais Naturais", reason: "O grande atrativo da região de Goiás" },
      { label: "Ar-condicionado Potente", reason: "Clima quente do Centro-Oeste pede climatização forte" },
      { label: "Airfryer e Cozinha Prática", reason: "Economia e rapidez entre passeios aos parques" }
    ],
    popularKeywords: ["Águas termais", "Parque aquático", "Airfryer", "Clube"]
  }
};

/**
 * Search all Brazilian cities and destinations
 */
export function searchDestinations(query, stateFilter = "ALL", envFilter = "all") {
  return searchBrazilCities(query, stateFilter, envFilter);
}

/**
 * Get detailed destination insight for ANY Brazilian city
 */
export function getDestinationInsight(cityNameOrState) {
  if (!cityNameOrState || cityNameOrState === "ALL") return null;
  const clean = normalize(cityNameOrState);

  // Check curated direct dictionary
  for (const [key, val] of Object.entries(CURATED_INSIGHTS)) {
    if (clean === key || clean.includes(key) || key.includes(clean)) {
      return val;
    }
  }

  // Find in all Brazilian catalog
  const foundCity = BRAZIL_CITIES_CATALOG.find((c) => {
    const cNorm = normalize(c.city);
    return cNorm === clean || clean.includes(cNorm) || cNorm.includes(clean);
  });

  if (foundCity) {
    const isBeach = foundCity.environment === "beach";
    const isMountain = foundCity.environment === "mountain";
    const isUrban = foundCity.environment === "urban";

    return {
      city: foundCity.city,
      state: foundCity.state,
      label: `${foundCity.city} - ${foundCity.state}`,
      environment: foundCity.environment,
      environmentLabel: foundCity.environmentLabel,
      icon: foundCity.icon,
      tagline: foundCity.tagline,
      climateTip: isBeach
        ? `Destino no litoral de ${foundCity.state}. Piscinas com aquecimento elétrico/bomba de calor e ar-condicionado em todos os cômodos são altamente recomendados.`
        : isMountain
        ? `Região serrana em ${foundCity.state}. Clima fresco e noites frias. Priorize hidromassagens aquecidas a gás, lareira e ar quente/frio.`
        : isUrban
        ? `Centro urbano e negócios em ${foundCity.state}. Priorize Wi-Fi de alta velocidade (300M+), cadeira ergonômica e cortinas blackout.`
        : `Excelente destino de interior em ${foundCity.state}. Áreas com piscina privativa aquecida, churrasqueira e ar-condicionado garantem conforto total.`,
      topAmenitiesToInspect: [
        {
          label: isMountain ? "Hidromassagem Aquecida ou Lareira" : "Piscina Aquecida",
          reason: isMountain ? "Aconchego garantido para noites frias" : "Banho agradável mesmo em dias nublados"
        },
        { label: "Fritadeira Elétrica (Airfryer)", reason: "Praticidade para refeições e petiscos rápidos" },
        { label: "Ar-condicionado nos Quartos", reason: "Conforto térmico e noites silenciosas" },
        { label: "Wi-Fi Rápido e Estável", reason: "Para navegar e trabalhar sem travamentos" }
      ],
      popularKeywords: ["Airfryer", "Piscina aquecida", "Ar-condicionado", "Wi-Fi rápido"]
    };
  }

  return null;
}
