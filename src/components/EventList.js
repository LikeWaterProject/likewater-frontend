import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
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

const EventList = ({ events }) => {
  const history = useHistory();
  const displayEvents = useEvents(sampleEvents);

  const handleItemClick = (id) => {
    history.push(`/events/${id}`);
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
            <List.Header>{event.eventDesc}</List.Header>
            <List.Description>
              <b>{`${getDistance(
                { lat: 40.671613, lon: -73.951909 },
                event.coordinates,
                5
              )}ft`}</b>
            </List.Description>
          </List.Content>
        </List.Item>
      )),
    [events]
  );

  return (
    <Segment className="clickable" raised inverted style={{ padding: 16 }}>
      <div className="panel-header">
        <div className="panel-header-text">
          <Header inverted as="h3">
            Nearby events
          </Header>
        </div>
        <div>
          <Button size="small" inverted color="blue" circular>
            <i className="ri-add-fill ri-sm" style={{ paddingRight: 4 }} />
            Add
          </Button>
          <Button size="small" inverted circular>
            Filter
          </Button>
        </div>
      </div>
      <List inverted divided selection verticalAlign="middle">
        {listItems}
      </List>
    </Segment>
  );
};

export default EventList;
