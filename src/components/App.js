import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Sidebar } from "semantic-ui-react";

import { initializeGeolocation } from "../actions";
import Geolocator from "./Geolocator";
import MapView from "./MapView";
import TopSheet from "./TopSheet";
import BottomSheet from "./BottomSheet";

const App = ({ shouldUseGeolocation, initializeGeolocation }) => {
  const [controlsVisible, setControlsVisible] = useState(true);

  useEffect(() => {
    initializeGeolocation();
  }, []);

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
      {shouldUseGeolocation && <Geolocator />}
      <Sidebar.Pushable className="no-overflow">
        <TopSheet
          inverted={inverted}
          visible={controlsVisible}
          toggleControls={handleToggleControls}
        />
        <BottomSheet inverted={inverted} visible={controlsVisible} />
        <Sidebar.Pusher>
          <MapView
            inverted={inverted}
            toggleControls={handleToggleControls}
            onMoveEnd={handleMapMoveEnd}
            onContextMenu={handleMapContextMenu}
          />
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </>
  );
};

const mapStateToProps = (state) => {
  return { shouldUseGeolocation: state.map.shouldUseGeolocation };
};

export default connect(mapStateToProps, { initializeGeolocation })(App);
