import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDateContext } from '../../../context/useDateContext';
import DatePicker from './DatePicker';
import styles from './DateAndTimePicker.module.scss';
import { useOnClickOutside } from '../../../lib/useOnClickOutside';
import TimePicker from './TimePicker';

const DateAndTimePicker = ({ setDate }: { setDate: (date: Date) => void }) => {
  const { currentDate: initialDate } = useDateContext();
  const [displayDate, setDisplayDate] = useState<string>('');
  const [displayTime, setDisplayTime] = useState<string>('');
  const [year, setYear] = useState(initialDate.getFullYear());
  const [month, setMonth] = useState(initialDate.getMonth());
  const [day, setDay] = useState(initialDate.getDate());
  const [hour, setHour] = useState(new Date().getHours());
  const [minute, setMinute] = useState(
    new Date().getMinutes() - (new Date().getMinutes() % 5)
  );

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  const datePickerRef = useRef(null);
  const timePickerRef = useRef(null);

  // change display on change of any time property
  useEffect(() => {
    setDisplayDate(
      `${year}.${('0' + (month + 1)).slice(-2)}.${('0' + day).slice(-2)}`
    );
    setDisplayTime(`${('0' + hour).slice(-2)}:${('0' + minute).slice(-2)}`);
  }, [year, month, day, hour, minute]);

  const handleSetDate = useCallback(
    (date: Date) => {
      setYear(date.getFullYear());
      setMonth(date.getMonth());
      setDay(date.getDate());

      setDate(new Date(year, month, day, hour, minute));
    },
    [year, month, day, hour, minute, setDate]
  );

  const handleSetTime = useCallback(
    (date: Date) => {
      setHour(date.getHours());
      setMinute(date.getMinutes());

      setDate(new Date(year, month, day, hour, minute));
    },
    [year, month, day, hour, minute, setDate]
  );

  // opening and closing date picker
  useOnClickOutside(datePickerRef, () => {
    setIsDatePickerOpen(false);
  });

  const handleToggleDatePicker = () => {
    if (datePickerRef.current) {
      setIsDatePickerOpen(false);
    } else {
      setIsDatePickerOpen(true);
    }
  };

  // opening and closing time picker
  useOnClickOutside(timePickerRef, () => {
    setIsTimePickerOpen(false);
  });

  const handleToggleTimePicker = () => {
    if (timePickerRef.current) {
      setIsTimePickerOpen(false);
    } else {
      setIsTimePickerOpen(true);
    }
  };

  return (
    <motion.div className={styles.container}>
      <DatePicker
        setDate={handleSetDate}
        initialDate={new Date(year, month, day)}
      />
      <TimePicker
        setTime={handleSetTime}
        initialDate={new Date(year, month, day, hour, minute)}
      />
    </motion.div>
  );
};

export default DateAndTimePicker;
