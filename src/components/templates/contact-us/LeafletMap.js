"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "@images/leaflet/marker-icon.png";
import markerShadow from "@images/leaflet/marker-shadow.png";

export default function LeafletMap({ center, position, children }) {
  const defaultIcon = new L.Icon({
    iconUrl: markerIconPng,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

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
            attribution="&copy; CartoDB"
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={defaultIcon}>
            <Popup>Next Coffee</Popup>
          </Marker>
        </MapContainer>
      </div>
      <div className="bg-white px-4 py-3 rounded-none shadow text-center text-sm text-gray-700">
        {children}
      </div>
    </div>
  );
}
