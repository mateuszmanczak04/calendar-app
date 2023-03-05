'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { useDateContext } from '../../context/useDateContext';
import { useEventsContext } from '../../context/useEventsContext';
import useWindowWidth from '../../hooks/useWindowWidth';
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

type Event = {
  _id: string;
  title: string;
  color: string;
  endTime: number;
  startTime: number;
};

let weekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const Month = () => {
  const { currentDate, monthAhead, monthBack, setCurrentDate } =
    useDateContext();
  const router = useRouter();
  const [weeks, setWeeks] = useState<
    ({
      day: Date;
      events: Event[];
    } | null)[][]
  >([]);
  const { events } = useEventsContext();
  const width = useWindowWidth();

  useEffect(() => {
    if (width >= 900) {
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

  // draw calendar
  useEffect(() => {
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
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

    // add current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
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
      events: Event[];
    } | null)[][] = [[]];
    let currentWeek = 0;

    days.forEach((day: Date | null) => {
      if (day !== null) {
        if (day.getDay() === 1 && weeks[currentWeek].length > 0) {
          currentWeek++;
          weeks.push([]);
        }
        const dayEvents: Event[] = [];
        events.forEach((e) => {
          // compare midnights of current day and event
          const eventDateStart = new Date(e.startTime);
          eventDateStart.setHours(0, 0, 0, 0);

          const eventDateEnd = new Date(e.endTime);
          eventDateEnd.setHours(0, 0, 0, 0);

          const dayDate = day;
          dayDate.setHours(0, 0, 0, 0);

          // add event to every day that it exists
          if (
            eventDateStart.getTime() <= dayDate.getTime() &&
            eventDateEnd.getTime() >= dayDate.getTime()
          ) {
            dayEvents.push(e);
          }
        });
        weeks[currentWeek].push({ day: day, events: dayEvents });
      } else {
        weeks[currentWeek].push(null);
      }
    });

    setWeeks(weeks);
  }, [currentDate, events]);

  const goToDay = (day: Date) => {
    setCurrentDate(day);
    router.push('day');
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h1>
        <div className={styles.buttons}>
          <button onClick={monthBack}>
            <AiOutlineLeft />
          </button>
          <button onClick={monthAhead}>
            <AiOutlineRight />
          </button>
        </div>
      </div>
      <div>
        {/* header - monday, tuesday, wednesday...§ */}
        <div className={styles.header}>
          {weekdays.map((day) => (
            <div className={styles.dayName} key={day}>
              {day}
            </div>
          ))}
        </div>
        {/* days 1-30... */}
        <div className={styles.days}>
          {weeks.map((week, index) => (
            // one row with single week
            <div className={styles.row} key={index}>
              {week.map((day, i) => (
                <div className={styles.day} key={i}>
                  {/* day number in paragraph */}
                  <p
                    className={styles.number}
                    onClick={() => day && goToDay(day.day)}>
                    {day && day.day.getDate()}
                  </p>
                  {/* day events */}
                  <div className={styles.events}>
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
