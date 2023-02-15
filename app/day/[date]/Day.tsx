'use client';

import React, { useEffect } from 'react';
import styles from './Day.module.scss';
import SmallCalendar from './SmallCalendar';
import DayHours from './DayHours';
import DateSwitcher from './DateSwitcher';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { useDateContext } from '../../../context/useDateContext';
import { getDateSlug } from '../../../lib/getDateSlug';

const Day = ({ date: initialDate }: { date: string }) => {
  const router = useRouter();
  const { setCurrentDate, currentDate } = useDateContext();

  useEffect(() => {
    const isValidDate = moment(initialDate, 'YYYY-MM-DD').isValid();
    if (isValidDate) {
      setCurrentDate(new Date(initialDate));
    } else {
      setCurrentDate(new Date());
    }
  }, [initialDate, setCurrentDate]);

  useEffect(() => {
    window.history.replaceState(
      null,
      'Calendar App',
      `/day/${getDateSlug(currentDate)}`
    );
  }, [router, currentDate]);

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
