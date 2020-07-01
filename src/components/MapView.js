import React, { useRef, useMemo, useCallback } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useWindowSize } from "react-use";
import ReactMapboxGl, { MapContext, Layer, Feature } from "react-mapbox-gl";

import * as EventType from "../events/types";
import { useLongPress } from "../hooks";
import { setMarkerPosition } from "../actions";
import MapControls from "./MapControls";
import MapEventLayer from "./MapEventLayer";
import MapIcons from "./MapIcons";

const Mapbox = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoicmVrdGRlY2thcmQiLCJhIjoiY2theWJ4OXM0MGhiejJ3cnkzcmk0andiYyJ9.IinlG0vyUvcWhvlAREJXeA",
  attributionControl: false,
  trackResize: false,
});

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

const MapView = ({
  map,
  events,
  onMoveEnd,
  toggleControls,
  setMarkerPosition,
  inverted,
}) => {
  const history = useHistory();
  const { width, height } = useWindowSize();
  const defaultPosition = useRef(map.defaultPosition);
  const {
    currentPosition,
    markerPosition,
    showVolumetricBuildings,
    showBasicMapFeatures,
  } = map;
  const { nearbyEvents, eventFilters } = events;

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

  const onLongPressEvent = useLongPress(handleAddMarker, {
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
      center={defaultPosition.current}
      zoom={MAP_DEFAULTS.defaultZoom}
      onStyleLoad={initializeMap}
      onContextMenu={handleAddMarker}
      onMoveEnd={onMoveEnd}
      {...onLongPressEvent}
    >
      <MapIcons />

      {showVolumetricBuildings && (
        <Layer
          id="3d-buildings"
          type="fill-extrusion"
          sourceId="composite"
          sourceLayer="building"
          filter={["==", "extrude", "true"]}
          minZoom={14}
          paint={{
            ...MAP_DEFAULTS.volumetricPainter,
            "fill-extrusion-color": inverted ? "#424D5C" : "#CAD2D3",
          }}
        />
      )}

      {/* FIXME: context does not update unless props do, wherefore no repaint of icons */}
      <MapContext.Consumer>
        {(context) => {
          const isZoomedIn = context.getZoom() > 15;
          return (
            <>
              <MapControls context={context} currentPosition={currentPosition} inverted={inverted} />
              {eventFilters[EventType.AID] && (
                <MapEventLayer
                  type={EventType.AID}
                  events={nearbyEvents.filter(
                    ({ eventCategory }) => eventCategory === EventType.AID
                  )}
                  onMouseEvents={onMouseEvents}
                  visibility={eventFilters.aid}
                  allowOverlap={isZoomedIn}
                />
              )}
              {eventFilters[EventType.INFO] && (
                <MapEventLayer
                  type={EventType.INFO}
                  events={nearbyEvents.filter(
                    ({ eventCategory }) => eventCategory === EventType.INFO
                  )}
                  onMouseEvents={onMouseEvents}
                  visibility={eventFilters.info}
                  allowOverlap={isZoomedIn}
                />
              )}
              {eventFilters[EventType.POLICE] && (
                <MapEventLayer
                  type={EventType.POLICE}
                  events={nearbyEvents.filter(
                    ({ eventCategory }) => eventCategory === EventType.POLICE
                  )}
                  onMouseEvents={onMouseEvents}
                  visibility={eventFilters.police}
                  allowOverlap={isZoomedIn}
                />
              )}
              {eventFilters[EventType.SAFETY] && (
                <MapEventLayer
                  type={EventType.SAFETY}
                  events={nearbyEvents.filter(
                    ({ eventCategory }) => eventCategory === EventType.SAFETY
                  )}
                  onMouseEvents={onMouseEvents}
                  visibility={eventFilters.safety}
                  allowOverlap={isZoomedIn}
                />
              )}
              {eventFilters[EventType.EMERGENCY] && (
                <MapEventLayer
                  type={EventType.EMERGENCY}
                  events={nearbyEvents.filter(
                    ({ eventCategory }) => eventCategory === EventType.EMERGENCY
                  )}
                  onMouseEvents={onMouseEvents}
                  visibility={eventFilters.sos}
                  allowOverlap={isZoomedIn}
                />
              )}
            </>
          );
        }}
      </MapContext.Consumer>

      {markerPosition && (
        <Layer
          id="map-marker"
          type="symbol"
          layout={{
            "icon-image": "PIN",
            "icon-anchor": "bottom",
            "icon-allow-overlap": true,
          }}
        >
          <Feature coordinates={markerPosition} />
        </Layer>
      )}
      {currentPosition && (
        <Layer
          id="location-marker"
          type="symbol"
          layout={{ "icon-image": "POSITION", "icon-allow-overlap": true }}
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
  return { map: state.map, events: state.events };
};

export default connect(mapStateToProps, { setMarkerPosition })(MapView);
