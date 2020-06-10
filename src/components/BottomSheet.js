import React, { useState, Suspense } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import { Segment, Sidebar, Dimmer, Loader } from "semantic-ui-react";

import LoadingPanel from "./LoadingPanel";

const EventList = React.lazy(() => import("./EventList"));

const BottomSheet = ({ visible }) => {
  return (
    <Sidebar
      style={{ paddingBottom: 36 }}
      className="no-overflow"
      animation="overlay"
      direction="bottom"
      visible={visible}
    >
      <Segment raised inverted style={{ padding: 8 }}>
        <Switch>
          <Route exact path="/nearby">
            <Suspense fallback={<LoadingPanel />}>
              <EventList />
            </Suspense>
          </Route>
          <Route exact path="/report">
            <LoadingPanel />
          </Route>
          <Route exact path="/sos">
            <Segment inverted>This is the "/sos" route</Segment>
          </Route>
        </Switch>
      </Segment>
    </Sidebar>
  );
};

export default withRouter(BottomSheet);
