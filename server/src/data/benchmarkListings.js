/**
 * High-fidelity dataset of Airbnb listings with geographic metadata (state, city, environment, coordinates, neighborhood, CEP)
 * covering Beaches (Praia), Mountains/Countryside (Campo/Serra), and Urban destinations.
 */

export const BENCHMARK_LISTINGS = [
  // 1. CAMPO & SERRA - SERRA NEGRA (SP) - CHALÉ MIRANTE
  {
    id: "airbnb_serra_negra_chale_montanha",
    url: "https://www.airbnb.com.br/rooms/11928374",
    title: "Chalé Mirante da Serra Negra - Piscina Aquecida & Lareira",
    location: "Refúgio da Serra, Serra Negra - SP",
    state: "SP",
    city: "Serra Negra",
    neighborhood: "Refúgio da Serra",
    cep: "13930-000",
    lat: -22.6085,
    lng: -46.7092,
    environment: "mountain",
    type: "Chalé de montanha inteiro",
    superhost: true,
    rating: 4.97,
    reviewCount: 56,
    pricePerNight: 780,
    cleaningFee: 160,
    capacity: { guests: 6, bedrooms: 2, beds: 4, baths: 2 },
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
    ],
    officialAmenities: [
      "Piscina privativa",
      "Piscina aquecida",
      "Lareira",
      "Wi-Fi",
      "Cozinha completa",
      "Churrasqueira",
      "Permite animais de estimação"
    ],
    hostDescription: `
      Desfrute da tranquilidade e do ar puro de Serra Negra no Circuito das Águas Paulista!
      - Piscina privativa com aquecimento por bomba de calor elétrica (mantém a água a 30°C o ano todo).
      - Lareira aconchegante na sala de estar (disponibilizamos cesto de lenha como cortesia).
      - Cozinha equipada com Fritadeira Airfryer Mondial 5L, Cafeteira Nespresso, micro-ondas, taças de vinho e churrasqueira na varanda.
      - 2 dormitórios com ar-condicionado quente e frio e cortinas blackout.
      - Wi-Fi Fibra Óptica de 300 Mbps e quintal cercado ideal para pets.
    `,
    guestReviews: [
      {
        id: "rev_sn_101",
        author: "Rodrigo Alcantara",
        date: "Fevereiro de 2026",
        rating: 5,
        text: "Passamos um fim de semana maravilhoso em Serra Negra! A piscina aquecida foi perfeita para as crianças mesmo à noite quando a temperatura caiu na serra. Usamos a airfryer para os petiscos e a lareira à noite."
      },
      {
        id: "rev_sn_102",
        author: "Vanessa Toledo",
        date: "Janeiro de 2026",
        rating: 5,
        text: "Casa impecável com vista linda para as montanhas de Serra Negra. Internet rápida de 300 megas estável e nosso cachorro adorou o quintal todo cercado."
      }
    ]
  },

  // 2. CAMPO & SERRA - SERRA NEGRA (SP) - SÍTIO GOURMET
  {
    id: "airbnb_serra_negra_sitio_gourmet",
    url: "https://www.airbnb.com.br/rooms/12839401",
    title: "Sítio Vale Verde Serra Negra - Piscina Aquecida, Hidro & Espaço Gourmet",
    location: "Bairro das Posses, Serra Negra - SP",
    state: "SP",
    city: "Serra Negra",
    neighborhood: "Bairro das Posses",
    cep: "13930-000",
    lat: -22.6180,
    lng: -46.6980,
    environment: "mountain",
    type: "Sítio inteiro",
    superhost: true,
    rating: 4.93,
    reviewCount: 42,
    pricePerNight: 920,
    cleaningFee: 200,
    capacity: { guests: 10, bedrooms: 4, beds: 7, baths: 4 },
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=1200&q=80"
    ],
    officialAmenities: [
      "Piscina privativa",
      "Piscina aquecida",
      "Banheira de hidromassagem",
      "Churrasqueira",
      "Cozinha completa",
      "Wi-Fi"
    ],
    hostDescription: `
      Sítio cinematográfico em Serra Negra cercado pela natureza.
      - Área de lazer completa com piscina aquecida privativa e hidromassagem aquecida a gás.
      - Espaço gourmet com churrasqueira, forno a lenha para pizza, cervejeira e bancada.
      - Cozinha completa com Airfryer digital, lava-louças, liquidificador e cafeteira.
      - 4 suítes climatizadas e sala ampla com lareira.
    `,
    guestReviews: [
      {
        id: "rev_sn_201",
        author: "Felipe Nogueira",
        date: "Janeiro de 2026",
        rating: 5,
        text: "Melhor sítio em Serra Negra! A piscina com hidro aquecida estava sensacional, fizemos pizza no forno a lenha e o espaço gourmet tem tudo."
      }
    ]
  },

  // 3. PRAIA & LITORAL - UBATUBA (SP)
  {
    id: "airbnb_ubatuba_villa_sol",
    url: "https://www.airbnb.com.br/rooms/10849201",
    title: "Villa Solarium Ubatuba - Piscina Aquecida & Gourmet Completo",
    location: "Praia Grande, Ubatuba - SP",
    state: "SP",
    city: "Ubatuba",
    neighborhood: "Praia Grande",
    cep: "11680-000",
    lat: -23.4682,
    lng: -45.0664,
    environment: "beach",
    type: "Casa inteira",
    superhost: true,
    rating: 4.96,
    reviewCount: 48,
    pricePerNight: 850,
    cleaningFee: 180,
    capacity: { guests: 8, bedrooms: 3, beds: 5, baths: 3 },
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80"
    ],
    officialAmenities: [
      "Piscina privativa",
      "Piscina aquecida",
      "Wi-Fi",
      "Ar-condicionado",
      "Cozinha completa",
      "Churrasqueira",
      "Permite animais de estimação"
    ],
    hostDescription: `
      Sejam bem-vindos à Villa Solarium em Ubatuba!
      - Piscina aquecida privativa por bomba de calor elétrica (água a 30°C mesmo em dias nublados).
      - Cozinha super completa com Airfryer Mondial 5L, Cafeteira Nespresso e lava-louças Electrolux.
      - 3 suítes amplas com ar-condicionado split potente e cortinas blackout.
      - Internet Fibra Óptica de 400 Mbps.
      - Quintal cercado para pets e área gourmet completa.
    `,
    guestReviews: [
      {
        id: "rev_101",
        author: "Mariana Silva",
        date: "Fevereiro de 2026",
        rating: 5,
        text: "A piscina aquecida foi o ponto alto da viagem, meus filhos ficaram nela até às 22h pois a água estava bem quentinha! A cozinha tem de tudo, usamos a airfryer todos os dias."
      },
      {
        id: "rev_102",
        author: "Carlos Eduardo",
        date: "Janeiro de 2026",
        rating: 5,
        text: "Wi-Fi de 400 mega de fibra voou, fiz reuniões com vídeo. Ar condicionado em todos os quartos e cafeteira Nespresso excelente."
      }
    ]
  },

  // 4. CAMPO & SERRA - GRAMADO (RS)
  {
    id: "airbnb_gramado_chalet_luxo",
    url: "https://www.airbnb.com.br/rooms/20938492",
    title: "Chalé Suíço Gramado - Hidromassagem Aquecida & Lareira",
    location: "Planalto, Gramado - RS",
    state: "RS",
    city: "Gramado",
    neighborhood: "Planalto",
    cep: "95670-000",
    lat: -29.3820,
    lng: -50.8745,
    environment: "mountain",
    type: "Chalé inteiro",
    superhost: true,
    rating: 4.92,
    reviewCount: 64,
    pricePerNight: 980,
    cleaningFee: 200,
    capacity: { guests: 6, bedrooms: 2, beds: 3, baths: 2 },
    images: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80"
    ],
    officialAmenities: [
      "Banheira de hidromassagem",
      "Lareira interna",
      "Aquecimento central",
      "Wi-Fi",
      "Cozinha",
      "Cortinas blackout"
    ],
    hostDescription: `
      Romance e aconchego na serra gaúcha!
      - Banheira de hidromassagem dupla aquecida a gás.
      - Lareira interna a lenha e calefação em todos os ambientes.
      - Cozinha compacta com cafeteira Dolce Gusto, torradeira e cooktop. (Obs: Não dispõe de Airfryer nem forno).
      - Internet Wi-Fi 300 Mbps e cortinas blackout 100%.
    `,
    guestReviews: [
      {
        id: "rev_201",
        author: "Fernanda Lima",
        date: "Julho de 2026",
        rating: 5,
        text: "Perfeito para o inverno de Gramado! A hidromassagem aquecida é surreal de boa, água muito quente e relaxante."
      },
      {
        id: "rev_202",
        author: "Lucas Prado",
        date: "Maio de 2026",
        rating: 4,
        text: "O lugar é um charme! Apenas sentimos falta de uma airfryer na cozinha, mas o aquecimento e lareira são ótimos."
      }
    ]
  },

  // 5. CAMPO & SERRA - CAMPOS DO JORDÃO (SP)
  {
    id: "airbnb_campos_reserva_alto",
    url: "https://www.airbnb.com.br/rooms/30192847",
    title: "Reserva do Alto - Casa Moderna com Piscina & Vista Panorâmica",
    location: "Alto Capivari, Campos do Jordão - SP",
    state: "SP",
    city: "Campos do Jordão",
    neighborhood: "Alto Capivari",
    cep: "12460-000",
    lat: -22.7150,
    lng: -45.5780,
    environment: "mountain",
    type: "Casa de campo inteira",
    superhost: false,
    rating: 4.65,
    reviewCount: 32,
    pricePerNight: 1200,
    cleaningFee: 250,
    capacity: { guests: 10, bedrooms: 4, beds: 6, baths: 4 },
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    ],
    officialAmenities: [
      "Piscina",
      "Piscina aquecida",
      "Lareira",
      "Cozinha completa",
      "Wi-Fi",
      "Churrasqueira"
    ],
    hostDescription: `
      Magnífica residência com vista para as montanhas de Campos do Jordão.
      - Piscina de borda infinita com placas de aquecimento solar.
      - Cozinha gourmet americana com airfryer e lava-louças.
      - Lareira central e churrasqueira no deck panorâmico.
    `,
    guestReviews: [
      {
        id: "rev_301",
        author: "Rodrigo Antunes",
        date: "Janeiro de 2026",
        rating: 4,
        text: "Como pegamos dias nublados, o aquecimento solar da piscina não deu conta e a água estava muito fria para entrar. A cozinha com airfryer é ótima."
      }
    ]
  },

  // 6. PRAIA & LITORAL - FLORIANÓPOLIS (SC)
  {
    id: "airbnb_floripa_beach_loft",
    url: "https://www.airbnb.com.br/rooms/40582910",
    title: "Design Loft Jurerê Internacional - Pé na Areia & Gourmet",
    location: "Jurerê Internacional, Florianópolis - SC",
    state: "SC",
    city: "Florianópolis",
    neighborhood: "Jurerê Internacional",
    cep: "88053-300",
    lat: -27.4428,
    lng: -48.4983,
    environment: "beach",
    type: "Apartamento inteiro",
    superhost: true,
    rating: 4.98,
    reviewCount: 89,
    pricePerNight: 720,
    cleaningFee: 160,
    capacity: { guests: 4, bedrooms: 2, beds: 2, baths: 2 },
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
    ],
    officialAmenities: [
      "Acesso à praia",
      "Ar-condicionado",
      "Wi-Fi de alta velocidade",
      "Cozinha completa",
      "Espaço de trabalho exclusivo"
    ],
    hostDescription: `
      Apartamento de alto padrão a 50 metros da praia de Jurerê.
      - Cozinha com Airfryer digital Philips Walita, Nespresso, taças de vinho e lava-louças.
      - Home office com cadeira ergonômica e internet de 600 Mbps fibra.
      - Ar-condicionado silencioso e redes de proteção nas janelas.
    `,
    guestReviews: [
      {
        id: "rev_401",
        author: "Gustavo Franco",
        date: "Fevereiro de 2026",
        rating: 5,
        text: "Melhor Airbnb que já fiquei! Fiz home office com 600 megas sem oscilar e a cozinha tem airfryer e taças excelentes."
      }
    ]
  },

  // 7. URBANO - SÃO PAULO (SP) - JARDINS / PINHEIROS
  {
    id: "airbnb_sp_design_pinheiros",
    url: "https://www.airbnb.com.br/rooms/80938472",
    title: "Design Studio Pinheiros / Vila Madalena - Home Office 500M & Gourmet",
    location: "Pinheiros, São Paulo - SP",
    state: "SP",
    city: "São Paulo",
    neighborhood: "Pinheiros",
    cep: "05414-001",
    lat: -23.5615,
    lng: -46.6859,
    environment: "urban",
    type: "Apartamento inteiro",
    superhost: true,
    rating: 4.94,
    reviewCount: 76,
    pricePerNight: 450,
    cleaningFee: 120,
    capacity: { guests: 3, bedrooms: 1, beds: 1, baths: 1 },
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
    ],
    officialAmenities: [
      "Wi-Fi de alta velocidade",
      "Espaço de trabalho exclusivo",
      "Ar-condicionado",
      "Cozinha completa",
      "Academia"
    ],
    hostDescription: `
      Apartamento moderno no coração de Pinheiros / Vila Madalena.
      - Home office completo com cadeira ergonômica Herman Miller e Wi-Fi de 500 Mbps Fibra.
      - Cozinha equipada com Airfryer, máquina Nespresso, taças de vinho e lava-louças.
      - Prédio com piscina aquecida no rooftop e academia completa.
      - Cortinas blackout 100% e ar-condicionado inverter silencioso.
    `,
    guestReviews: [
      {
        id: "rev_801",
        author: "Juliana Peixoto",
        date: "Janeiro de 2026",
        rating: 5,
        text: "Localização perfeita, perto dos melhores restaurantes. O home office com internet rápida foi ideal para minha semana de trabalho e a piscina no terraço é aquecida e linda."
      }
    ]
  }
];
