import { useState, useMemo } from "react";
import { AID, EMERGENCY, INFO, POLICE, SAFETY } from "../data/eventTypes";

const getEventIcon = (eventType) => {
  switch (eventType) {
    case AID:
      return { icon: "first-aid-kit-fill", color: "floralwhite" };
    case EMERGENCY:
      return { icon: "emergency", color: "crimson" };
    case INFO:
      return { icon: "bullhorn", color: "forestgreen" };
    case POLICE:
      return { icon: "alarm-warning", color: "royalblue" };
    case SAFETY:
      return { icon: "fire", color: "darkorange" };
    default:
      return { icon: "map pin", color: "darkmagenta" };
  }
};

export const mapEvents = (modelEvents) =>
  modelEvents.map((event) => {
    const { eventId, eventType, eventDesc, coordinates, reportedDt } = event;
    return {
      eventId,
      eventType,
      coordinates,
      eventDesc,
      reportedDt,
      ...getEventIcon(POLICE),
    };
  });

export const useEvents = (modelEvents) =>
  useMemo(() => mapEvents(modelEvents), [modelEvents]);
