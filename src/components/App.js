import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Header, Icon, Image, Menu, Segment, Sidebar } from "semantic-ui-react";

import "./App.css";
import MapView from "./MapView";
import TopSheet from "./TopSheet";
import BottomSheet from "./BottomSheet";

const App = ({ events, preferences }) => {
  const [position, setPosition] = useState(preferences.defaultPosition);
  const [controlsVisible, setControlsVisible] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (geolocationPosition) => {
        const {
          coords: { longitude, latitude },
        } = geolocationPosition;
        setPosition([longitude, latitude]);
      },
      console.error,
      { enableHighAccuracy: false, maximumAge: 15000, timeout: 30000 }
    );
  }, []);

  const handleMapClick = (event) => {
    console.log(event);
    setControlsVisible((v) => !v);
  };

  return (
    <Sidebar.Pushable className="no-overflow">
      <TopSheet visible={controlsVisible} />
      <BottomSheet visible={controlsVisible} />
      <Sidebar.Pusher>
        <MapView position={position} onClick={handleMapClick} />
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

const mapStateToProps = (state) => {
  return {
    preferences: state.preferences,
    events: state.events,
  };
};

export default connect(mapStateToProps, {})(App);
