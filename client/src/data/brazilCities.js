/**
 * Comprehensive Brazilian Municipalities & Tourist Destinations Database
 * Covers all 26 Brazilian States + DF, all major cities, tourist districts and municipalities.
 */

// Coastal / Beach Municipalities & Districts
const BEACH_DESTINATIONS = [
  // SP
  { city: "Ubatuba", state: "SP" }, { city: "São Sebastião", state: "SP" }, { city: "Ilhabela", state: "SP" },
  { city: "Caraguatatuba", state: "SP" }, { city: "Bertioga", state: "SP" }, { city: "Guarujá", state: "SP" },
  { city: "Santos", state: "SP" }, { city: "Praia Grande", state: "SP" }, { city: "São Vicente", state: "SP" },
  { city: "Mongaguá", state: "SP" }, { city: "Itanhaém", state: "SP" }, { city: "Peruíbe", state: "SP" },
  { city: "Iguape", state: "SP" }, { city: "Ilha Comprida", state: "SP" }, { city: "Cananéia", state: "SP" },
  { city: "Maresias", state: "SP" }, { city: "Juquehy", state: "SP" }, { city: "Riviera de São Lourenço", state: "SP" },

  // RJ
  { city: "Rio de Janeiro", state: "RJ" }, { city: "Búzios", state: "RJ" }, { city: "Armação dos Búzios", state: "RJ" },
  { city: "Cabo Frio", state: "RJ" }, { city: "Arraial do Cabo", state: "RJ" }, { city: "Angra dos Reis", state: "RJ" },
  { city: "Paraty", state: "RJ" }, { city: "Ilha Grande", state: "RJ" }, { city: "Niterói", state: "RJ" },
  { city: "Maricá", state: "RJ" }, { city: "Saquarema", state: "RJ" }, { city: "Araruama", state: "RJ" },
  { city: "Macaé", state: "RJ" }, { city: "Rio das Ostras", state: "RJ" }, { city: "Mangaratiba", state: "RJ" },

  // SC
  { city: "Florianópolis", state: "SC" }, { city: "Balneário Camboriú", state: "SC" }, { city: "Itapema", state: "SC" },
  { city: "Bombinhas", state: "SC" }, { city: "Garopaba", state: "SC" }, { city: "Imbituba", state: "SC" },
  { city: "Praia do Rosa", state: "SC" }, { city: "Penha", state: "SC" }, { city: "Balneário Piçarras", state: "SC" },
  { city: "Porto Belo", state: "SC" }, { city: "Itajaí", state: "SC" }, { city: "Laguna", state: "SC" },
  { city: "São Francisco do Sul", state: "SC" }, { city: "Governador Celso Ramos", state: "SC" },

  // BA
  { city: "Salvador", state: "BA" }, { city: "Porto Seguro", state: "BA" }, { city: "Trancoso", state: "BA" },
  { city: "Arraial d'Ajuda", state: "BA" }, { city: "Caraíva", state: "BA" }, { city: "Mata de São João", state: "BA" },
  { city: "Praia do Forte", state: "BA" }, { city: "Ilhéus", state: "BA" }, { city: "Itacaré", state: "BA" },
  { city: "Morro de São Paulo", state: "BA" }, { city: "Cairu", state: "BA" }, { city: "Maraú", state: "BA" },
  { city: "Barra Grande", state: "BA" }, { city: "Prado", state: "BA" }, { city: "Cumuruxatiba", state: "BA" },
  { city: "Lauro de Freitas", state: "BA" }, { city: "Camaçari", state: "BA" }, { city: "Itaparica", state: "BA" },

  // AL
  { city: "Maceió", state: "AL" }, { city: "Maragogi", state: "AL" }, { city: "Japaratinga", state: "AL" },
  { city: "São Miguel dos Milagres", state: "AL" }, { city: "Porto de Pedras", state: "AL" }, { city: "Marechal Deodoro", state: "AL" },
  { city: "Barra de São Miguel", state: "AL" }, { city: "Piaçabuçu", state: "AL" }, { city: "Coruripe", state: "AL" },

  // PE
  { city: "Recife", state: "PE" }, { city: "Porto de Galinhas", state: "PE" }, { city: "Ipojuca", state: "PE" },
  { city: "Tamandaré", state: "PE" }, { city: "Praia dos Carneiros", state: "PE" }, { city: "Fernando de Noronha", state: "PE" },
  { city: "Olinda", state: "PE" }, { city: "Jaboatão dos Guararapes", state: "PE" }, { city: "Cabo de Santo Agostinho", state: "PE" },
  { city: "Ilha de Itamaracá", state: "PE" }, { city: "Muro Alto", state: "PE" },

  // RN
  { city: "Natal", state: "RN" }, { city: "Pipa", state: "RN" }, { city: "Tibau do Sul", state: "RN" },
  { city: "São Miguel do Gostoso", state: "RN" }, { city: "Touros", state: "RN" }, { city: "Parnamirim", state: "RN" },
  { city: "Galinhos", state: "RN" }, { city: "Maracajaú", state: "RN" },

  // CE
  { city: "Fortaleza", state: "CE" }, { city: "Jericoacoara", state: "CE" }, { city: "Jijoca de Jericoacoara", state: "CE" },
  { city: "Aquiraz", state: "CE" }, { city: "Porto das Dunas", state: "CE" }, { city: "Beberibe", state: "CE" },
  { city: "Canoa Quebrada", state: "CE" }, { city: "Aracati", state: "CE" }, { city: "Flecheiras", state: "CE" },
  { city: "Trairi", state: "CE" }, { city: "Cumbuco", state: "CE" }, { city: "Caucaia", state: "CE" }, { city: "Guajiru", state: "CE" },

  // ES
  { city: "Vitória", state: "ES" }, { city: "Vila Velha", state: "ES" }, { city: "Guarapari", state: "ES" },
  { city: "Anchieta", state: "ES" }, { city: "Itaúnas", state: "ES" }, { city: "Conceição da Barra", state: "ES" },
  { city: "Aracruz", state: "ES" }, { city: "Linhares", state: "ES" }, { city: "Piúma", state: "ES" },

  // PR
  { city: "Matinhos", state: "PR" }, { city: "Guaratuba", state: "PR" }, { city: "Pontal do Paraná", state: "PR" },
  { city: "Ilha do Mel", state: "PR" }, { city: "Paranaguá", state: "PR" }, { city: "Caiobá", state: "PR" },

  // PB, SE, PI, MA
  { city: "João Pessoa", state: "PB" }, { city: "Cabedelo", state: "PB" }, { city: "Conde", state: "PB" },
  { city: "Aracaju", state: "SE" }, { city: "Estância", state: "SE" }, { city: "Barra dos Coqueiros", state: "SE" },
  { city: "Parnaíba", state: "PI" }, { city: "Luís Correia", state: "PI" }, { city: "Barra Grande do Piauí", state: "PI" },
  { city: "São Luís", state: "MA" }, { city: "Barreirinhas", state: "MA" }, { city: "Santo Amaro do Maranhão", state: "MA" },
  { city: "Atins", state: "MA" }
];

// Mountain & Highland (Serra) Municipalities & Districts
const MOUNTAIN_DESTINATIONS = [
  // RS
  { city: "Gramado", state: "RS" }, { city: "Canela", state: "RS" }, { city: "Bento Gonçalves", state: "RS" },
  { city: "Caxias do Sul", state: "RS" }, { city: "Garibaldi", state: "RS" }, { city: "Nova Petrópolis", state: "RS" },
  { city: "São Francisco de Paula", state: "RS" }, { city: "Cambará do Sul", state: "RS" }, { city: "Farroupilha", state: "RS" },
  { city: "Carlos Barbosa", state: "RS" }, { city: "Pinto Bandeira", state: "RS" }, { city: "Três Coroas", state: "RS" },

  // SC
  { city: "Urubici", state: "SC" }, { city: "São Joaquim", state: "SC" }, { city: "Bom Jardim da Serra", state: "SC" },
  { city: "Lages", state: "SC" }, { city: "Urupema", state: "SC" }, { city: "Rancho Queimado", state: "SC" },
  { city: "Treze Tílias", state: "SC" }, { city: "Pomerode", state: "SC" }, { city: "Praia Grande (Cânions)", state: "SC" },

  // SP
  { city: "Campos do Jordão", state: "SP" }, { city: "Santo Antônio do Pinhal", state: "SP" },
  { city: "São Bento do Sapucaí", state: "SP" }, { city: "Cunha", state: "SP" }, { city: "Serra Negra", state: "SP" },
  { city: "Águas de Lindóia", state: "SP" }, { city: "Socorro", state: "SP" }, { city: "Lindóia", state: "SP" },
  { city: "Monte Alegre do Sul", state: "SP" }, { city: "Amparo", state: "SP" }, { city: "Pedreira", state: "SP" },
  { city: "Joanópolis", state: "SP" }, { city: "Nazaré Paulista", state: "SP" }, { city: "São Francisco Xavier", state: "SP" },

  // MG
  { city: "Monte Verde", state: "MG" }, { city: "Camanducaia", state: "MG" }, { city: "Gonçalves", state: "MG" },
  { city: "São Lourenço", state: "MG" }, { city: "Caxambu", state: "MG" }, { city: "Poços de Caldas", state: "MG" },
  { city: "Tiradentes", state: "MG" }, { city: "São João del-Rei", state: "MG" }, { city: "Ouro Preto", state: "MG" },
  { city: "Lavras Novas", state: "MG" }, { city: "Mariana", state: "MG" }, { city: "Diamantina", state: "MG" },
  { city: "São Thomé das Letras", state: "MG" }, { city: "Capitólio", state: "MG" }, { city: "Serra do Cipó", state: "MG" },
  { city: "Santana do Riacho", state: "MG" }, { city: "Delfim Moreira", state: "MG" }, { city: "Passa Quatro", state: "MG" },
  { city: "Maria da Fé", state: "MG" }, { city: "Extrema", state: "MG" }, { city: "Itamonte", state: "MG" },

  // RJ
  { city: "Petrópolis", state: "RJ" }, { city: "Itaipava", state: "RJ" }, { city: "Teresópolis", state: "RJ" },
  { city: "Nova Friburgo", state: "RJ" }, { city: "Visconde de Mauá", state: "RJ" }, { city: "Penedo", state: "RJ" },
  { city: "Itatiaia", state: "RJ" }, { city: "Maringá (RJ/MG)", state: "RJ" }, { city: "Maromba", state: "RJ" },
  { city: "Guapimirim", state: "RJ" }, { city: "Miguel Pereira", state: "RJ" }, { city: "Vassouras", state: "RJ" },
  { city: "Valença", state: "RJ" }, { city: "Conservatória", state: "RJ" },

  // ES, CE, PE, PB, BA
  { city: "Domingos Martins", state: "ES" }, { city: "Pedra Azul", state: "ES" }, { city: "Venda Nova do Imigrante", state: "ES" },
  { city: "Santa Teresa", state: "ES" }, { city: "Guaramiranga", state: "CE" }, { city: "Garanhuns", state: "PE" },
  { city: "Gravatá", state: "PE" }, { city: "Triunfo", state: "PE" }, { city: "Bananeiras", state: "PB" },
  { city: "Lençóis (Chapada Diamantina)", state: "BA" }, { city: "Mucugê", state: "BA" }, { city: "Vale do Capão", state: "BA" }
];

// Major Urban & Metropolitan Hubs
const URBAN_DESTINATIONS = [
  { city: "São Paulo", state: "SP" }, { city: "Rio de Janeiro", state: "RJ" }, { city: "Belo Horizonte", state: "MG" },
  { city: "Brasília", state: "DF" }, { city: "Curitiba", state: "PR" }, { city: "Porto Alegre", state: "RS" },
  { city: "Salvador", state: "BA" }, { city: "Fortaleza", state: "CE" }, { city: "Recife", state: "PE" },
  { city: "Goiânia", state: "GO" }, { city: "Manaus", state: "AM" }, { city: "Belém", state: "PA" },
  { city: "Florianópolis", state: "SC" }, { city: "Vitória", state: "ES" }, { city: "Natal", state: "RN" },
  { city: "Maceió", state: "AL" }, { city: "João Pessoa", state: "PB" }, { city: "Aracaju", state: "SE" },
  { city: "Teresina", state: "PI" }, { city: "São Luís", state: "MA" }, { city: "Campo Grande", state: "MS" },
  { city: "Cuiabá", state: "MT" }, { city: "Porto Velho", state: "RO" }, { city: "Palmas", state: "TO" },
  { city: "Macapá", state: "AP" }, { city: "Boa Vista", state: "RR" }, { city: "Rio Branco", state: "AC" },
  { city: "Campinas", state: "SP" }, { city: "Ribeirão Preto", state: "SP" }, { city: "Sorocaba", state: "SP" },
  { city: "São José dos Campos", state: "SP" }, { city: "São José do Rio Preto", state: "SP" }, { city: "Piracicaba", state: "SP" },
  { city: "Bauru", state: "SP" }, { city: "Jundiaí", state: "SP" }, { city: "Uberlândia", state: "MG" },
  { city: "Juiz de Fora", state: "MG" }, { city: "Montes Claros", state: "MG" }, { city: "Londrina", state: "PR" },
  { city: "Maringá", state: "PR" }, { city: "Cascavel", state: "PR" }, { city: "Foz do Iguaçu", state: "PR" },
  { city: "Ponta Grossa", state: "PR" }, { city: "Joinville", state: "SC" }, { city: "Blumenau", state: "SC" },
  { city: "Criciúma", state: "SC" }, { city: "Chapecó", state: "SC" }, { city: "Caxias do Sul", state: "RS" },
  { city: "Pelotas", state: "RS" }, { city: "Santa Maria", state: "RS" }, { city: "Passo Fundo", state: "RS" },
  { city: "Feira de Santana", state: "BA" }, { city: "Vitória da Conquista", state: "BA" }, { city: "Caruaru", state: "PE" },
  { city: "Petrolina", state: "PE" }, { city: "Campina Grande", state: "PB" }, { city: "Mossoró", state: "RN" },
  { city: "Sobral", state: "CE" }, { city: "Juazeiro do Norte", state: "CE" }, { city: "Anápolis", state: "GO" },
  { city: "Rondonópolis", state: "MT" }, { city: "Dourados", state: "MS" }
];

// Interior, Ecoturismo, Represas & Termas
const COUNTRYSIDE_DESTINATIONS = [
  { city: "Brotas", state: "SP" }, { city: "Olímpia", state: "SP" }, { city: "Barretos", state: "SP" },
  { city: "Holambra", state: "SP" }, { city: "Boituva", state: "SP" }, { city: "Itu", state: "SP" },
  { city: "São Roque", state: "SP" }, { city: "Atibaia", state: "SP" }, { city: "Bragança Paulista", state: "SP" },
  { city: "Águas de São Pedro", state: "SP" }, { city: "São Pedro", state: "SP" }, { city: "Ibiúna", state: "SP" },
  { city: "Avaré", state: "SP" }, { city: "Botucatu", state: "SP" }, { city: "Presidente Prudente", state: "SP" },
  { city: "Franca", state: "SP" }, { city: "Araraquara", state: "SP" }, { city: "São Carlos", state: "SP" },
  { city: "Caldas Novas", state: "GO" }, { city: "Rio Quente", state: "GO" }, { city: "Pirenópolis", state: "GO" },
  { city: "Alto Paraíso de Goiás", state: "GO" }, { city: "São Jorge", state: "GO" }, { city: "Cavalcante", state: "GO" },
  { city: "Chapada dos Veadeiros", state: "GO" }, { city: "Bonito", state: "MS" }, { city: "Bodoquena", state: "MS" },
  { city: "Pantanal", state: "MS" }, { city: "Corumbá", state: "MS" }, { city: "Miranda", state: "MS" },
  { city: "Chapada dos Guimarães", state: "MT" }, { city: "Nobres", state: "MT" }, { city: "Bom Jardim", state: "MT" },
  { city: "Jalapão", state: "TO" }, { city: "Mateiros", state: "TO" }, { city: "Ponte Alta do Tocantins", state: "TO" },
  { city: "Alter do Chão", state: "PA" }, { city: "Santarém", state: "PA" }, { city: "Presidente Figueiredo", state: "AM" }
];

// Combine and enrich all Brazilian destinations
export const ALL_BRAZIL_DESTINATIONS = [
  ...BEACH_DESTINATIONS.map((d) => ({
    ...d,
    environment: "beach",
    environmentLabel: "Praia & Litoral",
    icon: "🏖️",
    label: `${d.city}, ${d.state} (Praia)`,
    tagline: `Destino litorâneo em ${d.state} com praias, frutos do mar e brisa do oceano.`
  })),

  ...MOUNTAIN_DESTINATIONS.map((d) => ({
    ...d,
    environment: "mountain",
    environmentLabel: "Campo & Serra",
    icon: "🌲",
    label: `${d.city}, ${d.state} (Serra)`,
    tagline: `Destino de serra em ${d.state} com clima fresco, lareiras e gastronomia acolhedora.`
  })),

  ...URBAN_DESTINATIONS.map((d) => ({
    ...d,
    environment: "urban",
    environmentLabel: "Urbano & Metrópole",
    icon: "🏙️",
    label: `${d.city}, ${d.state} (Capital / Centro)`,
    tagline: `Polo metropolitano em ${d.state} com alta conectividade, gastronomia e cultura.`
  })),

  ...COUNTRYSIDE_DESTINATIONS.map((d) => ({
    ...d,
    environment: "countryside",
    environmentLabel: "Interior & Campo",
    icon: "🌾",
    label: `${d.city}, ${d.state} (Interior)`,
    tagline: `Refúgio no interior de ${d.state} com tranquilidade, natureza e ar puro.`
  }))
];

// Remove duplicates by city + state key
export const BRAZIL_CITIES_CATALOG = Array.from(
  new Map(ALL_BRAZIL_DESTINATIONS.map((item) => [`${item.city.toLowerCase()}_${item.state.toLowerCase()}`, item])).values()
);

/**
 * Normalize strings helper (removes accents, lowercase, trim)
 */
export function normalize(str) {
  if (!str) return "";
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Search across ALL Brazilian cities and destinations
 */
export function searchBrazilCities(query, stateFilter = "ALL", envFilter = "all") {
  if (!query || !query.trim()) {
    let list = BRAZIL_CITIES_CATALOG;
    if (envFilter && envFilter !== "all") {
      list = list.filter((c) => c.environment === envFilter);
    }
    if (stateFilter && stateFilter !== "ALL") {
      list = list.filter((c) => c.state.toUpperCase() === stateFilter.toUpperCase());
    }
    return list.slice(0, 15);
  }

  const cleanQ = normalize(query);

  const matched = BRAZIL_CITIES_CATALOG.filter((dest) => {
    const cityName = normalize(dest.city);
    const stateCode = normalize(dest.state);
    const fullLabel = normalize(dest.label);
    const envLabel = normalize(dest.environmentLabel);

    // Apply state filter if provided
    if (stateFilter && stateFilter !== "ALL" && dest.state.toUpperCase() !== stateFilter.toUpperCase()) {
      return false;
    }

    // Apply environment filter if provided
    if (envFilter && envFilter !== "all" && dest.environment !== envFilter) {
      return false;
    }

    return (
      cityName.startsWith(cleanQ) ||
      cityName.includes(cleanQ) ||
      cleanQ.includes(cityName) ||
      fullLabel.includes(cleanQ) ||
      stateCode === cleanQ ||
      envLabel.includes(cleanQ)
    );
  });

  // Sort by relevance (exact match > startsWith > includes)
  matched.sort((a, b) => {
    const aNorm = normalize(a.city);
    const bNorm = normalize(b.city);
    if (aNorm === cleanQ) return -1;
    if (bNorm === cleanQ) return 1;
    if (aNorm.startsWith(cleanQ) && !bNorm.startsWith(cleanQ)) return -1;
    if (!aNorm.startsWith(cleanQ) && bNorm.startsWith(cleanQ)) return 1;
    return a.city.localeCompare(b.city);
  });

  // If query does not match any predefined city in the database, return a synthesized city object for ANY Brazilian city typed!
  if (matched.length === 0 && query.trim().length >= 2) {
    const cityName = query.trim();
    const isBeach = /praia|mar|litoral|ilha|porto|costa|bahia|oceano/i.test(cityName);
    const isMountain = /serra|monte|morro|alto|montanha|chale|vale|frio|gaucha/i.test(cityName);
    const env = isBeach ? "beach" : isMountain ? "mountain" : "countryside";

    return [
      {
        city: cityName,
        state: stateFilter !== "ALL" ? stateFilter : "Brasil",
        environment: env,
        environmentLabel: isBeach ? "Praia & Litoral" : isMountain ? "Campo & Serra" : "Interior & Campo",
        icon: isBeach ? "🏖️" : isMountain ? "🌲" : "📍",
        label: `${cityName} (${stateFilter !== "ALL" ? stateFilter : "Brasil"})`,
        tagline: `Destino turístico personalizado em ${cityName} com auditoria completa.`
      }
    ];
  }

  return matched.slice(0, 15);
}
