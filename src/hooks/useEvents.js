import { useMemo } from "react";
import { AID, EMERGENCY, INFO, POLICE, SAFETY } from "../data/eventTypes";

const getEventIcon = (eventType) => {
  switch (eventType) {
    case AID:
      return { icon: "first-aid-kit", color: "gainsboro" };
    case EMERGENCY:
      return { icon: "lifebuoy", color: "crimson" };
    case INFO:
      return { icon: "broadcast", color: "mediumseagreen" };
    case POLICE:
      return { icon: "alarm-warning", color: "royalblue" };
    case SAFETY:
      return { icon: "fire", color: "darkorange" };
    default:
      return { icon: "pushpin-2", color: "mediumpurple" };
  }
};

// const getEventIcon = (eventType) => {
//   switch (eventType) {
//     case AID:
//       return { icon: "first-aid-kit-fill", color: "gainsboro" };
//     case EMERGENCY:
//       return { icon: "emergency", color: "crimson" };
//     case INFO:
//       return { icon: "bullhorn", color: "mediumseagreen" };
//     case POLICE:
//       return { icon: "alarm-warning", color: "royalblue" };
//     case SAFETY:
//       return { icon: "fire", color: "darkorange" };
//     default:
//       return { icon: "map pin", color: "mediumpurple" };
//   }
// };

export const mapEvents = (modelEvents) =>
  modelEvents.map((event) => {
    const { eventId, eventType, eventDesc, coordinates, reportedDt } = event;
    return {
      eventId,
      eventType,
      coordinates,
      eventDesc,
      reportedDt,
      ...getEventIcon(eventType),
    };
  });

export const useEvents = (modelEvents) =>
  useMemo(() => mapEvents(modelEvents), [modelEvents]);
