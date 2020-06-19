import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getDistance } from "geolib";
import { Segment, Header, Item, Button } from "semantic-ui-react";

import API from "../api";
import { mapEvents } from "../hooks";
import LoadingPanel from "./LoadingPanel";

const EventDetails = ({ map }) => {
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

  return (
    <Segment className="clickable" raised inverted style={{ padding: 16 }}>
      {event ? (
        <Item>
          <Item.Header as="h3" className="panel-header">
            <button
              style={{
                border: "none",
                backgroundColor: "transparent",
                textAlign: "center",
                color: "white",
              }}
              onClick={handleBackPressed}
            >
              <i className="ri-arrow-left-line panel-icon" />
            </button>
            {/* <Button basic inverted secondary circular className="ri-arrow-left-line" /> */}
            {event?.eventType}
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
                `${getDistance(event?.coordinates, {
                  lon: currentPosition.longitude,
                  lat: currentPosition.latitude,
                })}m`}
            </Item.Description>
            <Item.Meta>{event?.eventDesc}</Item.Meta>
            <Item.Extra>
              {new Date(parseInt(event?.reportedDt)).toISOString()}
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
  return { map: state.map };
};

export default connect(mapStateToProps, {})(EventDetails);
