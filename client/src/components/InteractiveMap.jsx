import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Star, ShieldCheck, MapPin, ExternalLink, Sparkles } from "lucide-react";

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
      padding: 4px 8px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 800;
      font-family: 'Plus Jakarta Sans', sans-serif;
      border: 2px solid ${borderColor};
      box-shadow: 0 4px 12px rgba(0,0,0,0.5);
      cursor: pointer;
      white-space: nowrap;
      display: flex;
      align-items: center;
      gap: 4px;
      transform: translate(-50%, -50%);
    ">
      <span>R$ ${price}</span>
      <span style="font-size: 9px; opacity: 0.8;">• ${matchScore}%</span>
    </div>
  `;

  return L.divIcon({
    html,
    className: "custom-price-marker",
    iconSize: [80, 30],
    iconAnchor: [40, 15]
  });
}

export function InteractiveMap({
  listings,
  centerLocation,
  onInspectListing
}) {
  const defaultLat = centerLocation?.lat || listings[0]?.lat || -22.6125;
  const defaultLng = centerLocation?.lng || listings[0]?.lng || -46.7022;

  const validListings = listings.filter((l) => l.lat && l.lng);

  return (
    <div className="w-full h-full min-h-[420px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl relative bg-slate-950">
      <MapContainer
        center={[defaultLat, defaultLng]}
        zoom={13}
        scrollWheelZoom={false}
        className="w-full h-full z-10"
        style={{ minHeight: "420px", height: "100%" }}
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
            >
              <Popup className="custom-leaflet-popup">
                <div className="w-64 p-1 text-slate-900 font-sans">
                  <div className="relative h-28 rounded-xl overflow-hidden mb-2 bg-slate-100">
                    <img
                      src={listing.images?.[0]}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-950/80 text-white text-[10px] font-bold">
                      R$ {listing.pricePerNight} / noite
                    </div>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                    {listing.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {listing.location}
                  </p>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200 text-xs">
                    <div className="flex items-center space-x-1 font-bold text-amber-500 text-[11px]">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{listing.rating?.toFixed(2)}</span>
                    </div>

                    <span className="text-[11px] font-black text-rose-600">
                      {matchScore}% Match
                    </span>
                  </div>

                  <button
                    onClick={() => onInspectListing && onInspectListing("pool_heated", listing)}
                    className="w-full mt-2.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-lg transition"
                  >
                    Auditar Comodidades
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Floating Map Legend */}
      <div className="absolute bottom-3 left-3 z-20 px-3 py-1.5 bg-slate-950/90 backdrop-blur-md rounded-xl border border-slate-800 text-[11px] text-slate-300 flex items-center space-x-2 shadow-lg pointer-events-none">
        <MapPin className="w-3.5 h-3.5 text-rose-500" />
        <span>{validListings.length} acomodações mapeadas</span>
      </div>
    </div>
  );
}
