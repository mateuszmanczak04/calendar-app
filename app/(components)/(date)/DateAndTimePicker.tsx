import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';
import DatePicker from './DatePicker';
import styles from './DateAndTimePicker.module.scss';
import TimePicker from './TimePicker';

const DateAndTimePicker = ({
  setDate,
  date,
  now,
}: {
  setDate: (date: Date) => void;
  date: Date;
  now: boolean;
}) => {
  const [year, setYear] = useState<number>(date.getFullYear());
  const [month, setMonth] = useState<number>(date.getMonth());
  const [day, setDay] = useState<number>(date.getDate());
  const [hour, setHour] = useState<number>(date.getHours());
  const [minute, setMinute] = useState<number>(date.getMinutes());

  const handleSetDate = useCallback(
    (year: number, month: number, day: number) => {
      setYear(year);
      setMonth(month);
      setDay(day);
    },
    []
  );

  const setHourAndMinute = useCallback((hour: number, minute: number) => {
    setHour(hour);
    setMinute(minute);
  }, []);

  useEffect(() => {
    setDate(new Date(year, month, day, hour, minute, 0));
  }, [year, month, day, hour, minute, setDate]);

  return (
    <motion.div className={styles.container}>
      <DatePicker setDate={handleSetDate} date={date} />
      <TimePicker setHourAndMinute={setHourAndMinute} date={date} now={now} />
    </motion.div>
  );
};

export default DateAndTimePicker;
