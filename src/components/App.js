import React, { useState, useEffect } from "react";
import { Header, Icon, Image, Menu, Segment, Sidebar } from "semantic-ui-react";

import MapView from "./MapView";
import SideCar from "./SideCar";

const App = () => {
  const [position, setPosition] = useState([-78.9715041, 40.7311599]);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((geolocationPosition) => {
      const {
        coords: { longitude, latitude },
      } = geolocationPosition;
      setPosition([longitude, latitude]);
    });
  }, []);

  return (
    <Sidebar.Pushable>
      <SideCar visible={sidebarVisible} />
      <Sidebar.Pusher>
        <div style={{ height: "100vh", width: "100vw" }}>
          <MapView
            position={position}
            onClick={() =>
              setSidebarVisible((sidebarVisible) => !sidebarVisible)
            }
          />
        </div>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default App;
