'use client';

import React, { useState } from 'react';
import AddEvent from './AddEvent';
import styles from './TopBar.module.scss';

const TopBar = () => {
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);

  return (
    <div className={styles.container}>
      <button onClick={() => setIsAddEventOpen(true)}>Add an event</button>
      <div className={styles.mode}>
        <button>Day</button>
        <button>Week</button>
        <button>Month</button>
        <button>Year</button>
      </div>
      <input type='text' placeholder='Search' />
      {isAddEventOpen && (
        <AddEvent
          isOpen={isAddEventOpen}
          close={() => setIsAddEventOpen(false)}
        />
      )}
    </div>
  );
};

export default TopBar;
