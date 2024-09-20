import { useEffect, useState, MutableRefObject, useRef } from 'react';
import { Map, TileLayer } from 'leaflet';
import { OffersType } from './types';

export default function useMap(mapRef: MutableRefObject<HTMLElement | null>, offer: OffersType): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current && offer) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: offer.city.location.latitude,
          lng: offer.city.location.longitude
        },
        zoom: 12,
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );

      instance.addLayer(layer);
      setMap(instance);
      isRenderedRef.current = true;
    } else {
      if (map) {
        map.setView({
          lat: offer.city.location.latitude,
          lng: offer.city.location.longitude,
        });
      }
    }
  }, [mapRef, offer, map]);

  return map;
}


