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

const EventsDay = ({ currentDate, order, amount, transition }: Props) => {
  return (
    <div
      className={styles.day}
      style={{
        width: `calc(100% / ${amount})`,
        left: '0',
        transform: `translateX(${order * 100}%)`,
        transition: transition,
      }}>
      <OnlyLines />
      <Events currentDate={currentDate} />
    </div>
  );
};

export default EventsDay;
