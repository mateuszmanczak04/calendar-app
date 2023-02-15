'use client';

import React, { useEffect } from 'react';
import styles from './Week.module.scss';
import SmallCalendar from './SmallCalendar';
// import DayHours from './DayHours';
import DateSwitcher from './DateSwitcher';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import { useDateContext } from '../../../context/useDateContext';
import { getDateSlug } from '../../../lib/getDateSlug';
import WeekHours from './WeekHours';
import WeekDays from './WeekDays';

const Week = ({ date: initialDate }: { date: string }) => {
  const router = useRouter();
  const { currentDate, setCurrentDate } = useDateContext();

  useEffect(() => {
    const isValidDate = moment(initialDate, 'YYYY-MM-DD').isValid();
    if (isValidDate) {
      setCurrentDate(new Date(initialDate));
      const monday = new Date(initialDate);
      monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
      setCurrentDate(monday);
    } else {
      const monday = new Date();
      monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
      setCurrentDate(monday);
      setCurrentDate(new Date(monday));
    }
  }, [initialDate, setCurrentDate]);

  useEffect(() => {
    const monday = new Date(currentDate);
    monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
    window.history.replaceState(
      null,
      'Calendar App',
      `/week/${getDateSlug(monday)}`
    );
  }, [router, currentDate]);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <DateSwitcher />
        <WeekDays />
        <WeekHours />
      </div>
      <div className={styles.right}>
        <SmallCalendar />
      </div>
    </div>
  );
};

export default Week;
