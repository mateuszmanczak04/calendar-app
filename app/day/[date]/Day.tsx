'use client';

import React, { useEffect } from 'react';
import styles from './Day.module.scss';
import SmallCalendar from '../../(components)/SmallCalendar';
import DayHours from './DayHours';
import DateSwitcher from './DateSwitcher';
import { useRouter, useSearchParams } from 'next/navigation';
import moment from 'moment';
import { useDateContext } from '../../../context/useDateContext';

const Day = ({ date: initialDate }: { date: string }) => {
  const router = useRouter();
  const { setCurrentDate } = useDateContext();

  useEffect(() => {
    const isValidDate = moment(initialDate, 'YYYY-MM-DD').isValid();

    if (!initialDate || !isValidDate) {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();
      const day = today.getDate();
      const slug = year + '-' + (month + 1) + '-' + day;
      router.replace(`/day/${slug}`);
    }
    setCurrentDate(moment(initialDate, 'YYYY-MM-DD').toDate());
  }, [router, initialDate, setCurrentDate]);

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
