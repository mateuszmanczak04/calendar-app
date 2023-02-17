'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import AddEvent from './(addEvent)/AddEvent';
import styles from './TopBar.module.scss';

const TopBar = () => {
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);

  return (
    <div className={styles.container}>
      <button onClick={() => setIsAddEventOpen(true)}>Add an event</button>
      <div className={styles.mode}>
        <Link href='/day'>Day</Link>
        <Link href='/week'>Week</Link>
        <Link href='/month'>Month</Link>
        <button>Year</button>
      </div>
      <input type='text' placeholder='Search' />
      {isAddEventOpen && <AddEvent close={() => setIsAddEventOpen(false)} />}
    </div>
  );
};

export default TopBar;
