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
  const [open, setOpen] = useState(false);
  async function getEvents() {
    setEvents(await (await fetch(url)).json());
  }
  useEffect(() => {
    getEvents();
  }, []);
  return (
    <div className="Events">
      {events
        .filter((x) => open || new Date(x.dateEnd).getTime() > Date.now())
        .map((event, i) => (
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
                {event.location ? (
                  <>
                    <span>{event.location}</span>
                    <span> • </span>
                  </>
                ) : (
                  <></>
                )}
                <span>
                  {event.dateStart} - {event.dateEnd}
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
      <button onClick={() => setOpen(!open)}>
        {open ? "Hide Previous" : "See Previous"}
      </button>
    </div>
  );
}

export default Events;
