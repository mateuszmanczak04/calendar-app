'use client';

import React, { createContext, useEffect, useState } from 'react';
import { __String } from 'typescript';
import { useLoadingContext } from './useLoadingContext';

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
  submitChanges: (
    _id: string,
    title: string,
    startDate: Date,
    endDate: Date
  ) => void;
  change: (_id: string, title: string, startDate: Date, endDate: Date) => void;
}>({
  events: [],
  addEvent: () => {},
  removeEvent: () => {},
  submitChanges: () => {},
  change: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const EventsContextProvider = ({ children }: Props) => {
  const [events, setEvents] = useState<Event[]>([]);
  const { loading, setTrue, setFalse } = useLoadingContext();

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

  useEffect(() => {
    const fetchAllEvents = async () => {
      setTrue();
      const res = await fetch('/api/get-all-events', {
        method: 'GET',
      });

      const json = await res.json();

      if (!res.ok) {
        return;
      }

      setEvents(json.events);
      console.log('fetched');
      setFalse();
    };

    fetchAllEvents();
  }, [setFalse, setTrue]);

  const change = async (
    _id: string,
    title: string,
    startDate: Date,
    endDate: Date
  ) => {
    // locally
    setEvents((prevEvents) =>
      prevEvents.map((e) => {
        if (e._id === _id) {
          return {
            ...e,
            title,
            startTime: startDate.getTime(),
            endTime: endDate.getTime(),
          };
        }
        return e;
      })
    );
  };

  const submitChanges = async (
    _id: string,
    title: string,
    startDate: Date,
    endDate: Date
  ) => {
    await fetch('/api/change-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id, title, startDate, endDate }),
    });
  };

  return (
    <EventsContext.Provider
      value={{
        events,
        addEvent,
        removeEvent,
        submitChanges,
        change,
      }}>
      {children}
    </EventsContext.Provider>
  );
};
