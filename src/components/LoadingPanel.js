import React from "react";
import { Loader } from "semantic-ui-react";

const LoadingPanel = () => (
  <div style={{ minHeight: 200, display: "flex", alignItems: "center" }}>
    <Loader active inline="centered" />
  </div>
);

export default LoadingPanel;
