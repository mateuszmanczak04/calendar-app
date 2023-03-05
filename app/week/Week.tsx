import React from 'react';
import styles from './Week.module.scss';
import DateSwitcher from './DateSwitcher';
import WeekHours from './WeekHours';

const Week = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <DateSwitcher />
        <WeekHours />
      </div>
    </div>
  );
};

export default Week;
