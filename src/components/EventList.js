import React, { useMemo } from "react";
import { Segment, Header, Icon, Image, List } from "semantic-ui-react";

const sampleEvents = [
  {
    type: "Water Distribution",
    description: "",
    distance: 250,
    lastActive: "Just now",
    icon: "first-aid-kit",
    color: "gainsboro",
  },
  {
    type: "Rally Point",
    description: "",
    distance: 475,
    lastActive: "4 minutes ago",
    icon: "broadcast",
    color: "mediumseagreen",
  },
  {
    type: "Police Barricade",
    description: "",
    distance: 960,
    lastActive: "2 minutes ago",
    icon: "alarm-warning",
    color: "royalblue",
  },
  {
    type: "Police Arrests",
    description: "",
    distance: 1235,
    lastActive: "11 minutes ago",
    icon: "alarm-warning",
    color: "royalblue",
  },
  {
    type: "Looting",
    description: "",
    distance: 1405,
    lastActive: "7 minutes ago",
    icon: "fire",
    color: "darkorange",
  },
];

const EventList = ({ events }) => {
  const listItems = useMemo(
    () =>
      sampleEvents.map((event, index) => (
        <List.Item key={index}>
          <List.Content floated="right">{event.lastActive}</List.Content>
          <List.Content floated="left" style={{ paddingTop: 8 }}>
            <i
              className={`ri-${event.icon}-fill ri-xl`}
              style={{ color: event.color }}
            />
          </List.Content>
          <List.Content>
            <List.Header>{event.type}</List.Header>
            <List.Description>
              <b>{event.distance}ft</b>
            </List.Description>
          </List.Content>
        </List.Item>
      )),
    [events]
  );

  return (
    <Segment raised inverted style={{ padding: 16 }}>
      <Header inverted as="h3">Nearby events</Header>
      <List inverted relaxed divided selection verticalAlign="middle">
        {listItems}
      </List>
    </Segment>
  );
};

export default EventList;
