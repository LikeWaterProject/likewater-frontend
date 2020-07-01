import React from "react";
import { Layer, Feature } from "react-mapbox-gl";

import * as EventType from "../events/types";

const MapEventLayer = ({
  type = EventType.INFO,
  events = [],
  onMouseEvents,
  visibility = true,
  allowOverlap = false,
}) => {
  return (
    <Layer
      id={type}
      type="symbol"
      layout={{
        visibility: visibility ? "visible" : "none",
        "icon-image": type,
        "icon-allow-overlap": allowOverlap,
        // "icon-ignore-placement": true,
      }}
      paint={{
        "icon-color": "red",
        "icon-halo-blur": 1,
        "icon-halo-width": 40,
        "icon-halo-color": "#ff0000",
      }}
    >
      {events.map((evt) => {
        const {
          eventId,
          coordinates: { lon, lat },
        } = evt;
        return (
          <Feature
            key={eventId}
            coordinates={[lon, lat]}
            properties={evt}
            {...onMouseEvents}
          />
        );
      })}
    </Layer>
  );
};

export default MapEventLayer;
