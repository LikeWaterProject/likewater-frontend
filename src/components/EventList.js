import React from "react";
import { Segment, Icon, Image, List } from "semantic-ui-react";

const EventList = ({ events }) => (
  <div style={{ backgroundColor: "#1E1F20", padding: 8 }}>
    {/* <Segment inverted> */}
    <List inverted relaxed divided selection verticalAlign="middle">
      <List.Item>
        <List.Content floated="right">Just now</List.Content>
        <Image as={Icon} size="large" color="red" name="medkit" />
        <List.Content>
          <List.Header>Water Distribution</List.Header>
          <List.Description>
            <b>250ft</b>
          </List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content floated="right">4 minutes ago</List.Content>
        <Image as={Icon} size="large" color="green" name="bullhorn" />
        <List.Content>
          <List.Header>Rally Point</List.Header>
          <List.Description>
            <b>475ft</b>
          </List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content floated="right">2 minutes ago</List.Content>
        <Image as={Icon} size="large" color="blue" name="shield" />
        <List.Content>
          <List.Header>Police Barricade</List.Header>
          <List.Description>
            <b>960ft</b>
          </List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content floated="right">11 minutes ago</List.Content>
        <Image as={Icon} size="large" color="blue" name="shield" />
        <List.Content>
          <List.Header>Police Arrests</List.Header>
          <List.Description>
            <b>1235ft</b>
          </List.Description>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content floated="right">7 minutes ago</List.Content>
        <Image as={Icon} size="large" color="orange" name="fire" />
        <List.Content>
          <List.Header>Looting</List.Header>
          <List.Description>
            <b>1405ft</b>
          </List.Description>
        </List.Content>
      </List.Item>
    </List>
    {/* </Segment> */}
  </div>
);

export default EventList;
