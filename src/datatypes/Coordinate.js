import { getDistance } from "geolib";

const FEET_PER_METER = 3.28084;

export default class Coordinate {
  constructor(coords = {}) {
    if (Array.isArray(coords)) {
      [this.lon = 0, this.lat = 0] = coords;
    } else {
      const { latitude, lat = 0, longitude, lng, lon = 0 } = coords;
      this.lon = longitude ?? lng ?? lon;
      this.lat = latitude ?? lat;
    }
  }

  static distanceBetween(from, to) {
    const distanceInMeters = getDistance(from, to, 1);
    return Math.round(distanceInMeters * FEET_PER_METER);
  }

  asArray() {
    return [this.lon, this.lat];
  }

  asObject() {
    return { lon: this.lon, lat: this.lat };
  }
}
