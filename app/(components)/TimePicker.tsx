import React, { useEffect, useState } from 'react';
import styles from './TimePicker.module.scss';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';

const TimePicker = ({
  setTime,
  initialDate,
}: {
  setTime: (date: Date) => void;
  initialDate: Date;
}) => {
  const [hour, setHour] = useState(initialDate.getHours());
  const [minute, setMinute] = useState(initialDate.getMinutes());

  const handleHourUp = () => {
    if (hour === 0) {
      setHour(23);
    } else {
      setHour((prev) => prev - 1);
    }
  };

  const handleHourDown = () => {
    if (hour === 23) {
      setHour(0);
    } else {
      setHour((prev) => prev + 1);
    }
  };

  const handleMinuteUp = () => {
    if (minute === 0) {
      setMinute(59);
      handleHourUp();
    } else {
      setMinute((prev) => prev - 1);
    }
  };

  const handleMinuteDown = () => {
    if (minute === 59) {
      setMinute(0);
      handleHourDown();
    } else {
      setMinute((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const newTime = new Date();
    newTime.setHours(hour, minute);
    setTime(newTime);
  }, [hour, minute, setTime]);

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <div className={styles.arrow} onClick={handleHourUp}>
          <AiFillCaretUp />
        </div>
        <h2>{('0' + hour).slice(-2)}</h2>
        <div className={styles.arrow} onClick={handleHourDown}>
          <AiFillCaretDown />
        </div>
      </div>
      <h2>:</h2>
      <div className={styles.column}>
        <div className={styles.arrow} onClick={handleMinuteUp}>
          <AiFillCaretUp />
        </div>
        <h2>{('0' + minute).slice(-2)}</h2>
        <div className={styles.arrow} onClick={handleMinuteDown}>
          <AiFillCaretDown />
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
