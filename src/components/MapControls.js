import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";

import { setUseGeolocation } from "../actions";

const MapControls = ({
  context,
  inverted,
  currentPosition,
  shouldUseGeolocation,
  setUseGeolocation,
}) => {
  useEffect(() => {
    if (currentPosition) {
      context.flyTo({
        center: [currentPosition.longitude, currentPosition.latitude],
        zoom: 16,
      });
    }
  }, [currentPosition]);

  const handleZoomIn = () => {
    context.zoomIn();
  };

  const handleZoomOut = () => {
    context.zoomOut();
  };

  const handleReorient = () => {
    context.rotateTo(0);
  };

  const handleShouldUseGeolocation = () => {
    setUseGeolocation(!shouldUseGeolocation);
  };

  return (
    <div>
      <Button
        icon="location arrow"
        color={inverted ? "black" : null}
        style={{ position: "absolute", top: 98, right: 3 }}
        onClick={handleReorient}
      />
      <Button.Group
        vertical
        style={{ position: "absolute", top: 142, right: 6 }}
      >
        <Button
          color={inverted ? "black" : null}
          icon="plus"
          onClick={handleZoomIn}
        />
        <Button
          color={inverted ? "black" : null}
          icon="minus"
          onClick={handleZoomOut}
        />
      </Button.Group>
      <Button
        color={shouldUseGeolocation ? "blue" : inverted ? "black" : null}
        icon="crosshairs"
        style={{ position: "absolute", top: 222, right: 3 }}
        onClick={handleShouldUseGeolocation}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { shouldUseGeolocation: state.map.shouldUseGeolocation };
};

export default connect(mapStateToProps, { setUseGeolocation })(MapControls);
