import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { formatDistance } from "date-fns";
import { Segment, Header, List, Button } from "semantic-ui-react";
import { getDistance } from "geolib";

import { useEvents } from "../hooks";

const sampleEvents = [
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
            {formatDistance(event.reportedDt, Date.now(), { addSuffix: true })}
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
              Nearby events
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
          {filtersVisible && <button
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
            </button>}
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
                maxWidth: "100%",
                height: 48,
                overflowX: "auto",
                whiteSpace: "nowrap",
              }}
            >
              {categories.map(({ type, text, style }) => (
                <Button
                  circular
                  toggle
                  size="tiny"
                  key={type}
                  style={{
                    backgroundColor: eventFilters[type]
                      ? style.backgroundColor
                      : "grey",
                  }}
                  onClick={() => handleFilterCategory(type)}
                >
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
