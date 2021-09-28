import React, { useEffect } from "react";
import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Room, Star } from "@material-ui/icons";
import { format } from "timeago.js";

function App() {
  const currUser = "NikSac";
  const [pins, setPins] = useState([]);
  const [currLoc, setCurrLoc] = useState(null);

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 26.4499,
    longitude: 80.3319,
    zoom: 4,
  });

  useEffect(() => {
    const getPins = async () => {
      try {
        const response = await fetch("http://localhost:5000/pins");
        const json = await response.json();
        setPins(json);
      } catch (error) {
        console.log(error);
      }
    };
    getPins();
  }, []);

  const handleClick = (id) => {
    setCurrLoc(id);
  };

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/nikhilsachan12/cku279kba3h1617p49n5ws6bk"
      >
        {pins.map((pin) => {
          return (
            <>
              <Marker
                latitude={pin.lat}
                longitude={pin.long}
                offsetLeft={-20}
                offsetTop={-10}
              >
                <Room
                  onClick={() => handleClick(pin._id)}
                  style={{ fontSize: viewport.zoom * 5, color: pin.username===currUser? "tomato" : "blue", cursor: "pointer"}}
                />
              </Marker>
              {pin._id === currLoc && (
                <Popup
                  latitude={pin.lat}
                  longitude={pin.long}
                  closeButton={true}
                  closeOnClick={false}
                  anchor="left"
                  onClose={()=>setCurrLoc(null)} 
                >
                  {" "}
                  <div>
                    <label>Place</label>
                    <h4>{pin.title}</h4>
                    <label>Review</label>
                    <p>{pin.description}</p>
                    <div>
                      <Star />
                      <Star />
                      <Star />
                    </div>
                    <label>Info</label>
                    <span>{pin.username}</span>
                    <span>{format(pin.timestamp)}</span>
                  </div>
                </Popup>
              )}
            </>
          );
        })}
      </ReactMapGL>
    </div>
  );
}

export default App;
