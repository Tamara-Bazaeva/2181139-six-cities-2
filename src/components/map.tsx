import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../url.tsx';
import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../useMap.tsx';
import 'leaflet/dist/leaflet.css';
import { OffersType} from '../types.tsx';
import { useSelector } from 'react-redux';
import { selectCityOffers } from '../store/offers/offers-selectors.ts';
import { selectHoveredCard } from '../store/offers/offers-selectors.ts';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

export default function Map(): JSX.Element {
  const propPoints = useSelector(selectCityOffers);
  const hoveredCard = useSelector(selectHoveredCard);
  const mapRef = useRef(null);
  const map = useMap(mapRef, propPoints[0]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      propPoints?.forEach((point: OffersType) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });
        marker
          .setIcon(
            hoveredCard === point.id ? currentCustomIcon : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, propPoints, hoveredCard]);

  return <div style={{ height: '100%'}} ref={mapRef}></div>;
}

