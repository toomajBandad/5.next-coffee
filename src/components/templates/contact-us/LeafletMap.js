"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// 🔧 Patch Leaflet's default icon paths using public assets
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: "/leafletImg/marker-icon.png",         // Standard icon
  iconRetinaUrl: "/leafletImg/marker-icon-2x.png", // High-res icon
  shadowUrl: "/leafletImg/marker-shadow.png",
});


export default function LeafletMap({ center, position, children }) {
  const [marker, setMarker] = useState(position);

  useEffect(() => {
    setMarker(position);
  }, [position]);

  return (
    <div>
      <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-md">
        <MapContainer
          center={center}
          zoom={16}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={marker}>
            <Popup>Next</Popup>
          </Marker>
        </MapContainer>
      </div>
      <div className="bg-white px-4 py-3 rounded-none shadow text-center text-sm text-gray-700">
        {children}
      </div>
    </div>
  );
}