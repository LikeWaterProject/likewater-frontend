import React from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";

import { setUseGeolocation } from "../actions";

const MapControls = ({ context, shouldUseGeolocation, setUseGeolocation }) => {
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
        color="black"
        style={{ position: "absolute", top: 98, right: 3 }}
        onClick={handleReorient}
      />
      <Button.Group
        vertical
        style={{ position: "absolute", top: 142, right: 6 }}
      >
        <Button color="black" icon="plus" onClick={handleZoomIn} />
        <Button color="black" icon="minus" onClick={handleZoomOut} />
      </Button.Group>
      <Button
        color={shouldUseGeolocation ? "blue" : "black"}
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
