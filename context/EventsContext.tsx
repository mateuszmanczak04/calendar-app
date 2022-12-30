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
}>({
  events: [],
  addEvent: () => {},
  removeEvent: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const EventsContextProvider = ({ children }: Props) => {
  const [events, setEvents] = useState<Event[]>([]);

  const addEvent = (event: Event) => {
    setEvents((prev) => [...prev, event]);
  };

  const removeEvent = async (_id: string) => {
    setEvents((prev) => prev.filter((p) => p._id !== _id));

    const res = await fetch(`/api/remove-event/${_id}`, {
      method: 'DELETE',
    });

    const json = await res.json();
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
    <EventsContext.Provider value={{ events, addEvent, removeEvent }}>
      {children}
    </EventsContext.Provider>
  );
};
