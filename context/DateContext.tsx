import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

export const DateContext = createContext<{
  currentDate: Date;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
  dayAhead: () => void;
  dayBack: () => void;
  getDateBefore: (date: Date) => Date;
  getDateAfter: (date: Date) => Date;
}>({
  currentDate: new Date(),
  setCurrentDate: () => {},
  dayAhead: () => {},
  dayBack: () => {},
  getDateBefore: () => new Date(),
  getDateAfter: () => new Date(),
});

export const DateContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const getDateBefore = (date: Date) => {
    const dateBefore = new Date();
    dateBefore.setDate(date.getDate() - 1);
    return dateBefore;
  };

  const getDateAfter = (date: Date) => {
    const dateAfter = new Date();
    dateAfter.setDate(date.getDate() + 1);
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

  return (
    <DateContext.Provider
      value={{
        currentDate,
        dayAhead,
        dayBack,
        setCurrentDate,
        getDateBefore,
        getDateAfter,
      }}>
      {children}
    </DateContext.Provider>
  );
};
