import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";

import { setUseGeolocation, setCurrentPosition } from "../actions";

const MapControls = ({
  context,
  inverted,
  currentPosition,
  shouldUseGeolocation,
  setUseGeolocation,
  setCurrentPosition,
}) => {
  useEffect(() => {
    if (currentPosition && shouldUseGeolocation) {
      context.flyTo({
        center: [currentPosition.longitude, currentPosition.latitude],
        zoom: 16,
      });
    }
  }, [currentPosition, shouldUseGeolocation]);

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

  const handleFocusPosition = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCurrentPosition(coords);
        context.flyTo({
          center: [coords.longitude, coords.latitude],
          zoom: 16,
        });
      },
      (error) => {
        console.error(error);
        if (currentPosition) {
          context.flyTo({
            center: [currentPosition.longitude, currentPosition.latitude],
            zoom: 16,
          });
        }
      },
      { maximumAge: 0, timeout: 3000 }
    );
  };

  return (
    <div>
      <Button
        title="Reorient map"
        icon="arrow up"
        color={inverted ? "black" : null}
        style={{ position: "absolute", top: 98, right: 3 }}
        onClick={handleReorient}
      />
      <Button.Group
        vertical
        style={{ position: "absolute", top: 142, right: 6 }}
      >
        <Button
          title="Zoom in"
          color={inverted ? "black" : null}
          icon="plus"
          onClick={handleZoomIn}
        />
        <Button
          title="Zoom out"
          color={inverted ? "black" : null}
          icon="minus"
          onClick={handleZoomOut}
        />
      </Button.Group>
      <Button
        title="Track my location"
        color={shouldUseGeolocation ? "blue" : inverted ? "black" : null}
        icon="location arrow"
        style={{ position: "absolute", top: 222, right: 3 }}
        onClick={handleShouldUseGeolocation}
      />
      <Button
        title="Center map on my location"
        color={inverted ? "black" : null}
        icon="crosshairs"
        style={{ position: "absolute", top: 266, right: 3 }}
        onClick={handleFocusPosition}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { shouldUseGeolocation: state.map.shouldUseGeolocation };
};

export default connect(mapStateToProps, {
  setUseGeolocation,
  setCurrentPosition,
})(MapControls);
