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
    key: EventType.INFO,
    value: EventType.INFO,
    text: "Info",
    icon: <i className="ri-broadcast-fill ri-lg info" />,
  },
  {
    key: EventType.POLICE,
    value: EventType.POLICE,
    text: "Police",
    icon: <i className="ri-alarm-warning-fill ri-lg police" />,
  },
  {
    key: EventType.SAFETY,
    value: EventType.SAFETY,
    text: "Safety",
    icon: <i className="ri-fire-fill ri-lg safety" />,
  },
  {
    key: EventType.EMERGENCY,
    value: EventType.EMERGENCY,
    text: "SOS",
    icon: <i className="ri-lifebuoy-fill ri-lg sos" />,
  },
];

const EventSubmit = ({
  eventTypes,
  markerPosition,
  reportEvent,
  getEventTypes,
  inverted,
}) => {
  const [lon, lat] = markerPosition ?? [0, 0];
  const [category, setCategory] = useState();
  const [type, setType] = useState();
  const [description, setDescription] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (!eventTypes) getEventTypes();
  }, []);

  const categoryOptions = useMemo(() => {
    return eventTypes && category
      ? eventTypes[category].map((type) => ({
          key: type,
          text: type,
          value: type,
        }))
      : [{ text: "", value: "" }];
  }, [eventTypes, category]);

  const handleSubmit = async () => {
    if (category && lon && lat && description) {
      await reportEvent({
        coordinates: { lon, lat },
        eventCategory: category,
        eventType: type,
        eventDesc: description,
      });
      history.push("/");
    }
  };

  return (
    <Segment
      className="clickable"
      raised
      inverted={inverted}
      style={{ padding: 16 }}
    >
      <Header inverted={inverted} as="h3">
        Submit event
        <Header.Subheader floated="right">{`[${lat.toFixed(4)}, ${lon.toFixed(
          4
        )}]`}</Header.Subheader>
      </Header>
      <Form inverted={inverted}>
        {/* <Form.Group inline>
          <label>Type</label>
          <Button.Group compact color="black">
            {options.map((option) => (
              <Button
                active={category === option.value}
                // inverted={category !== option.value}
                // basic
                // size="large"
                // as={Button}
                key={option.key}
                onClick={() => setCategory(option.value)}
              >
                {option.icon}
                {option.text}
              </Button>
            ))}
          </Button.Group>
        </Form.Group> */}
        <Form.Select
          label="Category"
          options={options}
          placeholder={"General"}
          onChange={(event, { value }) => setCategory(value)}
        />
        <Form.Select
          label="Type"
          options={categoryOptions}
          disabled={!category}
          placeholder={"General"}
          onChange={(event, { value }) => setType(value)}
        />
        <Form.Input
          label="Description"
          placeholder="E.g. Barricade on Main St."
          value={description}
          onChange={(event, { value }) => setDescription(value)}
        />
        <Button
          size="small"
          circular
          color="grey"
          content="Submit"
          onClick={handleSubmit}
        />
      </Form>
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    eventTypes: state.events.eventTypes,
    markerPosition: state.map.markerPosition,
    inverted: state.preferences.invertedTheme,
  };
};

export default connect(mapStateToProps, { reportEvent, getEventTypes })(
  EventSubmit
);
