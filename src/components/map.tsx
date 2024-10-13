import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../useMap.tsx';
import 'leaflet/dist/leaflet.css';
import { OffersType} from '../types.tsx';
import { useSelector } from 'react-redux';
import { selectCityOffers } from '../store/offers/offers-selectors.ts';
import { selectHoveredCard } from '../store/offers/offers-selectors.ts';

const IconPath = {
  DEFAULT_ICON_PATH: '/img/pin.svg',
  CURRENT_ICON_PATH: '/img/pin-active.svg'
};

const defaultIcon = new Icon({
  iconUrl: IconPath.DEFAULT_ICON_PATH,
  iconSize: [28, 39],
  iconAnchor: [14, 39]
});

const activeIcon = new Icon({
  iconUrl: IconPath.CURRENT_ICON_PATH,
  iconSize: [28, 39],
  iconAnchor: [14, 39]
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
            hoveredCard === point.id ? activeIcon : defaultIcon
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

