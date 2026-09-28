import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Star, ShieldCheck, MapPin, ExternalLink, Sparkles, Eye, Info } from "lucide-react";

// Fix for default Leaflet marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

// Helper component to auto-pan and zoom map when center coordinates change
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.setView(center, zoom, { animate: true, duration: 1 });
    }
  }, [center, zoom, map]);
  return null;
}

// Create custom price pill HTML marker
function createPriceMarker(price, matchScore, isTopPick) {
  const isHighMatch = matchScore >= 80;
  const bgColor = isTopPick ? "#FF385C" : isHighMatch ? "#0F172A" : "#1E293B";
  const borderColor = isTopPick ? "#FFF" : isHighMatch ? "#10B981" : "#64748B";

  const html = `
    <div style="
      background: ${bgColor};
      color: #FFFFFF;
      padding: 5px 9px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 800;
      font-family: 'Plus Jakarta Sans', sans-serif;
      border: 2px solid ${borderColor};
      box-shadow: 0 4px 14px rgba(0,0,0,0.55);
      cursor: pointer;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 4px;
      transform: translate(-50%, -50%);
      transition: transform 0.2s;
    ">
      <span>R$ ${price}</span>
      <span style="font-size: 9px; opacity: 0.85;">• ${matchScore}%</span>
    </div>
  `;

  return L.divIcon({
    html,
    className: "custom-price-marker",
    iconSize: [84, 32],
    iconAnchor: [42, 16]
  });
}

export function InteractiveMap({
  listings,
  centerLocation,
  onSelectListing,
  onInspectListing
}) {
  const defaultLat = centerLocation?.lat || listings[0]?.lat || -22.6125;
  const defaultLng = centerLocation?.lng || listings[0]?.lng || -46.7022;

  const validListings = listings.filter((l) => l.lat && l.lng);

  return (
    <div className="w-full h-full min-h-[440px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative bg-slate-950">
      <MapContainer
        center={[defaultLat, defaultLng]}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full z-10"
        style={{ minHeight: "440px", height: "100%" }}
      >
        <ChangeView center={[defaultLat, defaultLng]} zoom={13} />

        {/* Dark Modern Map Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Listing Markers */}
        {validListings.map((listing, idx) => {
          const isTop = idx === 0;
          const matchScore = listing.match?.matchScore || 85;
          const markerIcon = createPriceMarker(listing.pricePerNight, matchScore, isTop);

          return (
            <Marker
              key={listing.id}
              position={[listing.lat, listing.lng]}
              icon={markerIcon}
              eventHandlers={{
                click: () => {
                  if (onSelectListing) {
                    onSelectListing(listing);
                  }
                }
              }}
            >
              <Popup className="custom-leaflet-popup">
                <div className="w-68 p-1 text-slate-900 font-sans">
                  <div
                    onClick={() => onSelectListing && onSelectListing(listing)}
                    className="relative h-32 rounded-xl overflow-hidden mb-2.5 bg-slate-100 cursor-pointer group"
                  >
                    <img
                      src={listing.images?.[0]}
                      alt={listing.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-slate-950/85 text-white text-[11px] font-extrabold">
                      R$ {listing.pricePerNight} / noite
                    </div>
                    {listing.superhost && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black">
                        ★ Superhost
                      </div>
                    )}
                  </div>

                  <h4
                    onClick={() => onSelectListing && onSelectListing(listing)}
                    className="text-xs font-extrabold text-slate-900 line-clamp-2 leading-snug hover:text-rose-600 transition cursor-pointer"
                  >
                    {listing.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {listing.neighborhood ? `${listing.neighborhood}, ` : ""}{listing.location}
                  </p>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200 text-xs">
                    <div className="flex items-center space-x-1 font-bold text-amber-500 text-[11px]">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{listing.rating?.toFixed(2)}</span>
                      <span className="text-[10px] text-slate-400">({listing.reviewCount})</span>
                    </div>

                    <span className="text-[11px] font-black text-rose-600">
                      {matchScore}% Match
                    </span>
                  </div>

                  {/* Open Details Action Button */}
                  <div className="mt-3 flex items-center space-x-1.5">
                    <button
                      type="button"
                      onClick={() => onSelectListing && onSelectListing(listing)}
                      className="flex-1 py-2 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white text-xs font-extrabold rounded-xl transition shadow-md shadow-rose-600/20 flex items-center justify-center space-x-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ver Informações</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onInspectListing && onInspectListing("pool_heated", listing)}
                      title="Auditar Comodidades"
                      className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Floating Map Legend */}
      <div className="absolute bottom-3 left-3 z-20 px-3.5 py-2 bg-slate-950/90 backdrop-blur-md rounded-2xl border border-slate-800 text-[11px] text-slate-300 flex items-center space-x-2 shadow-xl pointer-events-none">
        <MapPin className="w-3.5 h-3.5 text-rose-500" />
        <span>
          <strong>{validListings.length}</strong> acomodações mapeadas • Clique no marcador para abrir detalhes
        </span>
      </div>
    </div>
  );
}
