import React, { useState, useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { formatDistance } from "date-fns";
import {
  Segment,
  Header,
  List,
  Button,
  Icon,
  Transition,
} from "semantic-ui-react";

import { setEventFilter } from "../actions";
import { useEvents } from "../hooks";
import * as EventType from "../events/types";

const categories = [
  {
    type: EventType.AID,
    text: "Aid",
    icon: (
      <i
        className="ri-first-aid-kit-fill ri-lg"
        style={{ color: "gainsboro", marginRight: 4 }}
      />
    ),
  },
  {
    type: EventType.INFO,
    text: "Info",
    icon: (
      <i
        className="ri-broadcast-fill ri-lg"
        style={{ color: "mediumseagreen", marginRight: 4 }}
      />
    ),
  },
  {
    type: EventType.POLICE,
    text: "Police",
    icon: (
      <i
        className="ri-alarm-warning-fill ri-lg"
        style={{ color: "royalblue", marginRight: 4 }}
      />
    ),
  },
  {
    type: EventType.SAFETY,
    text: "Safety",
    icon: (
      <i
        className="ri-fire-fill ri-lg"
        style={{ color: "darkorange", marginRight: 4 }}
      />
    ),
  },
  {
    type: EventType.EMERGENCY,
    text: "SOS",
    icon: (
      <i
        className="ri-lifebuoy-fill ri-lg"
        style={{ color: "crimson", marginRight: 4 }}
      />
    ),
  },
];

const EventList = ({ map, events, inverted, setEventFilter }) => {
  const history = useHistory();
  const { nearbyEvents, eventFilters } = events;
  const [sortBy, setSortBy] = useState("distance");
  const displayEvents = useEvents(nearbyEvents, eventFilters, sortBy);
  const [filtersVisible, setFiltersVisible] = useState(false);
  // const { currentPosition, defaultPosition } = map;

  const handleItemClick = useCallback(
    (id) => {
      history.push(`/events/${id}`);
    },
    [history]
  );

  const handleFilterCategory = (type) => {
    setEventFilter({ [type]: !eventFilters[type] });
  };

  const listItems = useMemo(
    () =>
      displayEvents.map((event, index) => (
        <List.Item key={index} onClick={() => handleItemClick(event.eventId)}>
          <List.Content floated="right">
            {formatDistance(parseInt(event.reportedDt), Date.now(), {
              addSuffix: true,
            })}
          </List.Content>
          <List.Content floated="left" style={{ paddingTop: 8 }}>
            <i
              className={`ri-${event.icon}-fill ri-xl`}
              style={{ color: event.color }}
            />
          </List.Content>
          <List.Content>
            <List.Header>{event.eventType}</List.Header>
            <List.Description>
              <b>{`${event.distance}ft`}</b>
              {/* <b>{`${Coordinate.distanceBetween(
                currentPosition ?? defaultPosition,
                event.coordinates
              )}ft`}</b> */}
            </List.Description>
          </List.Content>
        </List.Item>
      )),
    [displayEvents, handleItemClick]
  );

  return (
    <Segment
      className="clickable"
      raised
      inverted={inverted}
      style={{ padding: 16 }}
    >
      <div className="panel-header">
        {!filtersVisible && (
          <div className="panel-header-text">
            <Header inverted={inverted} as="h3">
              Events
            </Header>
          </div>
        )}
        <Transition
          visible={!filtersVisible}
          animation="vertical flip"
          duration={300}
        >
          <div style={{ position: "absolute", right: 16 }}>
            <Button circular size="tiny" color="grey" content="Sort" />
            <Button
              circular
              size="tiny"
              color="grey"
              content="Filter"
              onClick={() => setFiltersVisible((v) => !v)}
            />
          </div>
        </Transition>
        {filtersVisible && (
          <button
            style={{
              border: "none",
              backgroundColor: "transparent",
              textAlign: "center",
              fontSize: 18,
              color: inverted ? "white" : "#212121",
            }}
            onClick={() => setFiltersVisible((v) => !v)}
          >
            <i className="ri-arrow-left-line panel-icon" />
          </button>
        )}
        <div className="button-row">
          <Transition
            visible={filtersVisible}
            animation="vertical flip"
            duration={300}
          >
            <div
              style={{
                position: "absolute",
                top: 16,
                maxWidth: "80%",
                height: 48,
                overflowX: "auto",
                whiteSpace: "nowrap",
              }}
            >
              {categories.map(({ type, text, icon }) => (
                <Button
                  circular
                  toggle
                  inverted
                  size="tiny"
                  key={type}
                  style={
                    eventFilters[type]
                      ? {
                          color: "black",
                          backgroundColor: "white",
                          verticalAlign: "middle",
                        }
                      : {
                          color: "white",
                          backgroundColor: "transparent",
                          verticalAlign: "middle",
                        }
                  }
                  onClick={() => handleFilterCategory(type)}
                >
                  {icon}
                  {text}
                </Button>
              ))}
            </div>
          </Transition>
        </div>
      </div>
      <List
        inverted={inverted}
        divided
        selection
        verticalAlign="middle"
        style={{ maxHeight: 236, overflowY: "auto" }}
      >
        {listItems}
      </List>
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    events: state.events,
    map: state.map,
    inverted: state.preferences.invertedTheme,
  };
};

export default connect(mapStateToProps, { setEventFilter })(EventList);
