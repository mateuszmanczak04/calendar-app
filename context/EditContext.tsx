import { createContext, ReactNode, useState } from 'react';
import { start } from 'repl';

export const EditContext = createContext({
  _id: '',
  title: '',
  startTime: 0,
  endTime: 0,
  setEvent: (
    _id: string,
    title: string,
    startTime: number,
    endTime: number
  ) => {},
});

export const EditContextProvider = ({ children }: { children: ReactNode }) => {
  const [_id, set_id] = useState('');
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const setEvent = (
    _id: string,
    title: string,
    startTime: number,
    endTime: number
  ) => {
    set_id(_id);
    setTitle(title);
    setStartTime(startTime);
    setEndTime(endTime);
  };

  return (
    <EditContext.Provider value={{ _id, title, startTime, endTime, setEvent }}>
      {children}
    </EditContext.Provider>
  );
};
