import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import styles from './DatePicker.module.scss';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DatePicker = ({
  setDate,
  initialDate,
}: {
  setDate: (date: Date) => void;
  initialDate: Date;
}) => {
  const [days, setDays] = useState<JSX.Element[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);

  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );

  const renderCalendar = useCallback(() => {
    setDays([]);

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const lastDateOfMonth = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();

    const lastDayOfMonth = new Date(
      currentYear,
      currentMonth,
      lastDateOfMonth
    ).getDay();

    const lastDateOfLastMonth = new Date(
      currentYear,
      currentMonth,
      0
    ).getDate();

    if (firstDayOfMonth !== 0) {
      for (let i = firstDayOfMonth - 1; i > 0; i--) {
        const year = currentMonth === 0 ? currentYear - 1 : currentYear;
        const month = currentMonth === 0 ? 11 : currentMonth - 1;
        const day = lastDateOfLastMonth - i + 1;

        const liEl = (
          <li
            className={styles.inactive}
            onClick={() => {
              setCurrentDate(new Date(year, month, day));
            }}
            key={Math.random()}>
            {day}
          </li>
        );
        setDays((prev) => [...prev, liEl]);
      }
    } else {
      for (let i = 6; i > 0; i--) {
        const year = currentMonth === 0 ? currentYear - 1 : currentYear;
        const month = currentMonth === 0 ? 11 : currentMonth - 1;
        const day = lastDateOfLastMonth - i + 1;

        const liEl = (
          <li
            className={styles.inactive}
            onClick={() => {
              setCurrentDate(new Date(year, month, day));
            }}
            key={Math.random()}>
            {day}
          </li>
        );
        setDays((prev) => [...prev, liEl]);
      }
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
      const isToday =
        i === currentDate.getDate() &&
        currentMonth === currentDate.getMonth() &&
        currentYear === currentDate.getFullYear()
          ? 'active'
          : '';

      const liEl = (
        <li
          className={styles[isToday]}
          onClick={() => {
            setCurrentDate(new Date(currentYear, currentMonth, i));
          }}
          key={Math.random()}>
          {i}
        </li>
      );
      setDays((prev) => [...prev, liEl]);
    }

    for (let i = lastDayOfMonth; i <= 6; i++) {
      if (lastDayOfMonth === 0) {
        return;
      }

      const year = currentMonth === 11 ? currentYear + 1 : currentYear;
      const month = currentMonth === 11 ? 0 : currentMonth + 1;
      const day = i - lastDayOfMonth + 1;

      const liEl = (
        <li
          className={styles.inactive}
          onClick={() => {
            setCurrentDate(new Date(year, month, day));
          }}
          key={Math.random()}>
          {day}
        </li>
      );
      setDays((prev) => [...prev, liEl]);
    }
  }, [currentMonth, currentYear, currentDate]);

  useEffect(() => {
    setCurrentMonth(currentDate.getMonth());
    setCurrentYear(currentDate.getFullYear());
    setDate(currentDate);
  }, [currentDate, setDate]);

  const handlePrevMonth = () => {
    if (currentMonth <= 0) {
      setCurrentYear((prev) => prev - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth >= 11) {
      setCurrentYear((prev) => prev + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  useEffect(() => {
    renderCalendar();
  }, [renderCalendar]);

  return (
    <div className={styles.container}>
      <header>
        <p className={styles.currentDate}>
          {months[currentMonth]} {currentYear}
        </p>
        <div className={styles.icons}>
          <span onClick={handlePrevMonth}>
            <AiOutlineLeft />
          </span>
          <span onClick={handleNextMonth}>
            <AiOutlineRight />
          </span>
        </div>
      </header>
      <div className={styles.calendar}>
        <ul className={styles.weeks}>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
          <li>Sun</li>
        </ul>
        <ul className={styles.days}>{days}</ul>
      </div>
    </div>
  );
};

export default DatePicker;
