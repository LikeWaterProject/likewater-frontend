import React, { Suspense } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import { Sidebar } from "semantic-ui-react";

import LoadingPanel from "./LoadingPanel";

const Loader = <LoadingPanel />;
const EventList = React.lazy(() => import("./EventList"));
const EventDetails = React.lazy(() => import("./EventDetails"));
const EventSubmit = React.lazy(() => import("./EventSubmit"));

const BottomSheet = ({ visible }) => {
  return (
    <Sidebar
      className="no-overflow"
      animation="push"
      direction="bottom"
      visible={visible}
    >
      <Switch>
        <Route exact path="/">
          <Suspense fallback={Loader}>
            <EventList />
          </Suspense>
        </Route>
        <Route path="/events/:id">
          <Suspense fallback={Loader}>
            <EventDetails />
          </Suspense>
        </Route>
        <Route exact path="/submit">
          <Suspense fallback={Loader}>
            <EventSubmit />
          </Suspense>
        </Route>
        <Route exact path="/report">
          <LoadingPanel />
        </Route>
        <Route exact path="/sos">
          <LoadingPanel />
        </Route>
      </Switch>
    </Sidebar>
  );
};

export default withRouter(BottomSheet);
