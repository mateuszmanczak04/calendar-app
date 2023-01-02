'use client';

import React, { useCallback, useState } from 'react';
import { useEventsContext } from '../../context/useEventsContext';
import styles from './AddEvent.module.scss';
import DateAndTimePicker from './DateAndTimePicker';

const AddEvent = ({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) => {
  const [title, setTitle] = useState<string>('');
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [color, setColor] = useState('#AB0A8D');
  const { addEvent } = useEventsContext();

  const handleSubmit = async () => {
    const startTimeNumber = startTime.getTime();
    const endTimeNumber = endTime.getTime();

    addEvent({
      _id: Math.random().toString(),
      title,
      startTime: startTimeNumber,
      endTime: endTimeNumber,
      color,
    });
    close();
  };

  return (
    <div className={styles.container}>
      <div className={styles.backdrop} onClick={close}></div>
      <div className={styles.content}>
        <input
          type='text'
          placeholder='Title...'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className={styles.times}>
          <div className={styles.label}>
            <h3>Start Time</h3>
            <DateAndTimePicker
              setDate={useCallback((date) => {
                setStartTime(date);
              }, [])}
            />
          </div>
          <div className={styles.label}>
            <h3>End Time</h3>
            <DateAndTimePicker
              setDate={useCallback((date) => {
                setEndTime(date);
              }, [])}
            />
          </div>
        </div>
        <div className={styles.colors}>
          <div className={styles.row}>
            <div
              className={`${styles.color} ${
                color === '#AB0A8D' && styles.active
              }`}
              style={{ background: '#AB0A8D' }}
              onClick={() => setColor('#AB0A8D')}></div>
            <div
              className={`${styles.color} ${
                color === '#F7D740' && styles.active
              }`}
              style={{ background: '#F7D740' }}
              onClick={() => setColor('#F7D740')}></div>
            <div
              className={`${styles.color} ${
                color === '#F728D1' && styles.active
              }`}
              style={{ background: '#F728D1' }}
              onClick={() => setColor('#F728D1')}></div>
            <div
              className={`${styles.color} ${
                color === '#0FF7EC' && styles.active
              }`}
              style={{ background: '#0FF7EC' }}
              onClick={() => setColor('#0FF7EC')}></div>
            <div
              className={`${styles.color} ${
                color === '#13ABA4' && styles.active
              }`}
              style={{ background: '#13ABA4' }}
              onClick={() => setColor('#13ABA4')}></div>
          </div>
        </div>
        <button
          disabled={
            !title || !startTime || !endTime || startTime >= endTime || !color
          }
          onClick={handleSubmit}>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddEvent;
