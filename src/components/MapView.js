import React, { useMemo, useCallback } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useWindowSize } from "react-use";
import ReactMapboxGl, {
  MapContext,
  Layer,
  Feature,
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
import MapControls from "./MapControls";

const Mapbox = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoicmVrdGRlY2thcmQiLCJhIjoiY2theWJ4OXM0MGhiejJ3cnkzcmk0andiYyJ9.IinlG0vyUvcWhvlAREJXeA",
  attributionControl: false,
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
    // "fill-extrusion-color": inverted ? "#424D5C" : "#CAD2D3",
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
    eventId: "0B479F98-12D1-49C5-9A5A-28E8BAC9E420",
    eventType: "police",
    eventDesc: "Beating at 12th and Lexington",
    userToken: "User98765",
    reportedDt: 1592356915877,
    confirms: 3,
    dismisses: 1,
    coordinates: {
      lat: 41,
      lon: -74,
    },
  },
  {
    eventId: "0FF83A5F-EA8F-462C-AD8E-81BB704ED4FC",
    eventType: "aid",
    eventDesc: "Water bottles and eye-wash station",
    userToken: "User1111",
    reportedDt: 1592430145773,
    confirms: 0,
    dismisses: 0,
    coordinates: {
      lat: 40.6911,
      lon: -74.00348,
    },
  },
  {
    eventId: "582276B6-65C8-4FAE-B7D6-27CD1F9EB19D",
    eventType: "info",
    userToken: "User1111",
    eventDesc: "Rally Point",
    reportedDt: 1592356992014,
    confirms: 3,
    dismisses: 1,
    coordinates: {
      lat: 40.695103,
      lon: -73.984165,
    },
  },
  {
    eventId: "04E9E828-EFF3-4144-A875-39AC87179B66",
    eventType: "info",
    userToken: "User123456",
    eventDesc: "Extra Masks",
    reportedDt: 1592430500012,
    confirms: 3,
    dismisses: 1,
    coordinates: {
      lat: 40.694794,
      lon: -73.981783,
    },
  },
  {
    eventId: "F176598B-A4E1-4E14-A3A3-6C0E2AAED664",
    eventType: "safety",
    userToken: "User123456",
    eventDesc: "Looting",
    reportedDt: 1592430500012,
    confirms: 2,
    dismisses: 0,
    coordinates: {
      lat: 40.693257,
      lon: -73.983478,
    },
  },
];

const MapView = ({ onMoveEnd, toggleControls, map, setMarkerPosition }) => {
  const history = useHistory();
  const { width, height } = useWindowSize();
  const {
    currentPosition,
    defaultPosition,
    markerPosition,
    showVolumetricBuildings,
    showBasicMapFeatures,
  } = map;

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
    if (map.isMoving() || map.isRotating() || map.isZooming()) return;
    const { lat, lng } = mapEvent.lngLat;
    toggleControls(true);
    setMarkerPosition([lng, lat]);
    map.flyTo({ center: [lng, lat], zoom: 16 });
    history.push("/submit");
  };

  const longPressEvent = useLongPress(handleAddMarker, {
    isPreventDefault: true,
    delay: 500,
  });

  return (
    <Mapbox
      style={
        inverted
          ? "mapbox://styles/rektdeckard/ckayd52rb0xzg1imcbyek0g4y"
          : "mapbox://styles/mapbox/light-v10"
      }
      containerStyle={{
        width,
        height,
      }}
      center={
        currentPosition
          ? [currentPosition.longitude, currentPosition.latitude]
          : defaultPosition
      }
      zoom={MAP_DEFAULTS.defaultZoom}
      onStyleLoad={initializeMap}
      onContextMenu={handleAddMarker}
      // onMoveEnd={handleMapMoved}
      {...longPressEvent}
    >
      <Pin id="police" data={policeIcon} />
      <Pin id="pin" data={pinIcon} />
      <Pin id="fire" data={fireIcon} />
      <Pin id="medical" data={medicalIcon} />
      <Pin id="info" data={infoIcon} />
      <Pin id="position" data={positionIcon} />

      <MapContext.Consumer>
        {(context) => <MapControls context={context} />}
      </MapContext.Consumer>

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
      {currentPosition && (
        <Layer
          id="location-marker"
          type="symbol"
          layout={{ "icon-image": "position", "icon-allow-overlap": true }}
        >
          <Feature
            coordinates={[currentPosition.longitude, currentPosition.latitude]}
            properties={currentPosition}
          />
        </Layer>
      )}
    </Mapbox>
  );
};

const mapStateToProps = (state) => {
  return { map: state.map };
};

export default connect(mapStateToProps, { setMarkerPosition })(MapView);
