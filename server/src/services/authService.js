import { BENCHMARK_LISTINGS } from "../data/benchmarkListings.js";

/**
 * Airbnb Auth & Wishlist Session Service
 */

// In-memory sessions store
let currentUser = null;

const DEMO_AIRBNB_USER = {
  id: "user_airbnb_849201",
  name: "Lucas Mendonça",
  email: "lucas.mendonca@example.com",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
  badge: "Superguest Airbnb",
  joinedYear: "2018",
  tripsCount: 24,
  wishlists: [
    {
      id: "wl_praia_lazer",
      title: "🏖️ Férias de Verão & Piscina Aquecida",
      count: 4,
      listingIds: ["airbnb_ubatuba_villa_sol", "airbnb_floripa_beach_loft", "airbnb_ilhabela_refugio_mar", "airbnb_buzios_villa_geriba"]
    },
    {
      id: "wl_serra_inverno",
      title: "🌲 Inverno na Serra & Lareira",
      count: 3,
      listingIds: ["airbnb_gramado_chalet_luxo", "airbnb_campos_reserva_alto", "airbnb_monte_verde_cabana_pinheiros"]
    },
    {
      id: "wl_home_office",
      title: "💻 Home Office com Wi-Fi Rápido & Airfryer",
      count: 3,
      listingIds: ["airbnb_sp_design_pinheiros", "airbnb_floripa_beach_loft", "airbnb_ubatuba_villa_sol"]
    }
  ]
};

export class AuthService {
  /**
   * Get current authenticated user
   */
  static getCurrentUser() {
    return currentUser;
  }

  /**
   * Login / connect Airbnb account
   */
  static login(email = null, name = null) {
    currentUser = {
      ...DEMO_AIRBNB_USER,
      name: name || DEMO_AIRBNB_USER.name,
      email: email || DEMO_AIRBNB_USER.email,
      connectedAt: new Date().toISOString()
    };
    return currentUser;
  }

  /**
   * Logout / disconnect Airbnb account
   */
  static logout() {
    currentUser = null;
    return { success: true };
  }

  /**
   * Get user wishlists
   */
  static getWishlists() {
    if (!currentUser) return DEMO_AIRBNB_USER.wishlists;
    return currentUser.wishlists;
  }

  /**
   * Import listings from a Wishlist URL or ID
   */
  static importWishlist(wishlistUrlOrId) {
    // Check if it matches existing demo wishlists
    const existing = DEMO_AIRBNB_USER.wishlists.find(
      (w) => w.id === wishlistUrlOrId || w.title.toLowerCase().includes(wishlistUrlOrId.toLowerCase())
    );

    if (existing) {
      const matchedListings = BENCHMARK_LISTINGS.filter((l) => existing.listingIds.includes(l.id));
      return {
        wishlistTitle: existing.title,
        listings: matchedListings
      };
    }

    // Default import sample
    const sampleListings = BENCHMARK_LISTINGS.slice(0, 4);
    return {
      wishlistTitle: `Lista Importada (${wishlistUrlOrId.slice(0, 30)}...)`,
      listings: sampleListings
    };
  }
}
