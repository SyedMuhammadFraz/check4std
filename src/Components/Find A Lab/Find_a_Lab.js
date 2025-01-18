import MapComponent from '../../Modals/MapComponent';
import React from "react";

function MapPlaceholder() {
  return (
    <p>
      Map of London.{' '}
      <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  )
}

const MapPage = () => {
  return (
    <MapComponent />
    // <LeafletMap/>
  );
};

export default MapPage;
