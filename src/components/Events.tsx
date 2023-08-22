import { useEffect, useRef, useState } from "react";
import DescriptionArea from "./DescriptionArea";
import "./Events.css";

type Event = {
  name: string;
  dateStart: string;
  dateEnd: string;
  location?: string;
  url?: string;
  completed: boolean;
  postmortem?: string;
};

function Events({ url }: { url: string }) {
  const [events, setEvents] = useState([] as Event[]);
  const [page, setPage] = useState(0);
  const stopUpdating = useRef(false);
  async function getEvents() {
    const getEvents = await (await fetch(url + page)).json();
    if (getEvents.length < 5) stopUpdating.current = true;
    setEvents(events.concat(getEvents));
  }
  useEffect(() => {
    getEvents();
  }, [page]);
  return (
    <div className="Events">
      {events.map((event, i) => (
        <div className="Event" key={i}>
          <div className="stats">
            <div className="title">
              {event.url ? (
                <a href={event.url} target="_blank" rel="noreferrer">
                  {event.completed === true
                    ? "✓ "
                    : new Date(event.dateEnd).getTime() < Date.now()
                    ? "X "
                    : ""}
                  <span>{event.name}</span>
                </a>
              ) : (
                <span>{event.name}</span>
              )}
            </div>
            <div className="creationName">
              {event.completed === true ? (
                <>
                  <span>Completed</span>
                  <span> • </span>
                </>
              ) : (
                <></>
              )}
              {event.location ? (
                <>
                  <span>{event.location}</span>
                  <span> • </span>
                </>
              ) : (
                <></>
              )}
              <span>
                {new Date(event.dateStart).toLocaleDateString()} -{" "}
                {new Date(event.dateEnd).toLocaleDateString()}
              </span>
            </div>

            {event.completed && event.postmortem ? (
              <>
                <span>Postmortem:</span>
                <DescriptionArea>{`*${event.postmortem}*`}</DescriptionArea>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      ))}
      <div className="buttons">
        <button
          className="special_disabled material-symbols-outlined"
          onClick={() => setPage(page + 1)}
          disabled={stopUpdating.current}
        >
          expand_more
        </button>
      </div>
    </div>
  );
}

export default Events;
