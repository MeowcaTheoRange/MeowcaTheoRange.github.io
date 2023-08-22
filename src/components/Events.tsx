import { useEffect, useState } from "react";
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
  const [open, setOpen] = useState(false);
  async function getEvents() {
    setEvents(await (await fetch(url + page)).json());
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
          className="special_disabled"
          onClick={() => setPage(page - 1)}
          disabled={page <= 0}
        >
          See Less
        </button>
        <button disabled>Page {page}</button>
        <button
          className="special_disabled"
          onClick={() => setPage(page + 1)}
          disabled={events.length < 5}
        >
          See More
        </button>
      </div>
    </div>
  );
}

export default Events;
