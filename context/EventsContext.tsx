import React, { createContext, useContext, useEffect, useState } from 'react';

type Event = {
  title: string;
  startTime: number;
  endTime: number;
  _id: string;
};

export const EventsContext = createContext<{
  events: Event[];
  addEvent: (event: Event) => void;
}>({
  events: [],
  addEvent: () => {
    console.log('Add event');
  },
});

type Props = {
  children: React.ReactNode;
};

export const EventsContextProvider = ({ children }: Props) => {
  const [events, setEvents] = useState<Event[]>([]);

  const addEvent = (event: Event) => {
    setEvents((prev) => [...prev, event]);
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
    <EventsContext.Provider value={{ events: events, addEvent: addEvent }}>
      {children}
    </EventsContext.Provider>
  );
};
