import { useEffect } from "react";
import { connect } from "react-redux";
import { useGeolocation } from "react-use";

import { setCurrentPosition } from "../actions";

const Geolocator = ({ setCurrentPosition }) => {
  const location = useGeolocation({
    enableHighAccuracy: true,
    maximumAge: 15000,
    timeout: 30000,
  });

  useEffect(() => {
    console.log("GEOLOCATOR: update position");
    if (!location.loading && location.longitude) {
      setCurrentPosition(location);
    }
  }, [location]);

  return null;
};

export default connect(null, { setCurrentPosition })(Geolocator);
