'use client';

import React, { useState } from 'react';
import { useEventsContext } from '../../context/useEventsContext';
import styles from './Day.module.scss';
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlinePlus,
  AiOutlineMinus,
} from 'react-icons/ai';
import RightCalendar from './RightCalendar';

const Day = () => {
  const { events } = useEventsContext();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [rowHeight, setRowHeight] = useState<number>(32);

  const handleNextDay = () => {
    const currentDateInMilliseconds = currentDate.getTime();
    const nextDateInMilliseconds =
      currentDateInMilliseconds + 24 * 60 * 60 * 1000;
    const nextDate = new Date(nextDateInMilliseconds);
    setCurrentDate(nextDate);
  };

  const handlePreviousDay = () => {
    const currentDateInMilliseconds = currentDate.getTime();
    const previousDateInMilliseconds =
      currentDateInMilliseconds - 24 * 60 * 60 * 1000;
    const previousDate = new Date(previousDateInMilliseconds);
    setCurrentDate(previousDate);
  };

  const handleZoomIn = () => {
    if (rowHeight >= 128) {
      return;
    }
    setRowHeight((prev) => prev + 8);
  };

  const handleZoomOut = () => {
    if (rowHeight <= 32) {
      return;
    }
    setRowHeight((prev) => prev - 8);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.menu}>
          <button onClick={handleZoomOut}>
            <AiOutlineMinus />
          </button>
          <button onClick={handlePreviousDay}>
            <AiOutlineArrowLeft />
          </button>
          <p>{currentDate?.toLocaleDateString('en-US')}</p>
          <button onClick={handleNextDay}>
            <AiOutlineArrowRight />
          </button>
          <button onClick={handleZoomIn}>
            <AiOutlinePlus />
          </button>
        </div>
        <div className={styles.hoursContainer}>
          <div className={styles.hours} style={{ height: 24 * rowHeight }}>
            <div className={styles.hourRow}>
              <p>00:00</p>
            </div>
            <div className={styles.hourRow}>
              <p>01:00</p>
            </div>
            <div className={styles.hourRow}>
              <p>02:00</p>
            </div>
            <div className={styles.hourRow}>
              <p>03:00</p>
            </div>
            <div className={styles.hourRow}>
              <p>04:00</p>
            </div>
            <div className={styles.hourRow}>
              <p>05:00</p>
            </div>
            <div className={styles.hourRow}>
              <p>06:00</p>
            </div>
            <div className={styles.hourRow}>
              <p>07:00</p>
            </div>
            <div className={styles.hourRow}>
              <p>08:00</p>
            </div>
            <div className={styles.hourRow}>
              <p>09:00</p>
            </div>
            <div className={styles.hourRow}>
              <p>10:00</p>
            </div>
            <div className={styles.hourRow}>
              <p>11:00</p>
            </div>
            <div className={styles.hourRow}>
              <p>12:00</p>
            </div>
            <div className={styles.hourRow}>
              <p>13:00</p>
            </div>
            <div className={styles.hourRow}>
              <p>14:00</p>
            </div>
            <div className={styles.hourRow}>
              <p>15:00</p>
            </div>
            <div className={styles.hourRow}>
              <p>16:00</p>
            </div>
            <div className={styles.hourRow}>
              <p>17:00</p>
            </div>
            <div className={styles.hourRow}>
              <p>18:00</p>
            </div>
            <div className={styles.hourRow}>
              <p>19:00</p>
            </div>
            <div className={styles.hourRow}>
              <p>20:00</p>
            </div>
            <div className={styles.hourRow}>
              <p>21:00</p>
            </div>
            <div className={styles.hourRow}>
              <p>22:00</p>
            </div>
            <div className={styles.hourRow}>
              <p>23:00</p>
            </div>
            <div className={styles.events}>
              {events.map((event) => {
                const { _id, startTime, title, endTime } = event;

                const startDate = new Date(startTime);
                const startHour = startDate.getHours();
                const startMinute = startDate.getMinutes();

                const endDate = new Date(endTime);
                const endHour = endDate.getHours();
                const endMinute = endDate.getMinutes();

                const currentDateMidnight = new Date(currentDate);
                currentDateMidnight.setHours(0, 0, 0, 0);

                const nextDateMidnight = new Date(currentDate);
                nextDateMidnight.setDate(nextDateMidnight.getDate() + 1);
                nextDateMidnight.setHours(0, 0, 0, 0);

                let yOffset = 0;
                let height = 0;

                // if event starts later than on currently set day
                if (startDate >= nextDateMidnight) {
                  return null;
                }

                // if event ends before currently set day
                if (endDate <= currentDateMidnight) {
                  return null;
                }

                // if starts on currently set day
                if (
                  startDate >= currentDateMidnight &&
                  startDate < nextDateMidnight
                ) {
                  // for example 9:30 is 9.5
                  const startTime = startHour + startMinute / 60;
                  // distance from top in pixels
                  yOffset = startTime * rowHeight;
                } else {
                  yOffset = 0;
                }

                if (endDate < nextDateMidnight) {
                  // if event ends on currently set day

                  const endTime = endHour + endMinute / 60;
                  const duration = endTime;

                  height = duration * rowHeight - yOffset;
                } else if (endDate >= nextDateMidnight) {
                  // if event lasts longer than currently set day
                  height = 24 * rowHeight - yOffset;
                }

                return (
                  <div
                    key={_id}
                    className={styles.event}
                    style={{
                      top: yOffset + 'px',
                      height: height + 'px',
                    }}>
                    {title}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <RightCalendar
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
      </div>
    </div>
  );
};

export default Day;
