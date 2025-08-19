'use client';

import React, { useCallback, useState } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const libs = ['places'];
const containerStyle = { width: '100%', height: '100%' };

// initial center (change to your preferred coordinates)
const center = { lat: -1.286389, lng: 36.817223 };

export default function MapClient({setCoordinates, sites}) {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: libs,
  });

  const [markers, setMarkers] = useState([]); // {id, lat, lng, time}
  const [selected, setSelected] = useState(null);

  const onMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    const newMarker = {
      id: String(Date.now()),
      lat,
      lng,
      time: new Date().toISOString(),
    };
    setMarkers((prev) => [newMarker, ...prev]);
    setCoordinates({ lat, lng });

    // OPTIONAL: send to your backend
    // fetch('/api/points', { method: 'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({lat,lng}) })
  }, []);

  if (loadError) return <div>Map failed to load</div>;
  if (!isLoaded) return <div>Loading map…</div>;

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onClick={onMapClick}
        options={{
          fullscreenControl: true,
          streetViewControl: false,
          mapTypeControl: false,
        }}
      >
        {markers.map((m) => (
          <Marker
            key={m.id}
            position={{ lat: m.lat, lng: m.lng }}
            onClick={() => setSelected(m)}
          />
        ))}
        {sites?.map((site,index) => (
          <Marker
            key={index}
            position={{ lat: site.lat, lng: site.lng }}
            onClick={() => setSelected(site)}
            icon={{
              url: site.img, // optional: custom icon
              scaledSize: new window.google.maps.Size(32, 32),
            }}
          />
        ))}
        {selected && (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => setSelected(null)}
          >
            <div style={{ maxWidth: 220 }}>
              <div><strong>Coordinates</strong></div>
              <div>Lat: {selected.lat.toFixed(6)}</div>
              <div>Lng: {selected.lng.toFixed(6)}</div>
              <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
                Added: {new Date(selected.time).toLocaleString()}
              </div>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
