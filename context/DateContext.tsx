'use client';

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

export const DateContext = createContext<{
  currentDate: Date;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
  dayAhead: () => void;
  dayBack: () => void;
  weekAhead: () => void;
  weekBack: () => void;
  monthAhead: () => void;
  monthBack: () => void;
  getDateBefore: (date: Date, amount: number) => Date;
  getDateAfter: (date: Date, amount: number) => Date;
}>({
  currentDate: new Date(),
  setCurrentDate: () => {},
  dayAhead: () => {},
  dayBack: () => {},
  weekAhead: () => {},
  weekBack: () => {},
  monthAhead: () => {},
  monthBack: () => {},
  getDateBefore: () => new Date(),
  getDateAfter: () => new Date(),
});

export const DateContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    if (localStorage.currentDate) {
      setCurrentDate(new Date(localStorage.currentDate));
    }
  }, []);

  useEffect(() => {
    localStorage.currentDate = currentDate.toString();
  }, [currentDate]);

  const getDateBefore = (date: Date, amount: number) => {
    const dateBefore = new Date();
    dateBefore.setTime(date.getTime() - amount * 24 * 60 * 60 * 1000);
    return dateBefore;
  };

  const getDateAfter = (date: Date, amount: number) => {
    const dateAfter = new Date();
    dateAfter.setTime(date.getTime() + amount * 24 * 60 * 60 * 1000);
    return dateAfter;
  };

  const dayAhead = () => {
    const currentDateInMilliseconds = currentDate.getTime();
    const nextDateInMilliseconds =
      currentDateInMilliseconds + 24 * 60 * 60 * 1000;
    const nextDate = new Date(nextDateInMilliseconds);
    setCurrentDate(nextDate);
  };

  const dayBack = () => {
    const currentDateInMilliseconds = currentDate.getTime();
    const previousDateInMilliseconds =
      currentDateInMilliseconds - 24 * 60 * 60 * 1000;
    const previousDate = new Date(previousDateInMilliseconds);
    setCurrentDate(previousDate);
  };

  const weekAhead = () => {
    const currentDateInMilliseconds = currentDate.getTime();
    const nextDateInMilliseconds =
      currentDateInMilliseconds + 7 * 24 * 60 * 60 * 1000;
    const nextDate = new Date(nextDateInMilliseconds);
    setCurrentDate(nextDate);
  };

  const weekBack = () => {
    const currentDateInMilliseconds = currentDate.getTime();
    const previousDateInMilliseconds =
      currentDateInMilliseconds - 7 * 24 * 60 * 60 * 1000;
    const previousDate = new Date(previousDateInMilliseconds);
    setCurrentDate(previousDate);
  };

  const monthAhead = () => {
    const newCurrentDate = new Date(currentDate);
    newCurrentDate.setMonth(newCurrentDate.getMonth() + 1);
    setCurrentDate(newCurrentDate);
  };

  const monthBack = () => {
    const newCurrentDate = new Date(currentDate);
    newCurrentDate.setMonth(newCurrentDate.getMonth() - 1);
    setCurrentDate(newCurrentDate);
  };

  return (
    <DateContext.Provider
      value={{
        currentDate,
        dayAhead,
        dayBack,
        weekAhead,
        weekBack,
        monthAhead,
        monthBack,
        setCurrentDate,
        getDateBefore,
        getDateAfter,
      }}>
      {children}
    </DateContext.Provider>
  );
};
