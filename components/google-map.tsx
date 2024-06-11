'use client'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React, { useState } from 'react';

const center = {
    lat: -3.745,
    lng: -38.523
  };
export function GoogleMapComponent() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "YOUR_API_KEY"
      })
      const [map, setMap] = useState(null)

      const onLoad = React.useCallback(function callback(map:any) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
    
        setMap(map)
      }, [])
      const onUnmount = React.useCallback(function callback(map:any) {
        setMap(null)
      }, [])
      return isLoaded ? (
        <GoogleMap
          mapContainerStyle={{}}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
        </GoogleMap>
      ) : <>chargement...</>;
}