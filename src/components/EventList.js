import React, { useMemo } from "react";
import { Segment, Icon, Image, List } from "semantic-ui-react";

const sampleEvents = [
  {
    type: "Water Distribution",
    description: "",
    distance: 250,
    lastActive: "Just now",
    icon: "medkit",
    color: "red",
  },
  {
    type: "Rally Point",
    description: "",
    distance: 475,
    lastActive: "4 minutes ago",
    icon: "bullhorn",
    color: "green",
  },
  {
    type: "Police Barricade",
    description: "",
    distance: 960,
    lastActive: "2 minutes ago",
    icon: "shield",
    color: "blue",
  },
  {
    type: "Police Arrests",
    description: "",
    distance: 1235,
    lastActive: "11 minutes ago",
    icon: "shield",
    color: "blue",
  },
  {
    type: "Looting",
    description: "",
    distance: 1405,
    lastActive: "7 minutes ago",
    icon: "fire",
    color: "orange",
  },
];

const EventList = ({ events }) => {
  const listItems = useMemo(
    () =>
      sampleEvents.map((event, index) => (
        <List.Item key={index}>
          <List.Content floated="right">{event.lastActive}</List.Content>
          <List.Content floated="left" verticalAlign="middle">
            <Icon size="large" color={event.color} name={event.icon} />
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
    <List inverted relaxed divided selection verticalAlign="middle">
      {listItems}
    </List>
  );
};

export default EventList;
