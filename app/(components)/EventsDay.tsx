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
        left: `calc(100% / ${amount} * ${order})`,
        transition: transition,
      }}>
      <OnlyLines />
      <Events currentDate={currentDate} />
    </div>
  );
};

export default EventsDay;
