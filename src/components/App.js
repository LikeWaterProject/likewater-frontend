import React, { useState, useMemo, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { Header, Icon, Image, Menu, Segment, Sidebar } from "semantic-ui-react";

import "./App.css";
import MapView from "./MapView";
import TopSheet from "./TopSheet";
import BottomSheet from "./BottomSheet";

const App = ({ events, preferences }) => {
  const [position, setPosition] = useState(preferences.defaultPosition);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [isDragging, setDragging] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const menuItems = useMemo(
    () => [
      {
        key: "nearby",
        name: "Nearby",
        path: "/nearby",
        active: location.pathname === "/nearby",
      },
      {
        key: "report",
        name: "Report",
        path: "/report",
        active: location.pathname === "/report",
      },
      {
        key: "sos",
        name: "SOS",
        path: "/sos",
        active: location.pathname === "/sos",
      },
    ],
    [location]
  );

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

  const handleMenuItemClick = (event, data) => {
    const { path } = data;
    setControlsVisible(true);
    history.push(path);
  };

  return (
    <>
      <Sidebar.Pushable className="no-overflow">
        <TopSheet visible={controlsVisible && !isDragging} />
        <BottomSheet visible={controlsVisible && !isDragging} />
        <Sidebar.Pusher>
          <MapView
            position={position}
            onDrag={setDragging}
            onDismiss={() => setControlsVisible((v) => !v)}
          />
        </Sidebar.Pusher>
      </Sidebar.Pushable>
      <Menu
        pointing
        inverted
        fixed="bottom"
        size="large"
        widths={3}
        onItemClick={handleMenuItemClick}
        items={menuItems}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    events: state.events,
    preferences: state.preferences,
  };
};

export default connect(mapStateToProps, {})(App);
