import React from "react";
import { Segment, Header, Icon, Divider } from "semantic-ui-react";

const sampleEvent = {
  type: "Water Distribution",
  description: "",
  distance: 250,
  lastActive: "Just now",
  icon: "first-aid-kit",
  color: "gainsboro",
};

const EventSubmit = ({}) => {
  return (
    <Segment raised inverted style={{ padding: 16, height: 292 }}>
      <Header inverted as="h3">
        Submit event
      </Header>
    </Segment>
  );
};

export default EventSubmit;
