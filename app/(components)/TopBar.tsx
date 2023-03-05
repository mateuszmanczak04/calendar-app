'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDateContext } from '../../context/useDateContext';
import AddEvent from './(addEvent)/AddEvent';
import Loading from './Loading';
import styles from './TopBar.module.scss';

const TopBar = () => {
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const { data: session, status } = useSession();
  const { currentDate } = useDateContext();

  if (status === 'loading') {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <p>{session && session.user?.email}</p>
        {!session && <Link href='/login'>Log In</Link>}
        {session && <button onClick={() => signOut()}>Sign Out</button>}
      </div>
      {session && (
        <div className={styles.bottom}>
          <button onClick={() => setIsAddEventOpen(true)}>Add an event</button>
          <div className={styles.mode}>
            <Link href='/day'>Day</Link>
            <Link href='/week'>Week</Link>
            <Link href='/month'>Month</Link>
          </div>
        </div>
      )}

      <AnimatePresence>
        {isAddEventOpen && (
          <motion.div
            className={styles.addEvent}
            initial={{ x: '-100%' }}
            animate={{ x: '0' }}
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
