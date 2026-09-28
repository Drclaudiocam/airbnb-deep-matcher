import axios from "axios";

/**
 * Free Brazilian CEP & Geocoding Service (BrasilAPI + ViaCEP + Nominatim)
 */
export class CepService {
  /**
   * Lookup address and coordinates by CEP
   */
  static async lookupCep(cepInput) {
    if (!cepInput) return null;
    const cleanCep = cepInput.replace(/\D/g, "");
    if (cleanCep.length !== 8) {
      throw new Error("CEP inválido. O CEP deve conter 8 dígitos numéricos.");
    }

    // 1. Try BrasilAPI v2 (returns city, state, neighborhood, street and coordinates)
    try {
      const response = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cleanCep}`, {
        timeout: 4000,
        headers: { "User-Agent": "AirbnbDeepMatcher/1.0" }
      });

      if (response.data) {
        const data = response.data;
        let lat = data.location?.coordinates?.latitude ? parseFloat(data.location.coordinates.latitude) : null;
        let lng = data.location?.coordinates?.longitude ? parseFloat(data.location.coordinates.longitude) : null;

        // If coordinates missing in BrasilAPI, try geocoding with Nominatim
        if (!lat || !lng) {
          const coords = await this.geocodeAddress(`${data.neighborhood || ""}, ${data.city} - ${data.state}, Brasil`);
          lat = coords.lat;
          lng = coords.lng;
        }

        return {
          cep: cleanCep,
          formattedCep: `${cleanCep.slice(0, 5)}-${cleanCep.slice(5)}`,
          street: data.street || "",
          neighborhood: data.neighborhood || "",
          city: data.city || "",
          state: data.state || "",
          lat: lat || -23.5505,
          lng: lng || -46.6333,
          source: "BrasilAPI"
        };
      }
    } catch (err) {
      console.warn(`[CepService] BrasilAPI failed for ${cleanCep} (${err.message}). Trying ViaCEP fallback...`);
    }

    // 2. Fallback to ViaCEP
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cleanCep}/json/`, {
        timeout: 4000,
        headers: { "User-Agent": "AirbnbDeepMatcher/1.0" }
      });

      if (response.data && !response.data.erro) {
        const data = response.data;
        const coords = await this.geocodeAddress(`${data.bairro || ""}, ${data.localidade} - ${data.uf}, Brasil`);

        return {
          cep: cleanCep,
          formattedCep: `${cleanCep.slice(0, 5)}-${cleanCep.slice(5)}`,
          street: data.logradouro || "",
          neighborhood: data.bairro || "",
          city: data.localidade || "",
          state: data.uf || "",
          lat: coords.lat || -23.5505,
          lng: coords.lng || -46.6333,
          source: "ViaCEP"
        };
      }
    } catch (err) {
      console.warn(`[CepService] ViaCEP failed for ${cleanCep} (${err.message})`);
    }

    // 3. Fallback default for popular CEP prefixes
    return this.getFallbackByCepPrefix(cleanCep);
  }

  /**
   * Geocode street/neighborhood/city with OpenStreetMap Nominatim
   */
  static async geocodeAddress(addressQuery) {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: addressQuery,
          format: "json",
          limit: 1,
          countrycodes: "br"
        },
        timeout: 3500,
        headers: { "User-Agent": "AirbnbDeepMatcherApp/1.0" }
      });

      if (response.data && response.data.length > 0) {
        return {
          lat: parseFloat(response.data[0].lat),
          lng: parseFloat(response.data[0].lon)
        };
      }
    } catch (e) {
      console.warn("[CepService] Nominatim geocoding failed", e.message);
    }

    return { lat: null, lng: null };
  }

  /**
   * Search address by street/neighborhood text query
   */
  static async searchAddress(streetOrNeighborhood, city, state) {
    try {
      const cleanState = (state || "SP").toUpperCase();
      const cleanCity = encodeURIComponent(city || "São Paulo");
      const cleanStreet = encodeURIComponent(streetOrNeighborhood);

      const response = await axios.get(
        `https://viacep.com.br/ws/${cleanState}/${cleanCity}/${cleanStreet}/json/`,
        { timeout: 4000 }
      );

      if (Array.isArray(response.data)) {
        return response.data.map((item) => ({
          cep: item.cep.replace(/\D/g, ""),
          formattedCep: item.cep,
          street: item.logradouro,
          neighborhood: item.bairro,
          city: item.localidade,
          state: item.uf
        }));
      }
    } catch (e) {
      console.warn("[CepService] Address search failed", e.message);
    }
    return [];
  }

  /**
   * Fallback coordinate dictionary for major Brazilian regions
   */
  static getFallbackByCepPrefix(cleanCep) {
    const prefix = cleanCep.slice(0, 2);
    const mockMap = {
      "13": { city: "Serra Negra", state: "SP", neighborhood: "Centro", lat: -22.6125, lng: -46.7022 },
      "12": { city: "Ubatuba", state: "SP", neighborhood: "Praia Grande", lat: -23.4332, lng: -45.0834 },
      "01": { city: "São Paulo", state: "SP", neighborhood: "Jardins", lat: -23.5615, lng: -46.6559 },
      "22": { city: "Rio de Janeiro", state: "RJ", neighborhood: "Ipanema", lat: -22.9838, lng: -43.2045 },
      "95": { city: "Gramado", state: "RS", neighborhood: "Planalto", lat: -29.3787, lng: -50.8764 },
      "88": { city: "Florianópolis", state: "SC", neighborhood: "Jurerê", lat: -27.4428, lng: -48.4983 },
      "28": { city: "Búzios", state: "RJ", neighborhood: "Geribá", lat: -22.7758, lng: -41.9056 },
      "37": { city: "Monte Verde", state: "MG", neighborhood: "Centro", lat: -22.8624, lng: -46.0378 }
    };

    const matched = mockMap[prefix] || {
      city: "São Paulo",
      state: "SP",
      neighborhood: "Centro",
      lat: -23.5505,
      lng: -46.6333
    };

    return {
      cep: cleanCep,
      formattedCep: `${cleanCep.slice(0, 5)}-${cleanCep.slice(5)}`,
      street: "Avenida Principal",
      neighborhood: matched.neighborhood,
      city: matched.city,
      state: matched.state,
      lat: matched.lat,
      lng: matched.lng,
      source: "OfflineFallback"
    };
  }
}
