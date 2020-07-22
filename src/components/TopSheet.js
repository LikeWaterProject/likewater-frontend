import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Segment,
  Menu,
  Dropdown,
  Search,
  Sidebar,
  Button,
} from "semantic-ui-react";

import { toggleTheme } from "../actions";

const TopSheet = ({ inverted, visible, toggleControls, toggleTheme }) => {
  const [query, setQuery] = useState("");

  return (
    <Sidebar
      as={Segment}
      basic={!inverted}
      inverted={inverted}
      raised
      direction="top"
      animation="push"
      textAlign="center"
      visible
      style={{ padding: 0, boxShadow: "none" }}
    >
      <Menu inverted={inverted} borderless widths={3}>
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
            <Button
              circular
              size="large"
              color={inverted ? "black" : null}
              icon="setting"
              floated="right"
              onClick={toggleTheme}
            />
          </Menu.Item>
          {/* <Dropdown item icon="setting" simple inverted={inverted}>
            <Dropdown.Menu>
              <Dropdown.Item>Open</Dropdown.Item>
              <Dropdown.Item>Save...</Dropdown.Item>
              <Dropdown.Item>Edit Permissions</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Header>Export</Dropdown.Header>
              <Dropdown.Item>Share</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
        </Menu.Menu>
      </Menu>
    </Sidebar>
  );
};

export default connect(null, { toggleTheme })(TopSheet);
