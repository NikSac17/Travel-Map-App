import React from "react";
import { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import {Room} from "@material-ui/icons"

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vw",
    latitude: 26.4499,
    longitude: 80.3319,
    zoom: 4,
  });

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/nikhilsachan12/cku279kba3h1617p49n5ws6bk"
      >
        <Marker
          latitude={48.85}
          longitude={2.29}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <Room style={{fontSize: viewport.zoom * 5}}/>
        </Marker>
      </ReactMapGL>
    </div>
  );
}

export default App;