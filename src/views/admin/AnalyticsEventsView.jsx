import { useState, useEffect } from "react";
import { getAnalyticsEventsApi } from "../../api/analytics";

import "./AnalyticsEventsView.css";

function Event({ event }) {
  function formatEvent(event) {
    return event?.split("_").join(" ");
  }
  return <div className="event">{formatEvent(event)}</div>;
}
function Table({ data }) {
  function Row({ datum }) {
    const { id, email, event, credentials, created_at, user_agent } = datum;
    const { picture, name, hasEditAccess } = JSON.parse(credentials);
    function Profile({ name, hasEditAccess }) {
      return (
        <div className="profile">
          <div className="info">
            <div>
              <span>{name}</span>
              {hasEditAccess && <span></span>}
            </div>
          </div>
        </div>
      );
    }
    return (
      <tr>
        <td>{id}</td>
        <td>
          <img src={picture} alt={email} />
        </td>
        <td>
          <Profile
            picture={picture}
            name={name}
            email={email}
            hasEditAccess={hasEditAccess}
          />
        </td>
        <td>{email}</td>
        <td>
          <Event event={event} />
        </td>
        <td className="concise">{credentials.split(",").join("\n")}</td>
        <td>{new Date(created_at).toLocaleString()}</td>
        <td className="concise">{user_agent}</td>
      </tr>
    );
  }
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th></th>
          <th>Profile</th>
          <th>Email</th>
          <th>Event</th>
          <th>Credentials</th>
          <th>Date Created</th>
          <th className="right">User Agent</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((datum) => (
          <Row key={datum.id} datum={datum} />
        ))}
      </tbody>
    </table>
  );
}
function List({ data }) {
  function ListItem({ datum }) {
    const { email, event, credentials, created_at, user_agent } = datum;
    const { picture, name } = JSON.parse(credentials);
    return (
      <div className="list-item">
        <div className="profile">
          <div className="picture">
            <img src={picture} alt={email} />
          </div>
          <div>
            <div>{name}</div>
            <div>{email}</div>
          </div>
        </div>
        <div className="info">
          <div className="concise">{user_agent}</div>
          <div className="event-time">
            <Event event={event} />
            <div style={{ display: "inline-block" }}>
              {new Date(created_at).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="list">
      {data?.map((datum) => (
        <ListItem key={datum?.id} datum={datum} />
      ))}
    </div>
  );
}
function AnalyticsEventsView() {
  const [events, setEvents] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    async function getEvents() {
      setIsLoading(true);
      const events = await getAnalyticsEventsApi();
      setEvents(events);
      setIsLoading(false);
    }
    getEvents();
  }, []);
  useEffect(() => {
    const handleWindowResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  });
  return isLoading ? (
    "Loading..."
  ) : (
    <div className="analytics-events-view">
      {windowWidth > 1024 ? <Table data={events} /> : <List data={events} />}
    </div>
  );
}

export default AnalyticsEventsView;
