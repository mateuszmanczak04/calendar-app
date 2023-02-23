'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useEventsContext } from '../../../context/useEventsContext';
import styles from './AddEvent.module.scss';
import DateAndTimePicker from './DateAndTimePicker';
import { MdClose } from 'react-icons/md';
import { AnimatePresence, motion } from 'framer-motion';

const AddEvent = ({ close }: { close: () => void }) => {
  const [title, setTitle] = useState<string>('');
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [color, setColor] = useState('#AB0A8D');
  const { addEvent } = useEventsContext();

  const handleSubmit = async () => {
    const startTimeNumber =
      startTime.getTime() - (startTime.getTime() % 300000);
    const endTimeNumber = endTime.getTime() - (endTime.getTime() % 300000);

    addEvent({
      _id: Math.random().toString(),
      title,
      startTime: startTimeNumber,
      endTime: endTimeNumber,
      color,
    });
    close();
  };

  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };

    window.addEventListener('keydown', escHandler);

    return () => window.removeEventListener('keydown', escHandler);
  }, []);

  return (
    <div className={styles.container}>
      {/* <div className={styles.backdrop} onClick={close}></div> */}
      <div className={styles.content}>
        <div className={styles.top}>
          <input
            type='text'
            placeholder='Title...'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button onClick={close}>
            <MdClose />
          </button>
        </div>
        <div className={styles.times}>
          <div className={styles.label}>
            <h2>Start Time</h2>
            <DateAndTimePicker
              setDate={useCallback((date) => {
                setStartTime(date);
              }, [])}
            />
          </div>
          <div className={styles.label}>
            <h2>End Time</h2>
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
                color === '#4fe721' && styles.active
              }`}
              style={{ background: '#4fe721' }}
              onClick={() => setColor('#4fe721')}></div>
            <div
              className={`${styles.color} ${
                color === '#F7D740' && styles.active
              }`}
              style={{ background: '#F7D740' }}
              onClick={() => setColor('#F7D740')}></div>
            <div
              className={`${styles.color} ${
                color === '#e885d6' && styles.active
              }`}
              style={{ background: '#e885d6' }}
              onClick={() => setColor('#e885d6')}></div>
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
            <div
              className={`${styles.color} ${
                color === '#e87e2d' && styles.active
              }`}
              style={{ background: '#e87e2d' }}
              onClick={() => setColor('#e87e2d')}></div>
            <div
              className={`${styles.color} ${
                color === '#e85151' && styles.active
              }`}
              style={{ background: '#e85151' }}
              onClick={() => setColor('#e85151')}></div>
          </div>
        </div>
        <button
          disabled={
            !title || !startTime || !endTime || startTime > endTime || !color
          }
          onClick={handleSubmit}>
          Add
        </button>
      </div>
    </div>
  );
};

export default AddEvent;
