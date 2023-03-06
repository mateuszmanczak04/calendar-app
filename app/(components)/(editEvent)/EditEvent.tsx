import React, { useCallback, useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useEventsContext } from '../../../context/useEventsContext';
import DateAndTimePicker from '../(date)/DateAndTimePicker';
import styles from './EditEvent.module.scss';
import { AiFillDelete } from 'react-icons/ai';
import { AnimatePresence, motion } from 'framer-motion';
import DeleteModal from './DeleteModal';

type Props = {
  closeMenu: () => void;
  _id: string;
  title: string;
  startTime: number;
  endTime: number;
};

const EditEvent = ({ closeMenu, _id, title, startTime, endTime }: Props) => {
  const { removeEvent, change, submitChanges } = useEventsContext();
  const [newTitle, setNewTitle] = useState(title);
  const [startDate, setStartDate] = useState(new Date(startTime));
  const [endDate, setEndDate] = useState(new Date(endTime));
  const [canSave, setCanSave] = useState<boolean>(true);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const handleRemove = () => {
    removeEvent(_id);
    closeMenu();
  };

  const handleSave = () => {
    change(_id, newTitle, startDate, endDate);
    submitChanges(_id, newTitle, startDate, endDate);
    closeMenu();
  };

  // update canSave
  useEffect(() => {
    const startTime = startDate.getTime();
    const endTime = endDate.getTime();

    if (startTime > endTime) {
      setCanSave(false);
    } else {
      setCanSave(true);
    }
  }, [startDate, endDate]);

  // close on esc
  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };

    window.addEventListener('keydown', escHandler);

    return () => window.removeEventListener('keydown', escHandler);
  }, [closeMenu]);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <button
          className={styles.delete}
          onClick={() => setShowDeleteModal(true)}>
          <AiFillDelete />
        </button>
        <button className={styles.close} onClick={closeMenu}>
          <MdClose />
        </button>
      </div>

      <input
        type='text'
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />

      <div className={styles.times}>
        <DateAndTimePicker
          date={startDate}
          setDate={useCallback((date: Date) => {
            setStartDate(date);
          }, [])}
          now={false}
        />
        <DateAndTimePicker
          date={endDate}
          setDate={useCallback((date: Date) => {
            setEndDate(date);
          }, [])}
          now={false}
        />
      </div>

      <button onClick={handleSave} className={styles.save} disabled={!canSave}>
        Save
      </button>

      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            className={styles.deleteModal}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}>
            <DeleteModal
              cancel={() => setShowDeleteModal(false)}
              deleteEvent={handleRemove}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EditEvent;
