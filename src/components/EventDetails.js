import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getDistance } from "geolib";
import { Segment, Header, Item } from "semantic-ui-react";

import API from "../api";
import { mapEvents } from "../hooks";
import LoadingPanel from "./LoadingPanel";

const EventDetails = ({ map }) => {
  console.log(map);
  const { currentPosition } = map;
  const [event, setEvent] = useState();
  // const displayEvent = useEvents([event])[0];
  console.log(event);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await API.post(
          "/vieweventdetails",
          {
            eventId: "D0B83D0C-0C96-46F5-8313-40FA9C6AA1D6",
          },
          { crossDomain: true }
        );
        console.log(result);
        setEvent(mapEvents([result.data])[0]);
      } catch (e) {
        console.error(e);
      }
    };

    load();
  }, []);

  console.log(currentPosition, event?.coordinates);
  currentPosition &&
    console.log(
      `${getDistance(event?.coordinates, {
        lon: currentPosition[0],
        lat: currentPosition[1],
      })}m`
    );

  return (
    <Segment raised inverted style={{ padding: 16 }}>
      {event ? (
        <>
          <Header inverted as="h3">
            {event?.eventType}
          </Header>
          <Item>
            <Item.Image>
              {" "}
              <i
                className={`ri-${event?.icon}-fill ri-xl`}
                style={{ color: event?.color }}
              />
            </Item.Image>
            <Item.Content>
              <Item.Meta>{event?.eventDesc}</Item.Meta>
              <Item.Description>
                {currentPosition &&
                  `${getDistance(event?.coordinates, {
                    lon: currentPosition[0],
                    lat: currentPosition[1],
                  })}m`}
              </Item.Description>
              <Item.Extra>
                {new Date(parseInt(event?.reportedDt)).toISOString()}
              </Item.Extra>
            </Item.Content>
          </Item>
        </>
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
