import React from 'react';
import { useLayoutContext } from '../../context/useLayoutContext';
import styles from './OnlyLines.module.scss';

const OnlyLines = () => {
  const { rowHeight } = useLayoutContext();

  return (
    <div className={styles.container} style={{ height: 24 * rowHeight }}>
      <div className={styles.hourRow}></div>
      <div className={styles.hourRow}></div>
      <div className={styles.hourRow}></div>
      <div className={styles.hourRow}></div>
      <div className={styles.hourRow}></div>
      <div className={styles.hourRow}></div>
      <div className={styles.hourRow}></div>
      <div className={styles.hourRow}></div>
      <div className={styles.hourRow}></div>
      <div className={styles.hourRow}></div>
      <div className={styles.hourRow}></div>
      <div className={styles.hourRow}></div>
      <div className={styles.hourRow}></div>
      <div className={styles.hourRow}></div>
      <div className={styles.hourRow}></div>
      <div className={styles.hourRow}></div>
      <div className={styles.hourRow}></div>
      <div className={styles.hourRow}></div>
      <div className={styles.hourRow}></div>
      <div className={styles.hourRow}></div>
      <div className={styles.hourRow}></div>
      <div className={styles.hourRow}></div>
      <div className={styles.hourRow}></div>
      <div className={styles.hourRow}></div>
    </div>
  );
};

export default OnlyLines;
