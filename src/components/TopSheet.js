import React, { useState } from "react";
import {
  Segment,
  Menu,
  Search,
  Sidebar,
  Input,
  Button,
} from "semantic-ui-react";

const TopSheet = ({ visible, toggleControls }) => {
  const [query, setQuery] = useState("");

  return (
    <Sidebar
      as={Segment}
      inverted
      raised
      direction="top"
      animation="push"
      textAlign="center"
      visible
      style={{ padding: 4 }}
    >
      <Menu inverted borderless widths={3}>
        <Menu.Item> </Menu.Item>
        <Menu.Item fitted>
          <Search
            disabled
            value={query}
            onSearchChange={(event, { value }) => setQuery(value)}
            onFocus={() => toggleControls(false)}
            onBlur={() => toggleControls(true)}
            open={false}
          />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Button circular size="large" color="black" icon="setting" floated="right" />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Sidebar>
  );
};

export default TopSheet;
