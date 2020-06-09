import React, { useState } from "react";
import { Segment, Search, Icon, Sidebar } from "semantic-ui-react";

const TopSheet = ({ visible }) => {
  return (
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
  );
};

export default TopSheet;
