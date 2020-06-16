import React from "react";
import { Segment, Loader } from "semantic-ui-react";

const LoadingPanel = () => (
  <Segment raised inverted style={{ padding: 8, height: 292}}>
    <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
      <Loader active inline="centered" />
    </div>
  </Segment>
);

export default LoadingPanel;
