import { useMemo } from "react";
import * as EventType from "../events/types";

const getEventIcon = (eventCategory) => {
  switch (eventCategory) {
    case EventType.AID:
      return { icon: "first-aid-kit", color: "gainsboro" };
    case EventType.EMERGENCY:
      return { icon: "lifebuoy", color: "crimson" };
    case EventType.INFO:
      return { icon: "broadcast", color: "mediumseagreen" };
    case EventType.POLICE:
      return { icon: "alarm-warning", color: "royalblue" };
    case EventType.SAFETY:
      return { icon: "fire", color: "darkorange" };
    default:
      return { icon: "pushpin-2", color: "mediumpurple" };
  }
};

const getSorter = (sortBy) => {
  switch (sortBy) {
    case "distance":
      return (first, second) => first.distance - second.distance;
    case "time":
      return (first, second) =>
        first.lastConfirmDt ??
        first.reportedDt - second.lastConfirmDt ??
        second.reportedDt;
    case "category":
      return (first, second) => first.eventCategory - second.eventCategory;
    default:
      return (first, second) => first.distance - second.distance;
  }
};

export const mapEvents = (
  modelEvents = [],
  eventFilters,
  sortBy = "distance"
) => {
  const events = modelEvents.map((event) => {
    return {
      ...event,
      ...getEventIcon(event.eventCategory),
    };
  });

  sortBy && events.sort(getSorter(sortBy));

  return eventFilters
    ? events.filter((event) => !!eventFilters[event.eventCategory])
    : events;
};

export const useEvents = (modelEvents, eventFilters, sortBy) =>
  useMemo(() => mapEvents(modelEvents, eventFilters, sortBy), [
    modelEvents,
    eventFilters,
    sortBy,
  ]);
