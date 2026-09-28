import { useState } from 'react';
import L from 'leaflet';

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  ZoomControl,
  useMap,
} from 'react-leaflet';

import { Link } from 'react-router-dom';
import {
  LocateFixed,
  RotateCcw,
  Maximize2,
  Snowflake,
  MapPin,
  ExternalLink,
} from 'lucide-react';

import type { LocationSite } from '../types';
import { getExpeditionById } from '../data/mockData';

import './MapPanel.css';

export type MapDisplayLocation = LocationSite & {
  verificationStatus?: 'verified' | 'unverified';
  sourceUrl?: string;
  sourceLabel?: string;
  coordinateLabel?: string;
  mapNote?: string;
};

const typeColor: Record<LocationSite['type'], string> = {
  'Research Station': '#67e8f9',
  'Expedition Site': '#60a5fa',
  'Observation Site': '#6ee7b7',
  'Geographic Feature': '#fbbf24',
};

export default function MapPanel({
  locations,
  height = 600,
  center = [0, 0],
  zoom = 2,
}: {
  locations: MapDisplayLocation[];
  height?: number;
  center?: [number, number];
  zoom?: number;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div
      className="polar-map-shell"
      style={{ height }}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        minZoom={2}
        maxZoom={12}
        scrollWheelZoom
        zoomControl={false}
        preferCanvas={false}
        worldCopyJump
        style={{ height: '100%', width: '100%' }}
      >
        
<TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  maxZoom={19}
/>

        <ZoomControl position="bottomright" />

        <MapControls
          locations={locations}
          center={center}
          zoom={zoom}
        />

        {locations.map((location) => {
          const expedition = location.expeditionId
            ? getExpeditionById(location.expeditionId)
            : undefined;

          const selected = selectedId === location.id;
          const markerColor = typeColor[location.type];

          return (
            <CircleMarker
              key={location.id}
              center={[location.lat, location.lng]}
              radius={selected ? 10 : 7}
              pathOptions={{
                color: markerColor,
                fillColor: markerColor,
                fillOpacity: 0.95,
                weight: selected ? 3 : 2,
                className: 'polar-marker-glow',
              }}
              eventHandlers={{
                click: () => setSelectedId(location.id),
              }}
            >
              <Popup
                className="polar-map-popup"
                autoPan
                maxWidth={300}
              >
                <div className="polar-popup-card">
                  <div className="polar-popup-topline">
                    <span className="polar-popup-icon">
                      <MapPin size={16} />
                    </span>

                    <span
                      className={`polar-verification ${
                        location.verificationStatus === 'verified'
                          ? 'is-verified'
                          : 'is-unverified'
                      }`}
                    >
                      {location.verificationStatus === 'verified'
                        ? 'Verified reference'
                        : 'Unverified record'}
                    </span>
                  </div>

                  <h3 className="polar-popup-title">
                    {location.name}
                  </h3>

                  <p className="polar-popup-subtitle">
                    {location.type} · {location.region}
                  </p>

                  <p className="polar-popup-description">
                    {location.description}
                  </p>

                  {location.coordinateLabel && (
                    <div className="polar-coordinate">
                      <span>Coordinates</span>
                      <strong>{location.coordinateLabel}</strong>
                    </div>
                  )}

                  {location.mapNote && (
                    <p className="polar-map-note">
                      {location.mapNote}
                    </p>
                  )}

                  <div className="polar-popup-links">
                    {expedition && (
                      <Link
                        to={`/expeditions/${expedition.id}`}
                        className="polar-popup-link"
                      >
                        View expedition
                        <ExternalLink size={13} />
                      </Link>
                    )}

                    {location.sourceUrl && (
                      <a
                        href={location.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="polar-popup-link"
                      >
                        {location.sourceLabel ?? 'View source'}
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>

      <div className="polar-map-legend">
        <p className="polar-legend-heading">MAP LEGEND</p>

        {(
          Object.entries(typeColor) as [
            LocationSite['type'],
            string,
          ][]
        ).map(([label, color]) => (
          <div key={label} className="polar-legend-item">
            <span
              className="polar-legend-dot"
              style={{
                backgroundColor: color,
                boxShadow: `0 0 9px ${color}`,
              }}
            />
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="polar-map-footer">
        <Snowflake size={13} />
        <span>POLAR RESEARCH NETWORK</span>
      </div>
    </div>
  );
}

function MapControls({
  locations,
  center,
  zoom,
}: {
  locations: MapDisplayLocation[];
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();

  const fitAllLocations = () => {
    if (locations.length === 0) return;

    const bounds = L.latLngBounds(
      locations.map((location) =>
        L.latLng(location.lat, location.lng),
      ),
    );

    if (!bounds.isValid()) return;

    if (locations.length === 1) {
      const onlyLocation = locations[0];
      map.setView(
        [onlyLocation.lat, onlyLocation.lng],
        6,
        { animate: true },
      );
      return;
    }

    map.fitBounds(bounds.pad(0.18), {
      maxZoom: 7,
      animate: true,
    });
  };

  return (
    <div className="polar-map-controls">
      <button
        type="button"
        title="Show Arctic"
        aria-label="Show Arctic"
        onClick={() => map.setView([72, 0], 2.2, { animate: true })}
      >
        <Snowflake size={16} />
        <span>Arctic</span>
      </button>

      <button
        type="button"
        title="Show Antarctic"
        aria-label="Show Antarctic"
        onClick={() =>
          map.setView([-78, 0], 2.2, { animate: true })
        }
      >
        <MapPin size={16} />
        <span>Antarctic</span>
      </button>

      <button
        type="button"
        title="Fit all visible locations"
        aria-label="Fit all visible locations"
        onClick={fitAllLocations}
      >
        <Maximize2 size={16} />
        <span>Fit all</span>
      </button>

      <button
        type="button"
        title="Reset map view"
        aria-label="Reset map view"
        onClick={() =>
          map.setView(center, zoom, { animate: true })
        }
      >
        <RotateCcw size={16} />
        <span>Reset</span>
      </button>

      <button
        type="button"
        title="Return to world view"
        aria-label="Return to world view"
        onClick={() =>
          map.setView([0, 0], 2, { animate: true })
        }
      >
        <LocateFixed size={16} />
        <span>World</span>
      </button>
    </div>
  );
}