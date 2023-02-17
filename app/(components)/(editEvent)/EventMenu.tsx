import React, { useEffect, useRef, useState } from 'react';
import { useEventsContext } from '../../../context/useEventsContext';
import { useOnClickOutside } from '../../../lib/useOnClickOutside';
import DateAndTimePicker from './DateAndTimePicker';
import styles from './EventMenu.module.scss';

type Props = {
  x: number;
  y: number;
  closeContextMenu: () => void;
  _id: string;
  title: string;
  startTime: number;
  endTime: number;
  right: boolean;
  down: boolean;
};

const EventMenu = ({
  x,
  y,
  closeContextMenu,
  _id,
  title,
  startTime,
  endTime,
  right,
  down,
}: Props) => {
  const contextMenuRef = useRef<HTMLDivElement>(null);

  const { removeEvent, renameEvent, changeDate, submitChangeDate } =
    useEventsContext();
  const [newTitle, setNewTitle] = useState(title);
  const [startDate, setStartDate] = useState(new Date(startTime));
  const [endDate, setEndDate] = useState(new Date(endTime));

  const handleRemove = () => {
    removeEvent(_id);
    closeContextMenu();
  };

  const handleClose = () => {
    renameEvent(_id, newTitle);
    submitChangeDate(_id, startDate, endDate);
    closeContextMenu();
  };

  useOnClickOutside(contextMenuRef, handleClose);

  useEffect(() => {
    changeDate(_id, startDate, endDate);
  }, [_id, startDate, endDate, changeDate]);

  return (
    <div
      ref={contextMenuRef}
      className={styles.container}
      style={{
        left: right ? x + 'px' : x - 360 + 'px',
        top: down ? y + 'px' : y - 420 + 'px',
      }}>
      <div
        className={styles.item}
        onClick={handleRemove}
        style={{ background: '#d36565' }}>
        <p style={{ color: 'white' }}>Delete</p>
      </div>
      <form onSubmit={handleClose}>
        <input
          type='text'
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </form>

      <DateAndTimePicker
        date={startDate}
        setDate={setStartDate}
        maxDate={endDate}
      />
      <DateAndTimePicker
        date={endDate}
        setDate={setEndDate}
        minDate={startDate}
      />
    </div>
  );
};

export default EventMenu;
