'use client';

import { AnimatePresence, motion } from 'framer-motion';
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
      </div>

      <AnimatePresence>
        {isAddEventOpen && (
          <motion.div
            className={styles.addEvent}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.5 }}>
            <AddEvent close={() => setIsAddEventOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopBar;
