import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { __String } from 'typescript';

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
  changeDate: (_id: string, startDate: Date, endDate: Date) => void;
  submitChangeDate: (_id: string, startDate: Date, endDate: Date) => void;
}>({
  events: [],
  addEvent: () => {},
  removeEvent: () => {},
  renameEvent: () => {},
  changeDate: () => {},
  submitChangeDate: () => {},
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

  const changeDate = useCallback(
    async (_id: string, startDate: Date, endDate: Date) => {
      setEvents((prevEvents) =>
        prevEvents.map((e) => {
          if (e._id === _id) {
            return {
              ...e,
              startTime: startDate.getTime(),
              endTime: endDate.getTime(),
            };
          }
          return e;
        })
      );
    },
    []
  );

  const submitChangeDate = async (
    _id: string,
    startDate: Date,
    endDate: Date
  ) => {
    await fetch('/api/change-date', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id, startDate, endDate }),
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
      value={{
        events,
        addEvent,
        removeEvent,
        renameEvent,
        changeDate,
        submitChangeDate,
      }}>
      {children}
    </EventsContext.Provider>
  );
};
