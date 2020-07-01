import React from "react";
import { Segment, Loader } from "semantic-ui-react";

const LoadingPanel = ({ inverted }) => (
  <Segment raised basic inverted={inverted} style={{ padding: 8, height: 292 }}>
    <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
      <Loader active inline="centered" />
    </div>
  </Segment>
);

export default LoadingPanel;
