import React from "react";
import { connect } from "react-redux";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { Icon } from "semantic-ui-react";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoicmVrdGRlY2thcmQiLCJhIjoiY2theWJ4OXM0MGhiejJ3cnkzcmk0andiYyJ9.IinlG0vyUvcWhvlAREJXeA",
});

const defaultZoom = [10];
const volumetricPainter = {
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
};

const data = [
  {
    mentions: 248 / 50,
    lastMention: 1591135064030,
    location: [-73.978698, 40.685457],
  },
  {
    mentions: 61 / 50,
    lastMention: 1591135010000,
    location: [-74.011379, 40.708201],
  },
  {
    mentions: 120 / 50,
    lastMention: 1591134911238,
    location: [-73.987529, 40.752137],
  },
];

const MapView = ({ position, onClick, preferences }) => {
  // TODO: can remove null check once position is part of global state
  if (!position) return null;

  const { showVolumetricBuildings, showBasicMapFeatures } = preferences;

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Map
        style="mapbox://styles/rektdeckard/ckayd52rb0xzg1imcbyek0g4y"
        center={position}
        zoom={defaultZoom}
        containerStyle={{
          height: "100%",
          width: "100%",
        }}
        onDragStart={onClick}
        onDragEnd={onClick}
      >
        {showVolumetricBuildings && (
          <Layer
            id="3d-buildings"
            type="fill-extrusion"
            sourceId="composite"
            sourceLayer="building"
            filter={["==", "extrude", "true"]}
            minZoom={14}
            paint={volumetricPainter}
          />
        )}
        <Layer
          id="event-markers"
          type="symbol"
          layout={{ "icon-image": "police-15" }}
        >
          {data.map((el, index) => (
            <Feature key={index} coordinates={el.location} properties={el} />
          ))}
        </Layer>
      </Map>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { preferences: state.preferences };
};

export default connect(mapStateToProps, {})(MapView);
