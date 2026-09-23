/**
 * Regional Destination Insights & Autocomplete Database
 * Expanded catalog with Serra Negra, Águas de Lindóia, Brotas, Paraty, Petrópolis, and major destinations.
 */

export const DESTINATIONS_CATALOG = [
  // 1. SERRA NEGRA - SP
  {
    city: "Serra Negra",
    state: "SP",
    label: "Serra Negra, Circuito das Águas - SP",
    environment: "mountain",
    environmentLabel: "Campo & Serra",
    icon: "🌲",
    neighborhoods: ["Centro", "Alto das Palmeiras", "Bairro das Posses", "Refúgio da Serra", "Planalto"],
    tagline: "Circuito das Águas Paulista, Clima de Montanha & Compras de Malhas",
    climateTip: "Clima ameno durante o dia e noites frescas. Piscinas aquecidas por bomba de calor e chalés com lareira garantem conforto o ano inteiro.",
    recommendedProfile: "piscina_lazer",
    topAmenitiesToInspect: [
      { label: "Piscina Aquecida (Bomba de Calor)", reason: "Permite aproveitar mesmo com o vento fresco da serra" },
      { label: "Fritadeira Elétrica (Airfryer)", reason: "Praticidade para refeições e petiscos em família" },
      { label: "Espaço Gourmet & Churrasqueira", reason: "Excelente para confraternizações e almoços ao ar livre" },
      { label: "Lareira Interna ou Aquecedor", reason: "Garante aconchego nas noites frias de inverno" }
    ],
    popularKeywords: ["Piscina aquecida", "Airfryer", "Lareira", "Circuito das Águas", "Vista panorâmica"]
  },

  // 2. ÁGUAS DE LINDÓIA - SP
  {
    city: "Águas de Lindóia",
    state: "SP",
    label: "Águas de Lindóia, Circuito das Águas - SP",
    environment: "mountain",
    environmentLabel: "Campo & Serra",
    icon: "🌲",
    neighborhoods: ["Centro", "Morro do Cruzeiro", "Bela Vista", "Jardim Alpino"],
    tagline: "Capital Termal do Brasil & Relaxamento",
    climateTip: "Destino famoso por águas termais e tranquilidade. Hidromassagens e piscinas climatizadas são o ponto alto.",
    recommendedProfile: "piscina_lazer",
    topAmenitiesToInspect: [
      { label: "Banheira de Hidromassagem Aquecida", reason: "Relaxamento garantido com água quente" },
      { label: "Cozinha Equipada com Airfryer", reason: "Praticidade diária" },
      { label: "Wi-Fi Rápido e Estável", reason: "Conectividade para quem fica longas estadias" }
    ],
    popularKeywords: ["Hidromassagem", "Piscina aquecida", "Serra", "Airfryer"]
  },

  // 3. BROTAS - SP
  {
    city: "Brotas",
    state: "SP",
    label: "Brotas, Capital da Aventura - SP",
    environment: "countryside",
    environmentLabel: "Interior & Ecoturismo",
    icon: "🌾",
    neighborhoods: ["Centro", "Patrimônio", "Represa do Jacaré Pepira"],
    tagline: "Capital da Aventura, Cachoeiras & Ecoturismo",
    climateTip: "Depois de um dia de rafting e cachoeiras, uma piscina privativa aquecida e churrasqueira completam a estadia perfeita.",
    recommendedProfile: "piscina_lazer",
    topAmenitiesToInspect: [
      { label: "Piscina Privativa com Aquecimento", reason: "Relaxamento muscular pós-trilhas e cachoeiras" },
      { label: "Churrasqueira Completa & Espetos", reason: "Churrasco com os amigos após as atividades" },
      { label: "Aceita Pets com Quintal Fechado", reason: "Muitos turistas levam seus cachorros para Brotas" }
    ],
    popularKeywords: ["Piscina aquecida", "Churrasqueira", "Pets", "Ecoturismo"]
  },

  // 4. UBATUBA - SP
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

  // 5. GRAMADO - RS
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

  // 6. CAMPOS DO JORDÃO - SP
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

  // 7. FLORIANÓPOLIS - SC
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

  // 8. ILHABELA - SP
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
      { label: "Ar-condicionado nos 3 Dormitórios", reason: "Evita calor e pernilongos" },
      { label: "Tela Mosquiteira / Proteção", reason: "Essencial para o conforto na ilha" }
    ],
    popularKeywords: ["Feiticeira", "Piscina aquecida", "Churrasqueira", "Forno de pizza"]
  },

  // 9. BÚZIOS - RJ
  {
    city: "Búzios",
    state: "RJ",
    label: "Armação dos Búzios, Região dos Lagos - RJ",
    environment: "beach",
    environmentLabel: "Praia & Litoral",
    icon: "🏖️",
    neighborhoods: ["Geribá", "Ferradura", "João Fernandes", "Ossos", "Tartaruga"],
    tagline: "Charme de Brigitte Bardot & Pôr do Sol",
    climateTip: "A água do mar em Búzios é fria. Uma piscina aquecida na casa é o maior diferencial de conforto.",
    recommendedProfile: "piscina_lazer",
    topAmenitiesToInspect: [
      { label: "Piscina Aquecida com Vista Mar", reason: "Compensa a água gelada das praias da região" },
      { label: "Espaço Gourmet & Adega", reason: "Noites agradáveis com amigos" },
      { label: "Airfryer & Cafeteira de Cápsula", reason: "Praticidade matinal e petiscos" }
    ],
    popularKeywords: ["Geribá", "Vista mar", "Piscina aquecida", "Adega"]
  },

  // 10. MONTE VERDE - MG
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
      { label: "Jogo de Fondue & Taças de Vinho", reason: "Tradição gastronômica da cidade" }
    ],
    popularKeywords: ["Ofurô aquecido", "Lareira", "Fondue", "Pinheiros"]
  },

  // 11. PETRÓPOLIS / ITAIPAVA - RJ
  {
    city: "Petrópolis",
    state: "RJ",
    label: "Petrópolis & Itaipava, Região Serrana - RJ",
    environment: "mountain",
    environmentLabel: "Campo & Serra",
    icon: "🌲",
    neighborhoods: ["Itaipava", "Centro Histórico", "Araras", "Valparaíso", "Corrêas"],
    tagline: "Cidade Imperial, Gastronomia Serrana & Mansões",
    climateTip: "Casas em Itaipava e Araras com piscina aquecida e sauna são ideais para fins de semana ensolarados mas com noites frias.",
    recommendedProfile: "piscina_lazer",
    topAmenitiesToInspect: [
      { label: "Piscina Aquecida & Sauna", reason: "Conjunto perfeito para a serra fluminense" },
      { label: "Lareira & Área Gourmet", reason: "Aconchego para noites frias" },
      { label: "Cozinha Completa com Airfryer", reason: "Praticidade em grupos e famílias" }
    ],
    popularKeywords: ["Itaipava", "Piscina aquecida", "Lareira", "Sauna"]
  },

  // 12. SÃO PAULO - SP
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
      { label: "Piscina Aquecida no Rooftop / Prédio", reason: "Lazer sem sair do condomínio" }
    ],
    popularKeywords: ["Vila Madalena", "Pinheiros", "Home office", "Rooftop"]
  },

  // 13. RIO DE JANEIRO - RJ
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
    const taglineMatch = dest.tagline.toLowerCase().includes(cleanQ);
    return cityMatch || stateMatch || neighborhoodMatch || keywordMatch || taglineMatch;
  });
}

/**
 * Get detailed destination insight by city name or state
 */
export function getDestinationInsight(cityNameOrState) {
  if (!cityNameOrState || cityNameOrState === "ALL") return null;
  const clean = cityNameOrState.trim().toLowerCase();

  // Try exact or partial match
  const found = DESTINATIONS_CATALOG.find(
    (d) =>
      d.city.toLowerCase() === clean ||
      clean.includes(d.city.toLowerCase()) ||
      d.label.toLowerCase().includes(clean)
  );

  if (found) return found;

  // If user typed something like "serra negra" or "serra", match by includes
  return DESTINATIONS_CATALOG.find((d) => d.city.toLowerCase().includes(clean) || clean.includes(d.city.toLowerCase())) || null;
}
