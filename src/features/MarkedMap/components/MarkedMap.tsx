import React, { useEffect, useRef, useState, FC } from 'react';
import L, { Map, Marker } from 'leaflet';

import { DataItem } from '../../UpcomingLaunches';
import { ViewConfig } from '../config/types';
import { Wrapper } from './styled';

type Props = {
  items: DataItem[];
  firstLaunch?: DataItem;
};

const initialConfig = {
  latitude: 0,
  longitude: 0,
  zoom: 0,
};

// TODO: react-leaflet could be used for more declarative way
const MarkedMap: FC<Props> = ({ items, firstLaunch }) => {
  const mapRef = useRef<Map>();
  const elem = useRef<HTMLDivElement>(null);
  const [viewConfig, setViewConfig] = useState<ViewConfig>(initialConfig);

  useEffect(() => {
    if (firstLaunch) {
      setViewConfig({
        latitude: firstLaunch.pad.latitude,
        longitude: firstLaunch.pad.longitude,
        zoom: 15,
      });
    } else {
      setViewConfig(initialConfig);
    }
  }, [firstLaunch]);

  useEffect(() => {
    if (!elem.current) return;

    mapRef.current = L.map(elem.current).setView([viewConfig.latitude, viewConfig.longitude], viewConfig.zoom);

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapRef.current);

    return () => {
      mapRef.current?.remove();
    }
  }, [viewConfig]);

  const renderMarkers = (obj: DataItem) => {
    const { pad: { latitude, longitude, name: padName }, name, window_start, program } = obj;
    return L.marker([latitude, longitude]).addTo(mapRef.current as Map)
      .bindPopup(`name: ${name}<br/> 
time of launch: ${window_start}<br/> 
name of the launch pad: ${padName}<br/> 
${program.length ? `agencies: ${program.map(({ name }) => name).join(', ')}` : ''}`)
  };

  useEffect(() => {
    let markers: Marker[] = [];

    markers = items.map((item) =>
      renderMarkers(item));

    return () => markers.forEach((marker) => marker.remove());
  }, [items, viewConfig]);

  return (
    <Wrapper data-testid='map' id='map' ref={elem}></Wrapper>
  );
}

export default MarkedMap;
