'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useEventsContext } from '../../../context/useEventsContext';
import useWindowWidth from '../../../hooks/useWindowWidth';
import { getDateSlug } from '../../../lib/getDateSlug';
import styles from './Month.module.scss';

const monthNames = [
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

let weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const Month = ({ date: initialDate }: { date: string }) => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(initialDate));
  const router = useRouter();
  const [weeks, setWeeks] = useState<
    ({
      day: Date;
      events: {
        _id: string;
        title: string;
        color: string;
        endTime: number;
        startTime: number;
      }[];
    } | null)[][]
  >([]);
  const { events } = useEventsContext();
  const width = useWindowWidth();

  useEffect(() => {
    if (screen.width >= 900) {
      weekdays = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ];
    } else {
      weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    }
  }, [width]);

  useEffect(() => {
    const firstDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );
    const daysInMonth = lastDayOfMonth.getDate();

    const days = [];

    // add first empty days (previous month)
    switch (firstDayOfMonth.getDay()) {
      case 1:
        break;
      case 2:
        days.push(null);
        break;
      case 3:
        days.push(null, null);
        break;
      case 4:
        days.push(null, null, null);
        break;
      case 5:
        days.push(null, null, null, null);
        break;
      case 6:
        days.push(null, null, null, null, null);
        break;
      case 0:
        days.push(null, null, null, null, null, null);
        break;
      default:
        break;
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i)
      );
    }

    // add finishing empty days (next month)
    switch (lastDayOfMonth.getDay()) {
      case 0:
        break;
      case 6:
        days.push(null);
        break;
      case 5:
        days.push(null, null);
        break;
      case 4:
        days.push(null, null, null);
        break;
      case 3:
        days.push(null, null, null, null);
        break;
      case 2:
        days.push(null, null, null, null, null);
        break;
      case 1:
        days.push(null, null, null, null, null, null);
        break;
      default:
        break;
    }

    const weeks: ({
      day: Date;
      events: {
        _id: string;
        title: string;
        color: string;
        endTime: number;
        startTime: number;
      }[];
    } | null)[][] = [[]];
    let currentWeek = 0;

    days.forEach((day: Date | null) => {
      if (day !== null) {
        if (day.getDay() === 1 && weeks[currentWeek].length > 0) {
          currentWeek++;
          weeks.push([]);
        }
        const dayEvents: {
          _id: string;
          title: string;
          color: string;
          endTime: number;
          startTime: number;
        }[] = [];
        events.forEach((e) => {
          const eDate = new Date(e.startTime);
          eDate.setHours(0, 0, 0, 0);
          const dayDate = day;
          dayDate.setHours(0, 0, 0, 0);
          // if event starts in current day
          if (eDate.getTime() === dayDate.getTime()) {
            dayEvents.push(e);
          }
        });
        weeks[currentWeek].push({ day: day, events: dayEvents });
      } else {
        weeks[currentWeek].push(null);
      }
    });

    setWeeks(weeks);
  }, [currentMonth, events]);

  const handlePrevMonth = () => {
    setCurrentMonth((prev: Date) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      window.history.replaceState(
        null,
        'Calendar App',
        `/month/${newDate.getFullYear()}-${newDate.getMonth() + 1}`
      );
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev: Date) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      window.history.replaceState(
        null,
        'Calendar App',
        `/month/${newDate.getFullYear()}-${newDate.getMonth() + 1}`
      );
      return newDate;
    });
  };

  const goToDay = (day: Date) => {
    const slug = getDateSlug(day);
    router.push('day/' + slug);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1>
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h1>
        <div className={styles.buttons}>
          <button onClick={handlePrevMonth}>
            <AiOutlineLeft />
          </button>
          <button onClick={handleNextMonth}>
            <AiOutlineRight />
          </button>
        </div>
      </div>
      <div>
        <div className={styles.header}>
          {weekdays.map((day) => (
            <div className={styles.dayName} key={day}>
              {day}
            </div>
          ))}
        </div>
        <div className={styles.days}>
          {weeks.map((week, index) => (
            <div className={styles.row} key={index}>
              {week.map((day, i) => (
                <div
                  className={styles.day}
                  key={i}
                  onClick={() => day && goToDay(day.day)}>
                  <p className={styles.number}>{day && day.day.getDate()}</p>
                  <div
                    className={styles.events}
                    style={{ flexDirection: width >= 600 ? 'column' : 'row' }}>
                    {day &&
                      day.events.map((e) => (
                        <p
                          className={styles.event}
                          key={e._id}
                          style={{ background: e.color }}>
                          {width >= 900 ? e.title : ''}
                        </p>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Month;
