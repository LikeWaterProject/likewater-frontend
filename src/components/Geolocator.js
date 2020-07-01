import { useEffect } from "react";
import { connect } from "react-redux";
import { useGeolocation } from "react-use";

import { setCurrentPosition } from "../actions";

const Geolocator = ({ setCurrentPosition }) => {
  const location = useGeolocation({
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 30000,
  });

  useEffect(() => {
    let isMounted = true;
    if (!location.loading && location.longitude && location.latitude) {
      isMounted && setCurrentPosition(location);
    }

    return () => (isMounted = false);
  }, [location, setCurrentPosition]);

  return null;
};

export default connect(null, { setCurrentPosition })(Geolocator);
