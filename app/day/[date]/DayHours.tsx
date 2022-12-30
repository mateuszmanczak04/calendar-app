import React, { useEffect, useState } from 'react';
import styles from './DayHours.module.scss';
import OnlyHours from '../../(components)/OnlyHours';
import EventsDay from '../../(components)/EventsDay';
import { useDateContext } from '../../../context/useDateContext';

const DayHours = () => {
  const { currentDate, getDateBefore, getDateAfter } = useDateContext();
  const [firstDate, setFirstDate] = useState(currentDate);
  const [orders, setOrders] = useState([-1, 0, 1]);
  const [transition, setTransition] = useState('0.4s ease');

  useEffect(() => {
    const currentDateMidnight = new Date(currentDate);
    currentDateMidnight.setHours(0, 0, 0, 0);

    const firstDateMidnight = new Date(firstDate);
    firstDateMidnight.setHours(0, 0, 0, 0);

    if (currentDateMidnight.getTime() === firstDateMidnight.getTime()) {
      return;
    }

    if (
      currentDateMidnight.getTime() + 24 * 60 * 60 * 1000 !==
        firstDateMidnight.getTime() &&
      currentDateMidnight.getTime() - 24 * 60 * 60 * 1000 !==
        firstDateMidnight.getTime()
    ) {
      setTransition('0s');
      setFirstDate(currentDate);
      setOrders([-1, 0, 1]);
      return;
    }

    setTransition('0.4s ease');
    if (firstDateMidnight > currentDateMidnight) {
      // go back
      setOrders((prevOrders) => prevOrders.map((o) => o + 1));
    } else if (firstDateMidnight < currentDateMidnight) {
      // go forward
      setOrders((prevOrders) => prevOrders.map((o) => o - 1));
    }

    setTimeout(() => {
      setTransition('0s');
      setFirstDate(currentDate);
      setOrders([-1, 0, 1]);
    }, 400);
  }, [currentDate, firstDate]);

  return (
    <div className={styles.container}>
      <OnlyHours />
      <div className={styles.days}>
        <EventsDay
          currentDate={getDateBefore(firstDate)}
          order={orders[0]}
          amount={1}
          transition={transition}
        />
        <EventsDay
          currentDate={firstDate}
          order={orders[1]}
          amount={1}
          transition={transition}
        />
        <EventsDay
          currentDate={getDateAfter(firstDate)}
          order={orders[2]}
          amount={1}
          transition={transition}
        />
      </div>
    </div>
  );
};

export default DayHours;