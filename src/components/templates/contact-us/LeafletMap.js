'use client';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

export default function LeafletMap({ center, position, children }) {
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    const L = require('leaflet');
    const customIcon = new L.Icon({
      iconUrl: markerIconPng,
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    setIcon(customIcon);
  }, []);

  if (!icon) {
    return (
      <>
        <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-md" aria-label="Map loading" />
        <div className="mt-4">{children}</div>
      </>
    );
  }

  return (
    <div>
      <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-md">
        <MapContainer center={center} zoom={13} scrollWheelZoom={false} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={icon}>
            <Popup>Next Coffee</Popup>
          </Marker>
        </MapContainer>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}