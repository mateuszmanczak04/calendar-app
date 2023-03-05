import React from 'react';
import styles from './Day.module.scss';
import SmallCalendar from './SmallCalendar';
import DayHours from './DayHours';
import DateSwitcher from './DateSwitcher';

const Day = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <DateSwitcher />
        <DayHours />
      </div>
      <div className={styles.right}>
        <SmallCalendar />
      </div>
    </div>
  );
};

export default Day;
