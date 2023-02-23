import React, {
  ChangeEvent,
  FormEvent,
  UIEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './TimePicker.module.scss';

const TimePicker = ({
  setTime,
  initialDate,
}: {
  setTime: (date: Date) => void;
  initialDate: Date;
}) => {
  const [hour, setHour] = useState<number>(0);
  const [minute, setMinute] = useState<number>(0);
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newTime = new Date();
    newTime.setHours(hour, minute);
    setTime(newTime);
  }, [hour, minute, setTime]);

  useEffect(() => {
    if (hourRef.current) {
      hourRef.current.scrollTop = 96;
    }
    if (minuteRef.current) {
      minuteRef.current.scrollTop = 96;
    }
  }, []);

  const handleScrollHour = () => {
    if (hourRef.current) {
      const scrollTop = hourRef.current.scrollTop;

      // infinite scrolling for hours
      if (scrollTop < 64) {
        hourRef.current.scrollTop += 1536;
      } else if (scrollTop > 1600) {
        hourRef.current.scrollTop -= 1536;
      }

      let newHour = Math.floor((scrollTop - 64) / 64);
      if (newHour === -1) newHour = 23;
      else if (newHour === 24) newHour = 0;
      setHour(newHour);
    }
  };

  const handleScrollMinute = () => {
    if (minuteRef.current) {
      const scrollTop = minuteRef.current.scrollTop;

      // infinite scrolling for hours
      if (scrollTop < 64) {
        minuteRef.current.scrollTop += 3840;
      } else if (scrollTop > 3904) {
        minuteRef.current.scrollTop -= 3840;
      }

      let newMinute = Math.floor((scrollTop - 64) / 64);
      if (newMinute === -1) newMinute = 59;
      else if (newMinute === 60) newMinute = 0;
      setMinute(newMinute);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.column} ref={hourRef} onScroll={handleScrollHour}>
        <p style={{ color: hour === 22 ? 'var(--black)' : 'var(--black50)' }}>
          22
        </p>
        <p style={{ color: hour === 23 ? 'var(--black)' : 'var(--black50)' }}>
          23
        </p>
        <p style={{ color: hour === 0 ? 'var(--black)' : 'var(--black50)' }}>
          00
        </p>
        <p style={{ color: hour === 1 ? 'var(--black)' : 'var(--black50)' }}>
          01
        </p>
        <p style={{ color: hour === 2 ? 'var(--black)' : 'var(--black50)' }}>
          02
        </p>
        <p style={{ color: hour === 3 ? 'var(--black)' : 'var(--black50)' }}>
          03
        </p>
        <p style={{ color: hour === 4 ? 'var(--black)' : 'var(--black50)' }}>
          04
        </p>
        <p style={{ color: hour === 5 ? 'var(--black)' : 'var(--black50)' }}>
          05
        </p>
        <p style={{ color: hour === 6 ? 'var(--black)' : 'var(--black50)' }}>
          06
        </p>
        <p style={{ color: hour === 7 ? 'var(--black)' : 'var(--black50)' }}>
          07
        </p>
        <p style={{ color: hour === 8 ? 'var(--black)' : 'var(--black50)' }}>
          08
        </p>
        <p style={{ color: hour === 9 ? 'var(--black)' : 'var(--black50)' }}>
          09
        </p>
        <p style={{ color: hour === 10 ? 'var(--black)' : 'var(--black50)' }}>
          10
        </p>
        <p style={{ color: hour === 11 ? 'var(--black)' : 'var(--black50)' }}>
          11
        </p>
        <p style={{ color: hour === 12 ? 'var(--black)' : 'var(--black50)' }}>
          12
        </p>
        <p style={{ color: hour === 13 ? 'var(--black)' : 'var(--black50)' }}>
          13
        </p>
        <p style={{ color: hour === 14 ? 'var(--black)' : 'var(--black50)' }}>
          14
        </p>
        <p style={{ color: hour === 15 ? 'var(--black)' : 'var(--black50)' }}>
          15
        </p>
        <p style={{ color: hour === 16 ? 'var(--black)' : 'var(--black50)' }}>
          16
        </p>
        <p style={{ color: hour === 17 ? 'var(--black)' : 'var(--black50)' }}>
          17
        </p>
        <p style={{ color: hour === 18 ? 'var(--black)' : 'var(--black50)' }}>
          18
        </p>
        <p style={{ color: hour === 19 ? 'var(--black)' : 'var(--black50)' }}>
          19
        </p>
        <p style={{ color: hour === 20 ? 'var(--black)' : 'var(--black50)' }}>
          20
        </p>
        <p style={{ color: hour === 21 ? 'var(--black)' : 'var(--black50)' }}>
          21
        </p>
        <p style={{ color: hour === 22 ? 'var(--black)' : 'var(--black50)' }}>
          22
        </p>
        <p style={{ color: hour === 23 ? 'var(--black)' : 'var(--black50)' }}>
          23
        </p>
        <p style={{ color: hour === 0 ? 'var(--black)' : 'var(--black50)' }}>
          00
        </p>
        <p style={{ color: hour === 1 ? 'var(--black)' : 'var(--black50)' }}>
          01
        </p>
      </div>
      <div
        className={styles.column}
        ref={minuteRef}
        onScroll={handleScrollMinute}>
        <p style={{ color: minute === 58 ? 'var(--black)' : 'var(--black50)' }}>
          58
        </p>
        <p style={{ color: minute === 59 ? 'var(--black)' : 'var(--black50)' }}>
          59
        </p>
        <p style={{ color: minute === 0 ? 'var(--black)' : 'var(--black50)' }}>
          00
        </p>
        <p style={{ color: minute === 1 ? 'var(--black)' : 'var(--black50)' }}>
          01
        </p>
        <p style={{ color: minute === 2 ? 'var(--black)' : 'var(--black50)' }}>
          02
        </p>
        <p style={{ color: minute === 3 ? 'var(--black)' : 'var(--black50)' }}>
          03
        </p>
        <p style={{ color: minute === 4 ? 'var(--black)' : 'var(--black50)' }}>
          04
        </p>
        <p style={{ color: minute === 5 ? 'var(--black)' : 'var(--black50)' }}>
          05
        </p>
        <p style={{ color: minute === 6 ? 'var(--black)' : 'var(--black50)' }}>
          06
        </p>
        <p style={{ color: minute === 7 ? 'var(--black)' : 'var(--black50)' }}>
          07
        </p>
        <p style={{ color: minute === 8 ? 'var(--black)' : 'var(--black50)' }}>
          08
        </p>
        <p style={{ color: minute === 9 ? 'var(--black)' : 'var(--black50)' }}>
          09
        </p>
        <p style={{ color: minute === 10 ? 'var(--black)' : 'var(--black50)' }}>
          10
        </p>
        <p style={{ color: minute === 11 ? 'var(--black)' : 'var(--black50)' }}>
          11
        </p>
        <p style={{ color: minute === 12 ? 'var(--black)' : 'var(--black50)' }}>
          12
        </p>
        <p style={{ color: minute === 13 ? 'var(--black)' : 'var(--black50)' }}>
          13
        </p>
        <p style={{ color: minute === 14 ? 'var(--black)' : 'var(--black50)' }}>
          14
        </p>
        <p style={{ color: minute === 15 ? 'var(--black)' : 'var(--black50)' }}>
          15
        </p>
        <p style={{ color: minute === 16 ? 'var(--black)' : 'var(--black50)' }}>
          16
        </p>
        <p style={{ color: minute === 17 ? 'var(--black)' : 'var(--black50)' }}>
          17
        </p>
        <p style={{ color: minute === 18 ? 'var(--black)' : 'var(--black50)' }}>
          18
        </p>
        <p style={{ color: minute === 19 ? 'var(--black)' : 'var(--black50)' }}>
          19
        </p>
        <p style={{ color: minute === 20 ? 'var(--black)' : 'var(--black50)' }}>
          20
        </p>
        <p style={{ color: minute === 21 ? 'var(--black)' : 'var(--black50)' }}>
          21
        </p>
        <p style={{ color: minute === 22 ? 'var(--black)' : 'var(--black50)' }}>
          22
        </p>
        <p style={{ color: minute === 23 ? 'var(--black)' : 'var(--black50)' }}>
          23
        </p>
        <p style={{ color: minute === 24 ? 'var(--black)' : 'var(--black50)' }}>
          24
        </p>
        <p style={{ color: minute === 25 ? 'var(--black)' : 'var(--black50)' }}>
          25
        </p>
        <p style={{ color: minute === 26 ? 'var(--black)' : 'var(--black50)' }}>
          26
        </p>
        <p style={{ color: minute === 27 ? 'var(--black)' : 'var(--black50)' }}>
          27
        </p>
        <p style={{ color: minute === 28 ? 'var(--black)' : 'var(--black50)' }}>
          28
        </p>
        <p style={{ color: minute === 29 ? 'var(--black)' : 'var(--black50)' }}>
          29
        </p>
        <p style={{ color: minute === 30 ? 'var(--black)' : 'var(--black50)' }}>
          30
        </p>
        <p style={{ color: minute === 31 ? 'var(--black)' : 'var(--black50)' }}>
          31
        </p>
        <p style={{ color: minute === 32 ? 'var(--black)' : 'var(--black50)' }}>
          32
        </p>
        <p style={{ color: minute === 33 ? 'var(--black)' : 'var(--black50)' }}>
          33
        </p>
        <p style={{ color: minute === 34 ? 'var(--black)' : 'var(--black50)' }}>
          34
        </p>
        <p style={{ color: minute === 35 ? 'var(--black)' : 'var(--black50)' }}>
          35
        </p>
        <p style={{ color: minute === 36 ? 'var(--black)' : 'var(--black50)' }}>
          36
        </p>
        <p style={{ color: minute === 37 ? 'var(--black)' : 'var(--black50)' }}>
          37
        </p>
        <p style={{ color: minute === 38 ? 'var(--black)' : 'var(--black50)' }}>
          38
        </p>
        <p style={{ color: minute === 39 ? 'var(--black)' : 'var(--black50)' }}>
          39
        </p>
        <p style={{ color: minute === 40 ? 'var(--black)' : 'var(--black50)' }}>
          40
        </p>
        <p style={{ color: minute === 41 ? 'var(--black)' : 'var(--black50)' }}>
          41
        </p>
        <p style={{ color: minute === 42 ? 'var(--black)' : 'var(--black50)' }}>
          42
        </p>
        <p style={{ color: minute === 43 ? 'var(--black)' : 'var(--black50)' }}>
          43
        </p>
        <p style={{ color: minute === 44 ? 'var(--black)' : 'var(--black50)' }}>
          44
        </p>
        <p style={{ color: minute === 45 ? 'var(--black)' : 'var(--black50)' }}>
          45
        </p>
        <p style={{ color: minute === 46 ? 'var(--black)' : 'var(--black50)' }}>
          46
        </p>
        <p style={{ color: minute === 47 ? 'var(--black)' : 'var(--black50)' }}>
          47
        </p>
        <p style={{ color: minute === 48 ? 'var(--black)' : 'var(--black50)' }}>
          48
        </p>
        <p style={{ color: minute === 49 ? 'var(--black)' : 'var(--black50)' }}>
          49
        </p>
        <p style={{ color: minute === 50 ? 'var(--black)' : 'var(--black50)' }}>
          50
        </p>
        <p style={{ color: minute === 51 ? 'var(--black)' : 'var(--black50)' }}>
          51
        </p>
        <p style={{ color: minute === 52 ? 'var(--black)' : 'var(--black50)' }}>
          52
        </p>
        <p style={{ color: minute === 53 ? 'var(--black)' : 'var(--black50)' }}>
          53
        </p>
        <p style={{ color: minute === 54 ? 'var(--black)' : 'var(--black50)' }}>
          54
        </p>
        <p style={{ color: minute === 55 ? 'var(--black)' : 'var(--black50)' }}>
          55
        </p>
        <p style={{ color: minute === 56 ? 'var(--black)' : 'var(--black50)' }}>
          56
        </p>
        <p style={{ color: minute === 57 ? 'var(--black)' : 'var(--black50)' }}>
          57
        </p>
        <p style={{ color: minute === 58 ? 'var(--black)' : 'var(--black50)' }}>
          58
        </p>
        <p style={{ color: minute === 59 ? 'var(--black)' : 'var(--black50)' }}>
          59
        </p>
        <p style={{ color: minute === 0 ? 'var(--black)' : 'var(--black50)' }}>
          00
        </p>
        <p style={{ color: minute === 1 ? 'var(--black)' : 'var(--black50)' }}>
          01
        </p>
      </div>
    </div>
  );
};
55555555;
export default TimePicker;
