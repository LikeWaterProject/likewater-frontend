import React, { useState, Suspense } from "react";
import {
  withRouter,
  Switch,
  Route,
  Link,
  useLocation,
  useHistory,
} from "react-router-dom";
import {
  Segment,
  Icon,
  Menu,
  Sidebar,
  Dimmer,
  Loader,
} from "semantic-ui-react";

const EventList = React.lazy(() => import("./EventList"));

const BottomSheet = ({ visible }) => {
  const location = useLocation();
  const history = useHistory();

  const handleNavigate = (route) => {
    history.push(route);
  };

  return (
    <Sidebar
      as={Segment}
      raised
      inverted
      style={{ padding: 0 }}
      className="no-overflow"
      animation="overlay"
      direction="bottom"
      visible={visible}
    >
      {/* <Segment raised inverted  style={{ padding: 0 }}> */}
      <Menu
        compact
        pointing
        inverted
        secondary
        size="large"
        widths={8}
        icon="labeled"
      >
        <Menu.Item
          name="List"
          onClick={() => handleNavigate("/list")}
          active={location.pathname === "/list"}
        />
        <Menu.Item
          name="Report"
          onClick={() => handleNavigate("/report")}
          active={location.pathname === "/report"}
        />
        <Menu.Item
          name="SOS"
          onClick={() => handleNavigate("/sos")}
          active={location.pathname === "/sos"}
        />
      </Menu>
      <Switch>
        <Route exact path="/list">
          <Suspense
            fallback={
              <Dimmer active>
                <Loader />
              </Dimmer>
            }
          >
            <EventList />
          </Suspense>
        </Route>
        <Route exact path="/report">
          <Segment
            inverted
            style={{ minHeight: 200 }}
            content={
              <Dimmer active>
                <Loader />
              </Dimmer>
            }
          />
        </Route>
        <Route exact path="/sos">
          <Segment inverted>This is the "/sos" route</Segment>
        </Route>
      </Switch>
      {/* </Segment> */}
    </Sidebar>
  );
};

export default withRouter(BottomSheet);
