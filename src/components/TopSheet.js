import React, { useState } from "react";
import { Segment, Search, Sidebar, Input } from "semantic-ui-react";

const TopSheet = ({ visible }) => {
  const [query, setQuery] = useState("");

  return (
    <Sidebar
      as={Segment}
      inverted
      raised
      direction="top"
      animation="push"
      textAlign="center"
      visible={visible}
    >
      {/* <Input
      fluid
      icon="search"
      placeholder="Search..."
      value={query}
      onChange={(event, { value }) => setQuery(value)}
    /> */}
      <Search
        value={query}
        onSearchChange={(event, { value }) => setQuery(value)}
        open={false}
      />
    </Sidebar>
  );
};

export default TopSheet;
