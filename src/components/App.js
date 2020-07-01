import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Sidebar } from "semantic-ui-react";
// import { getDistance } from "geolib";

import {
  initializeUser,
  initializeGeolocation,
  getEvents,
  getEventTypes,
} from "../actions";
import Geolocator from "./Geolocator";
import MapView from "./MapView";
import TopSheet from "./TopSheet";
import BottomSheet from "./BottomSheet";
import Coordinate from "../datatypes/Coordinate";

const App = ({
  initializeUser,
  initializeGeolocation,
  shouldUseGeolocation,
  defaultPosition,
  getEvents,
  getEventTypes,
  inverted,
}) => {
  const [controlsVisible, setControlsVisible] = useState(true);

  // TODO: separate effects into separate function calls
  useEffect(() => {
    initializeUser();
    initializeGeolocation();
    getEventTypes();
    getEvents({
      coordinates: {
        lon: defaultPosition[0],
        lat: defaultPosition[1],
      },
    });
  }, [
    initializeUser,
    initializeGeolocation,
    getEvents,
    getEventTypes,
    defaultPosition,
  ]);

  const handleMapMoveEnd = (context) => {
    const { lng, lat } = context.getCenter();
    const { _sw, _ne } = context.getBounds();
    // const meters = getDistance(_sw, _ne);
    const radius = Coordinate.distanceBetween(_sw, _ne) / 2;
    // setMapPosition([lon, lat]);
    getEvents({ coordinates: { lon: lng, lat }, radius });
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
  return {
    shouldUseGeolocation: state.map.shouldUseGeolocation,
    defaultPosition: state.map.defaultPosition,
    inverted: state.preferences.invertedTheme,
  };
};

export default connect(mapStateToProps, {
  initializeUser,
  initializeGeolocation,
  getEvents,
  getEventTypes,
})(App);
