import { useEffect, useState, MutableRefObject, useRef } from 'react';
import { Map, TileLayer } from 'leaflet';
import { OffersType } from './types';

export default function useMap(mapRef: MutableRefObject<HTMLElement | null>, offer: OffersType): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);
  const offerProp = offer;

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current && offerProp) {
      const instance = new Map(mapRef.current, {

        center: {
          lat: offerProp.city.location.latitude,
          lng: offerProp.city.location.longitude
        },
        zoom: 8,


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
    }
  }, [mapRef, offerProp]);

  return map;
}

