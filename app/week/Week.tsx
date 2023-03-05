'use client';

import React, { useEffect } from 'react';
import styles from './Week.module.scss';
import DateSwitcher from './DateSwitcher';
import WeekHours from './WeekHours';
import { useDateContext } from '../../context/useDateContext';

const Week = () => {
  const { currentDate, setCurrentDate } = useDateContext();

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
