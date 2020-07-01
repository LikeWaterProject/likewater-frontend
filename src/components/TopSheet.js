import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Segment,
  Menu,
  Search,
  Sidebar,
  Input,
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
        </Menu.Menu>
      </Menu>
    </Sidebar>
  );
};

export default connect(null, { toggleTheme })(TopSheet);
