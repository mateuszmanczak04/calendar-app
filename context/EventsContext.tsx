import React, { createContext, useContext, useEffect, useState } from 'react';

type Event = {
  title: string;
  startTime: number;
  endTime: number;
  _id: string;
  color: string;
};

export const EventsContext = createContext<{
  events: Event[];
  addEvent: (event: Event) => void;
  removeEvent: (_id: string) => void;
  renameEvent: (_id: string, title: string) => void;
}>({
  events: [],
  addEvent: () => {},
  removeEvent: () => {},
  renameEvent: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const EventsContextProvider = ({ children }: Props) => {
  const [events, setEvents] = useState<Event[]>([]);

  const addEvent = async (event: Event) => {
    setEvents((prev) => [...prev, event]);

    const res = await fetch('/api/add-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: event.title,
        startTime: event.startTime,
        endTime: event.endTime,
        color: event.color,
      }),
    });

    const json = await res.json();

    setEvents((prev) =>
      prev.map((e) => {
        if (e._id === event._id) {
          return { ...e, _id: json.event._id };
        }
        return e;
      })
    );
  };

  const removeEvent = async (_id: string) => {
    setEvents((prev) => prev.filter((p) => p._id !== _id));

    await fetch(`/api/remove-event/${_id}`, {
      method: 'DELETE',
    });
  };

  const renameEvent = async (_id: string, title: string) => {
    setEvents((prevEvents) =>
      prevEvents.map((e) => {
        if (e._id === _id) {
          return { ...e, title };
        }
        return e;
      })
    );

    await fetch('/api/rename-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id, title }),
    });
  };

  useEffect(() => {
    const fetchAllEvents = async () => {
      const res = await fetch('/api/get-all-events', {
        method: 'GET',
      });

      const json = await res.json();

      if (!res.ok) {
        return;
      }

      setEvents(json.events);
    };

    fetchAllEvents();
  }, []);

  return (
    <EventsContext.Provider
      value={{ events, addEvent, removeEvent, renameEvent }}>
      {children}
    </EventsContext.Provider>
  );
};
