import React, { useState } from "react";
import {
  withRouter,
  Switch,
  Route,
  Link,
  useLocation,
  useHistory,
} from "react-router-dom";
import { Segment, Icon, Menu, Sidebar } from "semantic-ui-react";

const BottomSheet = ({ visible }) => {
  const location = useLocation();
  const history = useHistory();
  console.log(location, history);

  const handleNavigate = (route) => {
    history.push(route);
  };

  return (
    <>
      <Sidebar
        className="no-overflow"
        animation="overlay"
        direction="bottom"
        size="small"
        visible={visible}
      >
        <Segment inverted basic>
          <Menu
            pointing
            inverted
            secondary
            size="small"
            width="thin"
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
              <Segment>This is the "/list" route</Segment>
            </Route>
            <Route exact path="/report">
              <Segment>This is the "/report" route</Segment>
            </Route>
            <Route exact path="/sos">
              <Segment>This is the "/sos" route</Segment>
            </Route>
          </Switch>
        </Segment>
      </Sidebar>
    </>
  );
};

export default withRouter(BottomSheet);
