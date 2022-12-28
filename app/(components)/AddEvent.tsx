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
        <button
          disabled={!title || !startTime || !endTime || startTime > endTime}
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
