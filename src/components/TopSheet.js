import React, { useState } from "react";
import { Segment, Search, Icon, Sidebar } from "semantic-ui-react";

const TopSheet = ({ visible }) => {
  return (
    <Sidebar
      as={Segment}
      inverted
      raised
      direction="top"
      animation="overlay"
      textAlign="center"
      visible={visible}
    >
      <Search />
    </Sidebar>
  );
};

export default TopSheet;
