import React, { Suspense } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import { Sidebar, Button } from "semantic-ui-react";

import LoadingPanel from "./LoadingPanel";

const Loader = <LoadingPanel />;
const EventList = React.lazy(() => import("./EventList"));
const EventDetails = React.lazy(() => import("./EventDetails"));
const EventSubmit = React.lazy(() => import("./EventSubmit"));

const BottomSheet = ({ visible }) => {
  // TODO: implement instant submission of high-priotiry SOS event
  const handleSOS = () => window.confirm("Send SOS?");

  return (
    <Sidebar
      className="no-overflow unclickable"
      animation="push"
      direction="bottom"
      visible={visible}
      style={{ boxShadow: "none" }}
    >
      <div style={{ textAlign: "right" }}>
        <Button
          className="clickable"
          circular
          compact
          color="black"
          size="huge"
          icon="bullhorn"
          onClick={handleSOS}
        ></Button>
      </div>
      <Switch>
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
        <Route exact path="/sos">
          <LoadingPanel />
        </Route>
        <Route>
          <Suspense fallback={Loader}>
            <EventList />
          </Suspense>
        </Route>
      </Switch>
    </Sidebar>
  );
};

export default withRouter(BottomSheet);
