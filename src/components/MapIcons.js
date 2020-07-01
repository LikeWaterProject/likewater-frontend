import React from "react";
import { Image as Pin } from "react-mapbox-gl";

import * as EventType from "../events/types";

import aidAsset from "../assets/first-aid-kit-fill.svg";
import infoAsset from "../assets/broadcast-fill.svg";
import policeAsset from "../assets/alarm-warning-fill.svg";
import safetyAsset from "../assets/fire-fill.svg";
import sosAsset from "../assets/lifebuoy-fill.svg";
import pinAsset from "../assets/pushpin-2-fill.svg";
import positionAsset from "../assets/focus-3-line.svg";

const aidIcon = new Image(24, 24);
aidIcon.src = aidAsset;
const infoIcon = new Image(24, 24);
infoIcon.src = infoAsset;
const policeIcon = new Image(24, 24);
policeIcon.src = policeAsset;
const safetyIcon = new Image(24, 24);
safetyIcon.src = safetyAsset;
const sosIcon = new Image(24, 24);
sosIcon.src = sosAsset;
const pinIcon = new Image(24, 24);
pinIcon.src = pinAsset;
const positionIcon = new Image(24, 24);
positionIcon.src = positionAsset;

const MapIcons = () => (
  <>
    <Pin id={EventType.AID} data={aidIcon} />
    <Pin id={EventType.INFO} data={infoIcon} />
    <Pin id={EventType.POLICE} data={policeIcon} />
    <Pin id={EventType.SAFETY} data={safetyIcon} />
    <Pin id={EventType.EMERGENCY} data={sosIcon} />
    <Pin id={EventType.PIN} data={pinIcon} />
    <Pin id={EventType.POSITION} data={positionIcon} />
  </>
);

export default MapIcons;
