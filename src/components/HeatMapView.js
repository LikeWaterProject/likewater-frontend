import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoicmVrdGRlY2thcmQiLCJhIjoiY2theWJ4OXM0MGhiejJ3cnkzcmk0andiYyJ9.IinlG0vyUvcWhvlAREJXeA",
});

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

const layerPaint = {
  "heatmap-weight": {
    property: "mentions",
    type: "exponential",
    stops: [
      [0, 0],
      [5, 2],
    ],
  },
  // Increase the heatmap color weight weight by zoom level
  // heatmap-ntensity is a multiplier on top of heatmap-weight
  "heatmap-intensity": {
    stops: [
      [0, 0],
      [5, 1.2],
    ],
  },
  // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
  // Begin color ramp at 0-stop with a 0-transparancy color
  // to create a blur-like effect.
  "heatmap-color": [
    "interpolate",
    ["linear"],
    ["heatmap-density"],
    0,
    "rgba(33,102,172,0)",
    0.25,
    "rgb(103,169,207)",
    0.5,
    "rgb(209,229,240)",
    0.8,
    "rgb(253,219,199)",
    1,
    "rgb(239,138,98)",
    2,
    "rgb(178,24,43)",
  ],
  // Adjust the heatmap radius by zoom level
  "heatmap-radius": {
    stops: [
      [0, 1],
      [5, 50],
    ],
  },
};

const HeatMapView = ({ position, onClick }) => {
  if (!position) return;

  return (
    <Map
      style="mapbox://styles/rektdeckard/ckayd52rb0xzg1imcbyek0g4y"
      center={position}
      containerStyle={{
        height: "100vh",
        width: "100vw",
      }}
      onClick={onClick}
    >
      <Layer type="heatmap" paint={layerPaint}>
        {data.map((el, index) => (
          <Feature key={index} coordinates={el.location} properties={el} />
        ))}
      </Layer>
    </Map>
  );
};

export default HeatMapView;
