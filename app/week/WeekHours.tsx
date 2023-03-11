import React, { useEffect, useState } from 'react';
import styles from './WeekHours.module.scss';
import EventsDay from './EventsDay';
import OnlyHours from './OnlyHours';
import { useSelector, useStore } from 'react-redux';
import { getCurrentDate, getDateBefore, getDateAfter } from '../../redux/date';

const AMOUNT = 7;

const WeekHours = () => {
  const currentDate = useSelector(getCurrentDate);

  const [firstDate, setFirstDate] = useState(currentDate);
  const [orders, setOrders] = useState([
    -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
  ]);
  const [transition, setTransition] = useState('0.4s ease');

  useEffect(() => {
    const currentDateMidnight = new Date(currentDate);
    currentDateMidnight.setHours(0, 0, 0, 0);

    const firstDateMidnight = new Date(firstDate);
    firstDateMidnight.setHours(0, 0, 0, 0);

    if (currentDateMidnight.getTime() === firstDateMidnight.getTime()) {
      return;
    }

    setTransition('0.4s ease');
    if (
      // 7 days move
      currentDateMidnight.getTime() + 7 * 24 * 60 * 60 * 1000 ===
        firstDateMidnight.getTime() ||
      currentDateMidnight.getTime() - 7 * 24 * 60 * 60 * 1000 ===
        firstDateMidnight.getTime()
    ) {
      if (firstDateMidnight > currentDateMidnight) {
        // go back
        setOrders((prevOrders) => prevOrders.map((o) => o + 7));
      } else if (firstDateMidnight < currentDateMidnight) {
        // go forward
        setOrders((prevOrders) => prevOrders.map((o) => o - 7));
      }
    } else if (
      // 1 day move
      currentDateMidnight.getTime() + 1 * 24 * 60 * 60 * 1000 ===
        firstDateMidnight.getTime() ||
      currentDateMidnight.getTime() - 1 * 24 * 60 * 60 * 1000 ===
        firstDateMidnight.getTime()
    ) {
      if (firstDateMidnight > currentDateMidnight) {
        // go back
        setOrders((prevOrders) => prevOrders.map((o) => o + 1));
      } else if (firstDateMidnight < currentDateMidnight) {
        // go forward
        setOrders((prevOrders) => prevOrders.map((o) => o - 1));
      }
    }

    setTimeout(() => {
      setTransition('0s');
      setFirstDate(currentDate);
      setOrders([
        -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
        13,
      ]);
    }, 400);
  }, [currentDate, firstDate]);

  return (
    <div className={styles.container}>
      <OnlyHours />
      <div className={styles.days}>
        <EventsDay
          currentDate={getDateBefore(firstDate, 7)}
          order={orders[0]}
          amount={AMOUNT}
          transition={transition}
        />
        <EventsDay
          currentDate={getDateBefore(firstDate, 6)}
          order={orders[1]}
          amount={AMOUNT}
          transition={transition}
        />
        <EventsDay
          currentDate={getDateBefore(firstDate, 5)}
          order={orders[2]}
          amount={AMOUNT}
          transition={transition}
        />
        <EventsDay
          currentDate={getDateBefore(firstDate, 4)}
          order={orders[3]}
          amount={AMOUNT}
          transition={transition}
        />
        <EventsDay
          currentDate={getDateBefore(firstDate, 3)}
          order={orders[4]}
          amount={AMOUNT}
          transition={transition}
        />
        <EventsDay
          currentDate={getDateBefore(firstDate, 2)}
          order={orders[5]}
          amount={AMOUNT}
          transition={transition}
        />
        <EventsDay
          currentDate={getDateBefore(firstDate, 1)}
          order={orders[6]}
          amount={AMOUNT}
          transition={transition}
        />
        <EventsDay
          currentDate={firstDate}
          order={orders[7]}
          amount={AMOUNT}
          transition={transition}
        />
        <EventsDay
          currentDate={getDateAfter(firstDate, 1)}
          order={orders[8]}
          amount={AMOUNT}
          transition={transition}
        />
        <EventsDay
          currentDate={getDateAfter(firstDate, 2)}
          order={orders[9]}
          amount={AMOUNT}
          transition={transition}
        />
        <EventsDay
          currentDate={getDateAfter(firstDate, 3)}
          order={orders[10]}
          amount={AMOUNT}
          transition={transition}
        />
        <EventsDay
          currentDate={getDateAfter(firstDate, 4)}
          order={orders[11]}
          amount={AMOUNT}
          transition={transition}
        />
        <EventsDay
          currentDate={getDateAfter(firstDate, 5)}
          order={orders[12]}
          amount={AMOUNT}
          transition={transition}
        />
        <EventsDay
          currentDate={getDateAfter(firstDate, 6)}
          order={orders[13]}
          amount={AMOUNT}
          transition={transition}
        />
        <EventsDay
          currentDate={getDateAfter(firstDate, 7)}
          order={orders[14]}
          amount={AMOUNT}
          transition={transition}
        />
        <EventsDay
          currentDate={getDateAfter(firstDate, 8)}
          order={orders[15]}
          amount={AMOUNT}
          transition={transition}
        />
        <EventsDay
          currentDate={getDateAfter(firstDate, 9)}
          order={orders[16]}
          amount={AMOUNT}
          transition={transition}
        />
        <EventsDay
          currentDate={getDateAfter(firstDate, 10)}
          order={orders[17]}
          amount={AMOUNT}
          transition={transition}
        />
        <EventsDay
          currentDate={getDateAfter(firstDate, 11)}
          order={orders[18]}
          amount={AMOUNT}
          transition={transition}
        />
        <EventsDay
          currentDate={getDateAfter(firstDate, 12)}
          order={orders[19]}
          amount={AMOUNT}
          transition={transition}
        />
        <EventsDay
          currentDate={getDateAfter(firstDate, 13)}
          order={orders[20]}
          amount={AMOUNT}
          transition={transition}
        />
      </div>
    </div>
  );
};

export default WeekHours;
