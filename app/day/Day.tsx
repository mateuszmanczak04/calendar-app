'use client';

import React, { useState } from 'react';
import styles from './Day.module.scss';
import RightCalendar from './RightCalendar';
import DayHours from './DayHours';
import DateSwitcher from './DateSwitcher';
import { useDateContext } from '../../context/useDateContext';

const Day = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <DateSwitcher />
        <DayHours />
      </div>
      <div className={styles.right}>
        <RightCalendar />
      </div>
    </div>
  );
};

export default Day;
