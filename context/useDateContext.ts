import { useContext } from 'react';
import { DateContext } from './DateContext';

export const useDateContext = () => {
  const context = useContext(DateContext);

  return context;
};
