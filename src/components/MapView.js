import React, { useMemo, useCallback } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useWindowSize } from "react-use";
import ReactMapboxGl, {
  Layer,
  Feature,
  Popup,
  Image as Pin,
} from "react-mapbox-gl";

import { useLongPress } from "../hooks";
import { setMarkerPosition } from "../actions";
import pinAsset from "../assets/pushpin-2-fill.svg";
import policeAsset from "../assets/alarm-warning-fill.svg";
import fireAsset from "../assets/fire-fill.svg";
import medicalAsset from "../assets/first-aid-kit-fill.svg";
import infoAsset from "../assets/broadcast-fill.svg";
import positionAsset from "../assets/focus-3-line.svg";

const Mapbox = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoicmVrdGRlY2thcmQiLCJhIjoiY2theWJ4OXM0MGhiejJ3cnkzcmk0andiYyJ9.IinlG0vyUvcWhvlAREJXeA",
});

const pinIcon = new Image(24, 24);
pinIcon.src = pinAsset;
const policeIcon = new Image(24, 24);
policeIcon.src = policeAsset;
const fireIcon = new Image(24, 24);
fireIcon.src = fireAsset;
const medicalIcon = new Image(24, 24);
medicalIcon.src = medicalAsset;
const infoIcon = new Image(24, 24);
infoIcon.src = infoAsset;
const positionIcon = new Image(24, 24);
positionIcon.src = positionAsset;

const MAP_DEFAULTS = {
  defaultZoom: [10],
  volumetricPainter: {
    "fill-extrusion-color": "#424d5c",
    "fill-extrusion-height": {
      type: "identity",
      property: "height",
    },
    "fill-extrusion-base": {
      type: "identity",
      property: "min_height",
    },
    "fill-extrusion-opacity": 0.6,
  },
};

const data = [
  {
    eventId: "3A4221E1-9AD7-4296-863D-3B8F56E092C7",
    eventType: "Riots",
    userToken: "123423",
    eventDesc: "Example Riot Event",
    coordinates: { lat: 40.73663, lon: -73.99973 },
    reportedDt: "12345",
    confirms: 0,
    dismisses: 0,
  },
];

const MapView = ({
  center,
  onMoveEnd,
  toggleControls,
  map,
  setMarkerPosition,
}) => {
  const history = useHistory();
  const { width, height } = useWindowSize();
  const { markerPosition, showVolumetricBuildings, showBasicMapFeatures } = map;

  const initializeMap = (map) => {
    map.on("click", ({ originalEvent }) => {
      if (!originalEvent.defaultPrevented) {
        setMarkerPosition(null);
        history.push("/");
      }
    });
  };

  const onItemHover = ({ map }, cursor) => {
    map.getCanvas().style.cursor = cursor;
  };

  const handleItemClick = useCallback(
    ({
      map,
      feature: {
        properties: { eventId, coordinates },
      },
      originalEvent,
    }) => {
      originalEvent.preventDefault();
      const { lon, lat } = JSON.parse(coordinates);
      map.flyTo({ center: [lon, lat], zoom: 16 });
      toggleControls(true);
      history.push(`/events/${eventId}`);
    },
    [history, toggleControls]
  );

  const onMouseEvents = useMemo(
    () => ({
      onMouseEnter: (event) => onItemHover(event, "pointer"),
      onMouseLeave: (event) => onItemHover(event, ""),
      onClick: handleItemClick,
    }),
    [handleItemClick]
  );

  const handleAddMarker = (map, mapEvent) => {
    const { lat, lng } = mapEvent.lngLat;
    mapEvent.originalEvent.preventDefault();
    toggleControls(true);
    setMarkerPosition([lng, lat]);
    map.flyTo({ center: [lng, lat], zoom: 16 });
    history.push("/submit");
  };

  const longPressEvent = useLongPress(handleAddMarker, {
    isPreventDefault: true,
    delay: 500,
  });

  const handleMapMoved = (map, mapEvent) => {
    // console.log(mapEvent);
    /* eslint-disable no-unused-expressions */
    mapEvent.originalEvent?.preventDefault?.();
    onMoveEnd(map);
  };

  return (
    <div style={{ width, height }}>
      <Mapbox
        style="mapbox://styles/rektdeckard/ckayd52rb0xzg1imcbyek0g4y"
        center={center}
        zoom={MAP_DEFAULTS.defaultZoom}
        containerStyle={{
          height: "100%",
          width: "100%",
        }}
        onStyleLoad={initializeMap}
        onMoveEnd={handleMapMoved}
        onContextMenu={handleAddMarker}
        {...longPressEvent}
      >
        <Pin id="police" data={policeIcon} />
        <Pin id="pin" data={pinIcon} />
        <Pin id="fire" data={fireIcon} />
        <Pin id="medical" data={medicalIcon} />
        <Pin id="info" data={infoIcon} />
        <Pin id="position" data={positionIcon} />

        {showVolumetricBuildings && (
          <Layer
            id="3d-buildings"
            type="fill-extrusion"
            sourceId="composite"
            sourceLayer="building"
            filter={["==", "extrude", "true"]}
            minZoom={14}
            paint={MAP_DEFAULTS.volumetricPainter}
          />
        )}
        {markerPosition && (
          <Layer
            id="map-marker"
            type="symbol"
            layout={{
              "icon-image": "pin",
              "icon-anchor": "bottom",
              "icon-allow-overlap": true,
            }}
          >
            <Feature coordinates={markerPosition} />
          </Layer>
        )}
        <Layer
          id="event-markers"
          type="symbol"
          layout={{ "icon-image": "info", "icon-allow-overlap": true }}
          // images={["test", image]}
        >
          {data.map((evt) => {
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
        <Layer
          id="location-marker"
          type="symbol"
          layout={{ "icon-image": "position", "icon-allow-overlap": true }}
        >
          <Feature coordinates={center} properties={{ coordinates: center }} />
        </Layer>
      </Mapbox>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { map: state.map };
};

export default connect(mapStateToProps, { setMarkerPosition })(MapView);
