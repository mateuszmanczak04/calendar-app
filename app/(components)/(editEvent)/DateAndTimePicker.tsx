import React, { useState } from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import styles from './DateAndTimePicker.module.scss';

const DateAndTimePicker = ({
  date,
  setDate,
  maxDate,
  minDate,
}: {
  date: Date;
  setDate: (date: Date) => void;
  maxDate?: Date;
  minDate?: Date;
}) => {
  const yearUp = () => {
    const newDate = new Date(date);
    newDate.setFullYear(date.getFullYear() - 1);
    if (maxDate && newDate >= maxDate) {
      return;
    }
    if (minDate && newDate <= minDate) {
      return;
    }
    setDate(newDate);
  };

  const yearDown = () => {
    const newDate = new Date(date);
    newDate.setFullYear(date.getFullYear() + 1);
    if (maxDate && newDate >= maxDate) {
      return;
    }
    if (minDate && newDate <= minDate) {
      return;
    }
    setDate(newDate);
  };

  const monthUp = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() - 1);
    if (maxDate && newDate >= maxDate) {
      return;
    }
    if (minDate && newDate <= minDate) {
      return;
    }
    setDate(newDate);
  };

  const monthDown = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + 1);
    if (maxDate && newDate >= maxDate) {
      return;
    }
    if (minDate && newDate <= minDate) {
      return;
    }
    setDate(newDate);
  };

  const dayUp = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() - 1);
    if (maxDate && newDate >= maxDate) {
      return;
    }
    if (minDate && newDate <= minDate) {
      return;
    }
    setDate(newDate);
  };

  const dayDown = () => {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + 1);
    if (maxDate && newDate >= maxDate) {
      return;
    }
    if (minDate && newDate <= minDate) {
      return;
    }
    setDate(newDate);
  };

  const hourDown = () => {
    const newDate = new Date(date);
    newDate.setHours(date.getHours() + 1);
    if (maxDate && newDate >= maxDate) {
      return;
    }
    if (minDate && newDate <= minDate) {
      return;
    }
    setDate(newDate);
  };

  const hourUp = () => {
    const newDate = new Date(date);
    newDate.setHours(date.getHours() - 1);
    if (maxDate && newDate >= maxDate) {
      return;
    }
    if (minDate && newDate <= minDate) {
      return;
    }
    setDate(newDate);
  };

  const minuteDown = () => {
    const newDate = new Date(date);
    newDate.setMinutes(date.getMinutes() + 1);
    if (maxDate && newDate >= maxDate) {
      return;
    }
    if (minDate && newDate <= minDate) {
      return;
    }
    setDate(newDate);
  };

  const minuteUp = () => {
    const newDate = new Date(date);
    newDate.setMinutes(date.getMinutes() - 1);
    if (maxDate && newDate >= maxDate) {
      return;
    }
    if (minDate && newDate <= minDate) {
      return;
    }
    setDate(newDate);
  };

  return (
    <div className={styles.container}>
      <div className={styles.group}>
        <div className={styles.column}>
          <div className={styles.arrow} onClick={yearUp}>
            <AiFillCaretUp />
          </div>
          <p>{date.getFullYear()}</p>
          <div className={styles.arrow} onClick={yearDown}>
            <AiFillCaretDown />
          </div>
        </div>
        <p>-</p>
        <div className={styles.column}>
          <div className={styles.arrow} onClick={monthUp}>
            <AiFillCaretUp />
          </div>
          <p>{('0' + (date.getMonth() + 1)).slice(-2)}</p>
          <div className={styles.arrow} onClick={monthDown}>
            <AiFillCaretDown />
          </div>
        </div>
        <p>-</p>
        <div className={styles.column}>
          <div className={styles.arrow} onClick={dayUp}>
            <AiFillCaretUp />
          </div>
          <p>{('0' + date.getDate()).slice(-2)}</p>
          <div className={styles.arrow} onClick={dayDown}>
            <AiFillCaretDown />
          </div>
        </div>
      </div>
      <div className={styles.group}>
        <div className={styles.column}>
          <div className={styles.arrow} onClick={hourUp}>
            <AiFillCaretUp />
          </div>
          <p>{('0' + (date.getUTCHours() + 1)).slice(-2)}</p>
          <div className={styles.arrow} onClick={hourDown}>
            <AiFillCaretDown />
          </div>
        </div>
        <p>:</p>
        <div className={styles.column}>
          <div className={styles.arrow} onClick={minuteUp}>
            <AiFillCaretUp />
          </div>
          <p>{('0' + date.getMinutes()).slice(-2)}</p>
          <div className={styles.arrow} onClick={minuteDown}>
            <AiFillCaretDown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateAndTimePicker;
