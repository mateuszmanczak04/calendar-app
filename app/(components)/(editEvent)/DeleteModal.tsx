'use client';

import React from 'react';
import styles from './DeleteModal.module.scss';

const DeleteModal = ({
  deleteEvent,
  cancel,
}: {
  deleteEvent: () => void;
  cancel: () => void;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.backdrop} onClick={cancel}></div>
      <div className={styles.content}>
        <h2>Are you sure?</h2>
        <button onClick={deleteEvent}>Yes</button>
        <button onClick={cancel}>No</button>
      </div>
    </div>
  );
};

export default DeleteModal;
