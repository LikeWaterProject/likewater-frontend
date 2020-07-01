import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { formatDistance } from "date-fns";
import { Segment, Header, Item, Button } from "semantic-ui-react";

import API from "../api";
import { respondToEvent } from "../actions";
import { Coordinate } from "../datatypes";
import { mapEvents } from "../hooks";
import LoadingPanel from "./LoadingPanel";

const EventDetails = ({ map, inverted, respondToEvent }) => {
  const { currentPosition } = map;
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setLoading(true);
      try {
        const result = await API.post(
          "/vieweventdetails",
          { eventId: id },
          { crossDomain: true }
        );
        isMounted && setEvent(mapEvents([result.data])[0]);
      } catch (e) {
        console.error(e);
      } finally {
        isMounted && setLoading(false);
      }
    };

    load();
    return () => (isMounted = false);
  }, [id]);

  const handleBackPressed = () => {
    history.push("/");
  };

  const handleEventResponse = (eventActive) => {
    if (!event) return;
    respondToEvent({ eventId: event.eventId, eventActive });
  };

  return (
    <Segment
      className="clickable"
      raised
      inverted={inverted}
      style={{ padding: 16 }}
    >
      {event ? (
        <Item>
          <Item.Header as="h3" className="panel-header">
            <button
              style={{
                border: "none",
                backgroundColor: "transparent",
                textAlign: "center",
                color: inverted ? "white" : "#212121",
              }}
              onClick={handleBackPressed}
            >
              <i className="ri-arrow-left-line panel-icon" />
            </button>
            {event?.eventType}
            <div style={{ position: "absolute", right: 16 }}>
              <Button
                circular
                size="tiny"
                color="grey"
                content="Confirm"
                onClick={() => handleEventResponse(1)}
              />
              <Button
                circular
                size="tiny"
                color="grey"
                content="Deny"
                onClick={() => handleEventResponse(0)}
              />
            </div>
          </Item.Header>
          {/* <Item.Image>
              <i
                className={`ri-${event?.icon}-fill ri-xl`}
                style={{ color: event?.color }}
              />
            </Item.Image> */}
          <Item.Content>
            <Item.Description>
              {currentPosition &&
                event &&
                `${Coordinate.distanceBetween(
                  event?.coordinates,
                  currentPosition
                )}ft`}
            </Item.Description>
            <Item.Meta>{event?.eventDesc}</Item.Meta>
            <Item.Extra>
              {formatDistance(parseInt(event.reportedDt), Date.now(), {
                addSuffix: true,
              })}
            </Item.Extra>
          </Item.Content>
        </Item>
      ) : (
        <LoadingPanel />
      )}
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return { map: state.map, inverted: state.preferences.invertedTheme };
};

export default connect(mapStateToProps, { respondToEvent })(EventDetails);
