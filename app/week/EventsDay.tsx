import React from 'react';
import Events from './Events';
import styles from './EventsDay.module.scss';
import OnlyLines from './OnlyLines';

type Props = {
  currentDate: Date;
  order: number;
  amount: number;
  transition: string;
};

const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const EventsDay = ({ currentDate, order, amount, transition }: Props) => {
  const getDateSlug = () => {
    let month = (currentDate.getMonth() + 1).toString();
    if (month.length < 2) {
      month = '0' + month;
    }

    let day = currentDate.getDate().toString();
    if (day.length < 2) {
      day = '0' + day;
    }

    return month + '/' + day;
  };

  const getWeekDay = () => {
    const weekday = weekdays[currentDate.getDay()];
    return weekday;
  };

  return (
    <div
      className={styles.day}
      style={{
        width: `calc(100% / ${amount})`,
        left: '0',
        transform: `translateX(${order * 100}%)`,
        transition: transition,
      }}>
      <div className={styles.weekday}>
        <p>{getWeekDay()}</p>
        <p>{getDateSlug()}</p>
      </div>
      <div className={styles.eventsContainer}>
        <OnlyLines />
        <Events currentDate={currentDate} />
      </div>
    </div>
  );
};

export default EventsDay;
