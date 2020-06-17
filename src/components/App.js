import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useGeolocation } from "react-use";
import { Sidebar } from "semantic-ui-react";

import MapView from "./MapView";
import TopSheet from "./TopSheet";
import BottomSheet from "./BottomSheet";
import { setCurrentPosition } from "../actions";

const App = ({ setCurrentPosition }) => {
  const location = useGeolocation({
    enableHighAccuracy: false,
    maximumAge: 15000,
    timeout: 30000,
  });

  useEffect(() => {
    if (!location.loading && location.longitude) {
      setCurrentPosition(location);
    }
  }, [location, setCurrentPosition]);

  const [controlsVisible, setControlsVisible] = useState(true);

  const handleMapMove = (mapEvent) => {
    const { lng: lon, lat } = mapEvent.getCenter();
    // setMapPosition([lon, lat]);
  };

  const handleMapContextMenu = (mapEvent) => {
    console.log(mapEvent);
  };

  const handleToggleControls = (visible) => {
    if (typeof visible === "boolean") return setControlsVisible(visible);
    setControlsVisible((v) => !v);
  };

  return (
    <>
      <Sidebar.Pushable className="no-overflow">
        <TopSheet visible={controlsVisible} />
        <BottomSheet visible={controlsVisible} />
        <Sidebar.Pusher>
          <MapView
            onMoveEnd={handleMapMove}
            toggleControls={handleToggleControls}
            onContextMenu={handleMapContextMenu}
          />
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </>
  );
};

export default connect(null, { setCurrentPosition })(App);
