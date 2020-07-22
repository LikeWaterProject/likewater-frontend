import React, { useMemo, Suspense } from "react";
import {
  withRouter,
  Switch,
  Route,
  useLocation,
  useHistory,
} from "react-router-dom";
import { connect } from "react-redux";
import { Sidebar, Button } from "semantic-ui-react";

import { setMarkerPosition, setMarkerAtMapPosition } from "../actions";
import LoadingPanel from "./LoadingPanel";

const EventList = React.lazy(() => import("./EventList"));
const EventDetails = React.lazy(() => import("./EventDetails"));
const EventSubmit = React.lazy(() => import("./EventSubmit"));

const BottomSheet = ({ setMarkerPosition, setMarkerAtMapPosition, inverted, visible }) => {
  const location = useLocation();
  const history = useHistory();
  const Loader = useMemo(() => <LoadingPanel inverted={inverted} />, [
    inverted,
  ]);

  const handleFabClick = () => {
    if (location.pathname === "/submit") {
      setMarkerPosition(null);
      history.push("/");
    } else {
      setMarkerAtMapPosition();
      history.push("/submit");
    }
  };

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
          icon={location.pathname === "/submit" ? "close" : "thumbtack"}
          onClick={handleFabClick}
        ></Button>
      </div>
      <Suspense fallback={Loader}>
        <Switch>
          <Route path="/events/:id">
            <EventDetails inverted={inverted} />
          </Route>
          <Route exact path="/submit">
            <EventSubmit inverted={inverted} />
          </Route>
          <Route exact path="/sos">
            <LoadingPanel inverted={inverted} />
          </Route>
          <Route>
            <EventList inverted={inverted} />
          </Route>
        </Switch>
      </Suspense>
    </Sidebar>
  );
};

const mapStateToProps = (state) => {
  return { inverted: state.preferences.invertedTheme };
};

export default connect(mapStateToProps, { setMarkerPosition, setMarkerAtMapPosition })(
  withRouter(BottomSheet)
);
