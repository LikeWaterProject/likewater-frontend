import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Segment,
  Header,
  Icon,
  Form,
  Divider,
  Button,
  Label,
  Radio,
} from "semantic-ui-react";

import { reportEvent } from "../actions";

const sampleEvent = {
  type: "Water Distribution",
  description: "",
  distance: 250,
  lastActive: "Just now",
  icon: "first-aid-kit",
  color: "gainsboro",
};

const options = [
  {
    key: "aid",
    text: "Aid",
    value: "aid",
    icon: (
      <i
        className="ri-first-aid-kit-fill ri-lg aid"
        style={{ color: "gainsboro" }}
      />
    ),
  },
  {
    key: "info",
    text: "Info",
    value: "info",
    icon: <i className="ri-broadcast-fill ri-lg info" />,
  },
  {
    key: "police",
    text: "Police",
    value: "police",
    icon: <i className="ri-alarm-warning-fill ri-lg police" />,
  },
  {
    key: "safety",
    text: "Safety",
    value: "safety",
    icon: <i className="ri-fire-fill ri-lg safety" />,
  },
  {
    key: "sos",
    text: "SOS",
    value: "sos",
    icon: <i className="ri-lifebuoy-fill ri-lg sos" />,
  },
];

const EventSubmit = ({ markerPosition, reportEvent }) => {
  const [lon, lat] = markerPosition ?? [0, 0];
  const [type, setType] = useState();
  const [description, setDescription] = useState("");

  return (
    <Segment className="clickable" raised inverted style={{ padding: 16 }}>
      <Header inverted as="h3">
        Submit event
        <Header.Subheader floated="right">{`[${lat.toFixed(4)}, ${lon.toFixed(
          4
        )}]`}</Header.Subheader>
      </Header>
      <Form inverted>
        <Form.Group inline>
          <label>Type</label>
          <Label.Group circular>
            {options.map((option) => (
              <Label
                active={type === option.value}
                inverted={type !== option.value}
                // basic
                size="large"
                as={Button}
                key={option.key}
                onClick={() => setType(option.value)}
              >
                {option.icon}
                {option.text}
              </Label>
            ))}
          </Label.Group>
        </Form.Group>
        <Form.Input
          label="Description"
          placeholder="E.g. Barricade on Main St."
          value={description}
          onChange={(event, { value }) => setDescription(value)}
        />
        <Button size="small" inverted circular content="Submit" />
      </Form>
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return { markerPosition: state.map.markerPosition };
};

export default connect(mapStateToProps, { reportEvent })(EventSubmit);
