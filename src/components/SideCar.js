import React, { useState } from "react";
import {
  Segment,
  Search,
  Icon,
  Menu,
  Sidebar,
} from "semantic-ui-react";

const SideCar = ({ visible }) => {
  return (
    <>
    <Sidebar
      as={Segment}
      animation="overlay"
      icon="labeled"
      direction="top"
      inverted
      vertical
      visible={visible}
      width="thin"
    >
       <Search />
    </Sidebar>
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      direction="bottom"
      inverted
      size="small"
      visible={visible}
      width="thin"
    >
      <Menu.Item>
        Map
      </Menu.Item>
      <Menu.Item>
        Events
      </Menu.Item>
      <Menu.Item>
        Report
      </Menu.Item>
      <Menu.Item>
        Filter
      </Menu.Item>
      <Menu.Item>
        SOS
      </Menu.Item>
    </Sidebar>
    </>
  );
};

export default SideCar;
