import { useContext } from 'react';
import { EventsContext } from './EventsContext';

export const useEventsContext = () => {
  const context = useContext(EventsContext);

  return context;
};
