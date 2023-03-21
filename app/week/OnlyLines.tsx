import React from 'react';
import { getRowHeight } from '../../redux/layout';
import { useAppSelector } from '../../redux/store';
import styles from './OnlyLines.module.scss';

const OnlyLines = () => {
  // redux
  const rowHeight = useAppSelector(getRowHeight);

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
