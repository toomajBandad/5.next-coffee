"use client";
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

export default function LeafletMap({ center, position, children }) {
  const [marker, setmarker] = useState(position);
  const [icon, setIcon] = useState(markerIconPng);

  useEffect(() => {
    setmarker(position);

    const customIcon = new L.Icon({
      iconUrl: markerIconPng,
      iconSize: [18, 30],
    });

    setIcon(customIcon);
  }, []);

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
          <Marker position={marker} icon={icon}>
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
