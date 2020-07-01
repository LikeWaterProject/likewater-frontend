import React, { useMemo, Suspense } from "react";
import { withRouter, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { Sidebar, Button } from "semantic-ui-react";

import LoadingPanel from "./LoadingPanel";

const EventList = React.lazy(() => import("./EventList"));
const EventDetails = React.lazy(() => import("./EventDetails"));
const EventSubmit = React.lazy(() => import("./EventSubmit"));

const BottomSheet = ({ inverted, visible }) => {
  const Loader = useMemo(() => <LoadingPanel />, [inverted]);

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
          color={inverted ? "black" : null}
          size="huge"
          icon="bullhorn"
          onClick={handleSOS}
        ></Button>
      </div>
      <Switch>
        <Route path="/events/:id">
          <Suspense fallback={Loader}>
            <EventDetails inverted={inverted} />
          </Suspense>
        </Route>
        <Route exact path="/submit">
          <Suspense fallback={Loader}>
            <EventSubmit inverted={inverted} />
          </Suspense>
        </Route>
        <Route exact path="/sos">
          <LoadingPanel inverted={inverted} />
        </Route>
        <Route>
          <Suspense fallback={Loader}>
            <EventList inverted={inverted} />
          </Suspense>
        </Route>
      </Switch>
    </Sidebar>
  );
};

const mapStateToProps = (state) => {
  return { inverted: state.preferences.invertedTheme };
};

export default connect(mapStateToProps, {})(withRouter(BottomSheet));
