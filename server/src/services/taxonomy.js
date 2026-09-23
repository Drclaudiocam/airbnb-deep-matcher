/**
 * Taxonomy Dictionary & Lexical Patterns for Airbnb Deep Analysis
 * Categorizes micro-amenities, sub-types, positive indicators and negative caveats.
 */

export const TAXONOMY = {
  // 1. ÁREA AQUÁTICA & LAZER
  pool_heated: {
    id: "pool_heated",
    category: "Piscina & Spa",
    label: "Piscina Aquecida",
    description: "Piscina com sistema de aquecimento ativo (solar, trocador de calor ou gás)",
    officialKeys: ["Piscina aquecida", "Heated pool", "Piscina coberta aquecida", "Hidromassagem", "Banheira de hidromassagem"],
    positivePatterns: [
      /piscina\s+(aquecida|quentinha|quent[eé]|climatizada|t[eé]rmica)/i,
      /aquecimento\s+(da|na)\s+piscina/i,
      /bomba\s+de\s+calor\s+(para\s+a\s+)?piscina/i,
      /trocador\s+de\s+calor/i,
      /aquecedor\s+solar\s+(para\s+a\s+)?piscina/i,
      /piscina\s+aquecida\s+(a\s+g[aá]s|solar|el[eé]trica)/i,
      /água\s+da\s+piscina\s+(estava\s+)?(quente|maravilhosa|quentinha)/i,
      /aproveitamos\s+a\s+piscina\s+(a\s+noite|no\s+frio|mesmo\s+com\s+frio)/i,
      /jacuzzi\s+(aquecida|com\s+hidro|quentinha)/i,
      /ofur[oô]\s+aquecido/i
    ],
    negativePatterns: [
      /piscina\s+(n[aã]o\s+[eé]|sem)\s+aquecid[ao]/i,
      /piscina\s+(estava\s+)?(muito\s+)?fria/i,
      /aquecedor\s+da\s+piscina\s+(estava\s+)?(quebrado|estragado|desligado|n[aã]o\s+funcionou)/i,
      /cobram\s+(taxa\s+)?(extra|por\s+fora)\s+pelo\s+aquecimento/i,
      /aquecimento\s+solar\s+mas\s+como\s+estava\s+nublado\s+ficou\s+fria/i
    ],
    detailsExtractor: (text) => {
      if (/solar/i.test(text)) return "Aquecimento Solar (depende de sol)";
      if (/g[aá]s/i.test(text)) return "Aquecimento a Gás";
      if (/trocador|bomba\s+de\s+calor|el[eé]tric/i.test(text)) return "Bomba de Calor / Elétrica";
      if (/jacuzzi|hidro/i.test(text)) return "Jacuzzi / Hidromassagem Aquecida";
      return "Piscina Aquecida Confirmada";
    }
  },

  pool_private: {
    id: "pool_private",
    category: "Piscina & Spa",
    label: "Piscina Privativa",
    description: "Piscina exclusiva da acomodação, não compartilhada com condomínio",
    officialKeys: ["Piscina privativa", "Private pool", "Piscina de uso exclusivo"],
    positivePatterns: [
      /piscina\s+privativa/i,
      /piscina\s+exclusiva/i,
      /piscina\s+(s[oó]|s[oó]\s+nossa|s[oó]\s+para\s+a\s+gente|da\s+casa)/i,
      /n[aã]o\s+[eé]\s+compartilhada/i
    ],
    negativePatterns: [
      /piscina\s+(do\s+condom[ií]nio|compartilhada|coletiva)/i
    ]
  },

  // 2. COZINHA & ELETROS ESPECÍFICOS
  kitchen_airfryer: {
    id: "kitchen_airfryer",
    category: "Cozinha & Gourmet",
    label: "Fritadeira Elétrica (Airfryer)",
    description: "Presença de Airfryer para preparo prático de refeições",
    officialKeys: ["Air fryer", "Fritadeira elétrica", "Airfryer"],
    positivePatterns: [
      /air\s*fryer/i,
      /airfryer/i,
      /fritadeira\s+el[eé]trica/i,
      /fritadeira\s+sem\s+[oó]leo/i
    ],
    negativePatterns: [
      /n[aã]o\s+tem\s+air\s*fryer/i,
      /sentimos\s+falta\s+de\s+uma\s+air\s*fryer/i,
      /air\s*fryer\s+(estava\s+)?(quebrada|estragada|suja)/i
    ]
  },

  kitchen_coffee: {
    id: "kitchen_coffee",
    category: "Cozinha & Gourmet",
    label: "Cafeteira de Cápsula / Especial",
    description: "Cafeteira Nespresso, Dolce Gusto, Três Corações ou expresso",
    officialKeys: ["Cafeteira", "Máquina de café expresso", "Coffee maker", "Nespresso"],
    positivePatterns: [
      /nespresso/i,
      /dolce\s+gusto/i,
      /tr[eê]s\s+cora[çc][oõ]es/i,
      /m[aá]quina\s+de\s+caf[eé]\s+expresso/i,
      /cafeteira\s+(de\s+c[aá]psula|italiana|francesa|expresso)/i,
      /c[aá]psulas\s+de\s+caf[eé]/i
    ],
    negativePatterns: [
      /apenas\s+coador\s+de\s+pano/i,
      /cafeteira\s+(n[aã]o\s+funcionava|estava\s+sem\s+pe[çc]a)/i
    ],
    detailsExtractor: (text) => {
      if (/nespresso/i.test(text)) return "Nespresso";
      if (/dolce\s+gusto/i.test(text)) return "Dolce Gusto";
      if (/tr[eê]s\s+cora/i.test(text)) return "Três Corações";
      if (/italiana|moka/i.test(text)) return "Cafeteira Italiana / Moka";
      return "Cafeteira Expresso / Cápsula";
    }
  },

  kitchen_dishwasher: {
    id: "kitchen_dishwasher",
    category: "Cozinha & Gourmet",
    label: "Máquina Lava-Louças",
    description: "Lava-louças para facilidade e comodidade na estadia",
    officialKeys: ["Lava-louças", "Dishwasher", "Máquina de lavar louça"],
    positivePatterns: [
      /lava[- ]lou[çc]as/i,
      /m[aá]quina\s+de\s+lavar\s+lou[çc]a/i,
      /dishwasher/i
    ],
    negativePatterns: [
      /lava[- ]lou[çc]as\s+(n[aã]o\s+funcionava|quebrada)/i,
      /n[aã]o\s+tinha\s+lava[- ]lou[çc]as/i
    ]
  },

  kitchen_complete_utensils: {
    id: "kitchen_complete_utensils",
    category: "Cozinha & Gourmet",
    label: "Utensílios & Taças Completas",
    description: "Taças de vinho/champagne, tábua de corte, facas afiadas e panelas de qualidade",
    officialKeys: ["Utensílios de cozinha", "Taças de vinho", "Cooking basics", "Wine glasses"],
    positivePatterns: [
      /ta[çc]as\s+de\s+vinho/i,
      /ta[çc]as\s+de\s+champagne/i,
      /cozinha\s+(muito\s+)?(completa|equipada|super\s+equipada|maravilhosa)/i,
      /panelas\s+(novas|antiaderentes|de\s+[oó]tima\s+qualidade|tramontina)/i,
      /abridor\s+de\s+vinho/i,
      /liquidificador|batedeira|sanduicheira|torradeira/i
    ],
    negativePatterns: [
      /panelas\s+(velhas|queimadas|poucas)/i,
      /cozinha\s+(incompleta|b[aá]sica\s+demais|faltava\s+utens[ií]lio)/i,
      /sem\s+ta[çc]as\s+de\s+vinho/i,
      /facas\s+sem\s+corte/i
    ]
  },

  bbq_grill: {
    id: "bbq_grill",
    category: "Cozinha & Gourmet",
    label: "Churrasqueira Completa",
    description: "Churrasqueira privativa com grelha, espetos e área gourmet",
    officialKeys: ["Churrasqueira", "Grelha para churrasco", "Barbecue utensils", "Espaço gourmet"],
    positivePatterns: [
      /churrasqueira\s+(privativa|gourmet|na\s+varanda|ótima)/i,
      /[aá]rea\s+de\s+churrasco/i,
      /espetos\s+e\s+grelha/i,
      /fizemos\s+um\s+churrasco/i
    ],
    negativePatterns: [
      /churrasqueira\s+suja/i,
      /churrasqueira\s+(n[aã]o\s+pode\s+usar|cobram\s+taxa)/i
    ]
  },

  // 3. CONFORTO, CLIMATIZAÇÃO & DORMITÓRIOS
  ac_all_rooms: {
    id: "ac_all_rooms",
    category: "Conforto & Climatização",
    label: "Ar-Condicionado em Todos os Quartos",
    description: "Ar-condicionado split em todas as suítes/dormitórios e sala",
    officialKeys: ["Ar-condicionado", "Air conditioning", "Climatização"],
    positivePatterns: [
      /ar[- ]condicionado\s+em\s+(todos\s+os\s+quartos|todas\s+as\s+su[ií]tes|todo\s+o\s+im[oó]vel)/i,
      /ar[- ]condicionado\s+split\s+(em\s+tudo|gelando\s+muito)/i,
      /todos\s+os\s+c[oô]modos\s+com\s+ar/i,
      /climatiza[çc][aã]o\s+perfeita/i
    ],
    negativePatterns: [
      /ar[- ]condicionado\s+apenas\s+na\s+sala/i,
      /ar[- ]condicionado\s+apenas\s+no\s+quarto\s+principal/i,
      /ar[- ]condicionado\s+(barulhento|pingando|n[aã]o\s+gelava|estragado|com\s+cheiro)/i,
      /sem\s+ar[- ]condicionado\s+nos\s+outros\s+quartos/i
    ]
  },

  heating_fireplace: {
    id: "heating_fireplace",
    category: "Conforto & Climatização",
    label: "Lareira / Calefação",
    description: "Lareira interna a lenha/ecológica ou aquecedores potentes de ambiente",
    officialKeys: ["Lareira", "Lareira interna", "Aquecimento central", "Indoor fireplace", "Heating"],
    positivePatterns: [
      /lareira\s+(a\s+lenha|ecol[oó]gica|quentinha|aconchegante)/i,
      /calefa[çc][aã]o/i,
      /aquecedor\s+(em\s+todos\s+os\s+quartos|a\s+[oó]leo|el[eé]trico\s+forte)/i,
      /lenha\s+dispon[ií]vel/i,
      /casa\s+super\s+quentinha\s+no\s+inverno/i
    ],
    negativePatterns: [
      /casa\s+(muito\s+)?gelada/i,
      /aquecedor\s+(fraco|n[aã]o\s+deu\s+conta|quebrado)/i,
      /cobram\s+pela\s+lenha/i
    ]
  },

  blackout_curtains: {
    id: "blackout_curtains",
    category: "Conforto & Climatização",
    label: "Cortinas Blackout / Silêncio",
    description: "Quartos escuros para dormir bem sem claridade matinal",
    officialKeys: ["Cortinas blackout", "Room-darkening shades"],
    positivePatterns: [
      /blackout/i,
      /persiana\s+integrada/i,
      /cortina\s+(escura|black\s*out|bloqueia\s+a\s+luz)/i,
      /quarto\s+(bem\s+escuro|vedado)/i
    ],
    negativePatterns: [
      /entra\s+muita\s+claridade\s+de\s+manh[aã]/i,
      /sem\s+blackout/i,
      /cortina\s+fina\s+demais/i
    ]
  },

  // 4. TRABALHO REMOTO & CONECTIVIDADE
  fast_wifi: {
    id: "fast_wifi",
    category: "Home Office & Internet",
    label: "Wi-Fi Rápido e Estável (Mbps)",
    description: "Conexão de alta velocidade testada para chamadas de vídeo e trabalho",
    officialKeys: ["Wi-Fi", "Wi-Fi rápido", "Fast wifi", "Internet de alta velocidade"],
    positivePatterns: [
      /wi[- ]?fi\s+(super\s+r[aá]pido|excelente|[oó]timo|est[aá]vel|perfeito|de\s+fibra)/i,
      /internet\s+(de\s+fibra|r[aá]pida|n[aã]o\s+caiu)/i,
      /fiz\s+(v[aá]rias\s+)?(reuni[oõ]es|calls|v[ií]deochamadas)\s+sem\s+travar/i,
      /\b(100|200|300|400|500|600|700|800|900|1000)\s*(mbps|megas|mega)\b/i,
      /trabalhei\s+remotamente\s+(tranquilo|perfeitamente)/i
    ],
    negativePatterns: [
      /wi[- ]?fi\s+(muito\s+lento|inst[aá]vel|caindo|n[aã]o\s+pegava|ruim)/i,
      /internet\s+(n[aã]o\s+funcionou|lenta|horr[ií]vel)/i,
      /n[aã]o\s+d[aá]\s+para\s+fazer\s+reuni[oõ]es/i,
      /sinal\s+n[aã]o\s+chega\s+nos\s+quartos/i
    ]
  },

  dedicated_workspace: {
    id: "dedicated_workspace",
    category: "Home Office & Internet",
    label: "Espaço Dedicado de Trabalho",
    description: "Mesa, escrivaninha apropriada e cadeira confortável para notebook",
    officialKeys: ["Espaço de trabalho exclusivo", "Dedicated workspace", "Mesa de trabalho"],
    positivePatterns: [
      /espa[çc]o\s+de\s+trabalho/i,
      /mesa\s+para\s+(trabalho|notebook|home\s*office|escrit[oó]rio)/i,
      /escrivaninha/i,
      /cadeira\s+(ergon[oô]mica|confort[aá]vel\s+para\s+trabalhar)/i
    ],
    negativePatterns: [
      /sem\s+mesa\s+para\s+trabalhar/i,
      /cadeira\s+desconfort[aá]vel/i
    ]
  },

  // 5. FAMÍLIA, CRIANÇAS & PETS
  kids_safety: {
    id: "kids_safety",
    category: "Família & Pets",
    label: "Proteção / Segurança para Crianças",
    description: "Rede de proteção em sacadas/janelas, berço ou cerca na piscina",
    officialKeys: ["Berço", "Crib", "Grades de proteção", "Tela de proteção", "Adequado para crianças"],
    positivePatterns: [
      /rede\s+de\s+prote[çc][aã]o/i,
      /tela\s+de\s+prote[çc][aã]o\s+(nas\s+janelas|na\s+sacada)/i,
      /cerca\s+na\s+piscina/i,
      /ber[çc]o\s+(port[aá]til|dispon[ií]vel|chiqueirinho)/i,
      /banheira\s+de\s+beb[eê]/i,
      /cadeir[aã]o\s+de\s+alimenta[çc][aã]o/i,
      /muito\s+seguro\s+para\s+crian[çc]as/i
    ],
    negativePatterns: [
      /sem\s+rede\s+de\s+prote[çc][aã]o/i,
      /perigoso\s+para\s+crian[çc]as/i,
      /escada\s+sem\s+corrim[aã]o\s+ou\s+grade/i,
      /piscina\s+sem\s+nenhuma\s+prote[çc][aã]o/i
    ]
  },

  pet_friendly: {
    id: "pet_friendly",
    category: "Família & Pets",
    label: "Aceita Pets com Estrutura",
    description: "Quintal cercado e regras amigáveis para animais de estimação",
    officialKeys: ["Permite animais de estimação", "Pets allowed", "Aceita pets"],
    positivePatterns: [
      /quintal\s+fechado|quintal\s+cercado/i,
      /meu\s+cachorro\s+adorou/i,
      /espa[çc]o\s+para\s+pets/i,
      /amig[aá]vel\s+para\s+animais/i
    ],
    negativePatterns: [
      /cobram\s+taxa\s+abusiva\s+para\s+pet/i,
      /quintal\s+n[aã]o\s+[eé]\s+cercado\s+e\s+o\s+pet\s+pode\s+fugir/i
    ]
  },

  // 6. AMBIENTE & TRANQUILIDADE
  quiet_environment: {
    id: "quiet_environment",
    category: "Localização & Silêncio",
    label: "Local Tranquilo & Silencioso",
    description: "Ausência de barulho de rua, obras ou vizinhos barulhentos",
    officialKeys: ["Localização tranquila", "Área residencial"],
    positivePatterns: [
      /lugar\s+(muito\s+)?(tranquilo|silencioso|calmo|sossegado|paz)/i,
      /dormimos\s+(muito\s+bem|sem\s+nenhum\s+barulho)/i,
      /vista\s+para\s+a\s+natureza/i,
      /som\s+dos\s+p[aá]ssaros/i
    ],
    negativePatterns: [
      /muito\s+barulho\s+(de\s+rua|de\s+tr[aâ]nsito|de\s+vizinhos|de\s+obra)/i,
      /barulhento/i,
      /imposs[ií]vel\s+dormir/i,
      /m[uú]sica\s+alta\s+da\s+vizinhan[çc]a/i,
      /rua\s+movimentada/i
    ]
  }
};

/**
 * Default search profiles for quick switching
 */
export const DEFAULT_PROFILES = [
  {
    id: "piscina_lazer",
    name: "🌊 Lazer Máximo & Piscina Aquecida",
    description: "Foco em relaxamento, piscina quente confirmada, hidromassagem e churrasco.",
    criteria: [
      { id: "pool_heated", weight: 3, required: true },
      { id: "pool_private", weight: 2, required: false },
      { id: "bbq_grill", weight: 2, required: false },
      { id: "ac_all_rooms", weight: 1, required: false },
      { id: "quiet_environment", weight: 1, required: false }
    ]
  },
  {
    id: "gourmet_culinaria",
    name: "🍳 Gourmet, Cozinha Completa & Airfryer",
    description: "Foco em quem ama cozinhar: airfryer, cafeteira especial, taças de vinho e lava-louças.",
    criteria: [
      { id: "kitchen_airfryer", weight: 3, required: true },
      { id: "kitchen_complete_utensils", weight: 2, required: true },
      { id: "kitchen_coffee", weight: 2, required: false },
      { id: "kitchen_dishwasher", weight: 2, required: false },
      { id: "bbq_grill", weight: 1, required: false }
    ]
  },
  {
    id: "home_office",
    name: "💻 Home Office & Produtividade",
    description: "Internet rápida estável testada em reuniões, espaço de trabalho e silêncio.",
    criteria: [
      { id: "fast_wifi", weight: 3, required: true },
      { id: "dedicated_workspace", weight: 2, required: true },
      { id: "quiet_environment", weight: 2, required: false },
      { id: "ac_all_rooms", weight: 1, required: false },
      { id: "kitchen_coffee", weight: 1, required: false }
    ]
  },
  {
    id: "familia_criancas",
    name: "👶 Família com Crianças & Segurança",
    description: "Proteção nas janelas/piscina, berço, ar-condicionado em tudo e blackout.",
    criteria: [
      { id: "kids_safety", weight: 3, required: true },
      { id: "ac_all_rooms", weight: 2, required: true },
      { id: "blackout_curtains", weight: 2, required: false },
      { id: "kitchen_airfryer", weight: 1, required: false },
      { id: "quiet_environment", weight: 1, required: false }
    ]
  }
];
