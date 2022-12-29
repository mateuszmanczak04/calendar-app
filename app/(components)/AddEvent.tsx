'use client';

import React, { useState } from 'react';
import { useEventsContext } from '../../context/useEventsContext';
import styles from './AddEvent.module.scss';

const AddEvent = ({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) => {
  const [title, setTitle] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const [color, setColor] = useState('#AB0A8D');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { addEvent, events } = useEventsContext();

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    const startTimeNumber = new Date(startTime).getTime();
    const endTimeNumber = new Date(endTime).getTime();

    const res = await fetch('/api/add-event', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        startTime: startTimeNumber,
        endTime: endTimeNumber,
        color,
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.message);
      setLoading(false);
      return;
    }

    addEvent(json.event);
    setLoading(false);
    close();
  };

  return (
    <div className={styles.container}>
      <div className={styles.backdrop} onClick={close}></div>
      <div className={styles.content}>
        <label>
          <p>Title</p>
          <input
            type='text'
            placeholder='Title...'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <p>Start Time</p>
          <input
            type='datetime-local'
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>
        <label>
          <p>End Time</p>
          <input
            type='datetime-local'
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </label>
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
            !title || !startTime || !endTime || startTime > endTime || !color
          }
          onClick={handleSubmit}>
          Add
        </button>
        {error && <p>{error}</p>}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default AddEvent;
