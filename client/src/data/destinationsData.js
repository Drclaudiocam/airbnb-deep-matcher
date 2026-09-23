/**
 * Regional Destination Insights & Autocomplete Database
 * Provides curated recommendations, climate tips and must-check amenities per destination.
 */

export const DESTINATIONS_CATALOG = [
  {
    city: "Ubatuba",
    state: "SP",
    label: "Ubatuba, Litoral Norte - SP",
    environment: "beach",
    environmentLabel: "Praia & Litoral",
    icon: "🏖️",
    neighborhoods: ["Praia Grande", "Itamambuca", "Tenório", "Toninhas", "Praia do Félix"],
    tagline: "Litoral Norte Paulista & Mata Atlântica",
    climateTip: "Região com chuvas rápidas frequentes. Piscinas com bomba de calor elétrica garantem água quentinha mesmo em dias nublados.",
    recommendedProfile: "piscina_lazer",
    topAmenitiesToInspect: [
      { label: "Piscina Aquecida por Bomba de Calor", reason: "Não depende do sol para esquentar" },
      { label: "Fritadeira Airfryer", reason: "Indispensável para petiscos rápidos pós-praia" },
      { label: "Ar-condicionado em Todos os Quartos", reason: "O calor e umidade no verão são intensos" },
      { label: "Quintal Cercado para Pets", reason: "Excelente para quem viaja com cachorro" }
    ],
    popularKeywords: ["Airfryer", "Bomba de calor", "Churrasqueira", "Perto da praia"]
  },

  {
    city: "Gramado",
    state: "RS",
    label: "Gramado, Serra Gaúcha - RS",
    environment: "mountain",
    environmentLabel: "Campo & Serra",
    icon: "🌲",
    neighborhoods: ["Planalto", "Centro", "Bavária", "Carniel", "Mato Queimado"],
    tagline: "Serra Gaúcha, Romantismo & Clima Europeu",
    climateTip: "Temperaturas caem muito à noite (frequentemente abaixo de 10°C). Priorize lareiras e hidros aquecidas a gás.",
    recommendedProfile: "gourmet_culinaria",
    topAmenitiesToInspect: [
      { label: "Banheira de Hidromassagem Aquecida a Gás", reason: "Aquecimento rápido e água muito quente" },
      { label: "Lareira Interna (Lenha Inclusa)", reason: "Aconchego e aquecimento natural da sala" },
      { label: "Calefação ou Ar Quente/Frio", reason: "Essencial para não passar frio de madrugada" },
      { label: "Cortinas Blackout", reason: "Para descansar sem claridade matinal" }
    ],
    popularKeywords: ["Hidromassagem", "Lareira", "Calefação", "Fondue", "Vinho"]
  },

  {
    city: "Campos do Jordão",
    state: "SP",
    label: "Campos do Jordão, Serra da Mantiqueira - SP",
    environment: "mountain",
    environmentLabel: "Campo & Serra",
    icon: "🌲",
    neighborhoods: ["Capivari", "Alto Capivari", "Jaguaribe", "Abernéssia", "Vila Inglesa"],
    tagline: "Suíça Brasileira & Gastronomia de Altitude",
    climateTip: "Aquecedores solares costumam falhar em semanas nubladas de inverno. Verifique se há aquecedor elétrico auxiliar.",
    recommendedProfile: "piscina_lazer",
    topAmenitiesToInspect: [
      { label: "Lareira Central & Espaço Gourmet", reason: "Perfeito para noites de vinho com amigos" },
      { label: "Aquecimento na Piscina / Hidro", reason: "Confira nos relatos se a água fica realmente quente" },
      { label: "Cozinha com Airfryer & Forno", reason: "Praticidade para refeições em família" },
      { label: "Wi-Fi Fibra Óptica", reason: "Sinal de celular pode oscilar em áreas altas" }
    ],
    popularKeywords: ["Lareira", "Capivari", "Vista montanha", "Airfryer"]
  },

  {
    city: "Florianópolis",
    state: "SC",
    label: "Florianópolis, Ilha da Magia - SC",
    environment: "beach",
    environmentLabel: "Praia & Litoral",
    icon: "🏖️",
    neighborhoods: ["Jurerê Internacional", "Campeche", "Lagoa da Conceição", "Canasvieiras", "Ingleses"],
    tagline: "Capital Catarinense, Praias Paradisíacas & Home Office",
    climateTip: "Destino muito procurado por nômades digitais e famílias. A conexão de internet de alta velocidade é ponto-chave.",
    recommendedProfile: "home_office",
    topAmenitiesToInspect: [
      { label: "Internet Fibra 400M+ & Cadeira Ergonômica", reason: "Ideal para trabalhar com vista pro mar" },
      { label: "Cozinha Completa com Airfryer & Nespresso", reason: "Conforto diário sem precisar ir a restaurantes" },
      { label: "Redes de Proteção nas Janelas", reason: "Segurança total em apartamentos altos para crianças" },
      { label: "Ar-condicionado Silencioso", reason: "Noites frescas e sem barulho" }
    ],
    popularKeywords: ["Home office", "600 megas", "Jurerê", "Airfryer", "Rede de proteção"]
  },

  {
    city: "Ilhabela",
    state: "SP",
    label: "Ilhabela, Litoral Norte - SP",
    environment: "beach",
    environmentLabel: "Praia & Litoral",
    icon: "🏖️",
    neighborhoods: ["Feiticeira", "Perequê", "Praia do Curral", "Vila", "Praia Grande"],
    tagline: "Capital da Vela & Natureza Preservada",
    climateTip: "Casas em meio à mata se beneficiam de piscinas privativas aquecidas para banhos noturnos.",
    recommendedProfile: "piscina_lazer",
    topAmenitiesToInspect: [
      { label: "Piscina Privativa com Hidro", reason: "Exclusividade e relaxamento após trilhas e praias" },
      { label: "Churrasqueira & Forno de Pizza", reason: "Lazer completo no quiosque" },
      { label: "Ar-condicionado em Todos os Dormitórios", reason: "Evita calor e pernilongos" },
      { label: "Tela Mosquiteira / Proteção", reason: "Essencial para o conforto na ilha" }
    ],
    popularKeywords: ["Feiticeira", "Piscina aquecida", "Churrasqueira", "Forno de pizza"]
  },

  {
    city: "Búzios",
    state: "RJ",
    label: "Armação dos Búzios, Região dos Lagos - RJ",
    environment: "beach",
    environmentLabel: "Praia & Litoral",
    icon: "🏖️",
    neighborhoods: ["Geribá", "Ferradura", "João Fernandes", "Ossos", "Tartaruga"],
    tagline: "Charme de Brigitte Bardot & Pôr do Sol",
    climateTip: "A água do mar em Búzios é famosa por ser fria. Uma piscina aquecida na casa é o maior diferencial de conforto.",
    recommendedProfile: "piscina_lazer",
    topAmenitiesToInspect: [
      { label: "Piscina Aquecida com Vista Mar", reason: "Compensa a água gelada das praias da região" },
      { label: "Espaço Gourmet & Adega", reason: "Noites agradáveis com amigos" },
      { label: "Airfryer & Cafeteira de Cápsula", reason: "Praticidade matinal e petiscos" },
      { label: "Ar-condicionado Inverter", reason: "Silêncio e economia térmica" }
    ],
    popularKeywords: ["Geribá", "Vista mar", "Piscina aquecida", "Adega"]
  },

  {
    city: "Monte Verde",
    state: "MG",
    label: "Monte Verde, Serra da Mantiqueira - MG",
    environment: "mountain",
    environmentLabel: "Campo & Serra",
    icon: "🌲",
    neighborhoods: ["Vila dos Pinheiros", "Centro", "Jardim das Montanhas", "Trilha do Pináculo"],
    tagline: "Refúgio Alpino Mineiro & Fondue",
    climateTip: "Altitude de mais de 1.500m. Ofurôs na varanda precisam de aquecimento elétrico potente para não esfriar rápido.",
    recommendedProfile: "gourmet_culinaria",
    topAmenitiesToInspect: [
      { label: "Ofurô / Hidromassagem Externa Aquecida", reason: "Banho quente com vista para a serra" },
      { label: "Lareira com Lenha à Vontade", reason: "Item mais procurado no inverno" },
      { label: "Jogo de Fondue & Taças de Vinho", reason: "Tradição gastronômica da cidade" },
      { label: "Silêncio & Isolamento Acústico", reason: "Paz para recarregar as energias" }
    ],
    popularKeywords: ["Ofurô aquecido", "Lareira", "Fondue", "Pinheiros"]
  },

  {
    city: "São Paulo",
    state: "SP",
    label: "São Paulo, Capital - SP",
    environment: "urban",
    environmentLabel: "Urbano & Metrópole",
    icon: "🏙️",
    neighborhoods: ["Pinheiros", "Vila Madalena", "Jardins", "Itaim Bibi", "Moema"],
    tagline: "Gastronomia Mundial, Negócios & Cultura",
    climateTip: "Foco em mobilidade e alta produtividade para quem vem a trabalho ou lazer gastronômico.",
    recommendedProfile: "home_office",
    topAmenitiesToInspect: [
      { label: "Wi-Fi Fibra 500M+ & Cadeira Herman Miller", reason: "Garante reuniões sem falhas" },
      { label: "Cozinha Compacta com Airfryer & Nespresso", reason: "Rapidez entre compromissos" },
      { label: "Piscina Aquecida no Rooftop / Prédio", reason: "Lazer sem sair do condomínio" },
      { label: "Cortinas Blackout & Vidros Antirruído", reason: "Sono tranquilo sem barulho da avenida" }
    ],
    popularKeywords: ["Vila Madalena", "Pinheiros", "Home office", "Rooftop"]
  },

  {
    city: "Rio de Janeiro",
    state: "RJ",
    label: "Rio de Janeiro, Cidade Maravilhosa - RJ",
    environment: "beach",
    environmentLabel: "Urbano & Praia",
    icon: "🏖️",
    neighborhoods: ["Ipanema", "Leblon", "Copacabana", "Barra da Tijuca", "Santa Teresa"],
    tagline: "Praia, Bossa Nova & Cenários Icônicos",
    climateTip: "O verão carioca exige ar-condicionado potente em todos os cômodos para garantir noites confortáveis.",
    recommendedProfile: "piscina_lazer",
    topAmenitiesToInspect: [
      { label: "Ar-condicionado em Todos os Cômodos", reason: "Calor forte em quase todas as estações" },
      { label: "Vista para o Mar ou Perto da Praia", reason: "Fazer tudo a pé até a areia" },
      { label: "Redes de Proteção nas Janelas", reason: "Tranquilidade para quem viaja com filhos" },
      { label: "Cozinha com Airfryer", reason: "Alimentação prática e saudável" }
    ],
    popularKeywords: ["Posto 9", "Ipanema", "Vista mar", "Ar split"]
  }
];

/**
 * Helper to match query text against catalog cities, states, and neighborhoods
 */
export function searchDestinations(query) {
  if (!query || !query.trim()) return DESTINATIONS_CATALOG;
  const cleanQ = query.trim().toLowerCase();

  return DESTINATIONS_CATALOG.filter((dest) => {
    const cityMatch = dest.city.toLowerCase().includes(cleanQ);
    const stateMatch = dest.state.toLowerCase() === cleanQ || dest.label.toLowerCase().includes(cleanQ);
    const neighborhoodMatch = dest.neighborhoods.some((n) => n.toLowerCase().includes(cleanQ));
    const keywordMatch = dest.popularKeywords.some((k) => k.toLowerCase().includes(cleanQ));
    return cityMatch || stateMatch || neighborhoodMatch || keywordMatch;
  });
}

/**
 * Get detailed destination insight by city name or state
 */
export function getDestinationInsight(cityNameOrState) {
  if (!cityNameOrState || cityNameOrState === "ALL") return null;
  const clean = cityNameOrState.trim().toLowerCase();
  return DESTINATIONS_CATALOG.find(
    (d) => d.city.toLowerCase() === clean || d.label.toLowerCase().includes(clean)
  ) || null;
}
