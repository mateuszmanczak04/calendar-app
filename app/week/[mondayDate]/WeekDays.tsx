import React from 'react';
import styles from './WeekDays.module.scss';

const WeekDays = () => {
  return (
    <div className={styles.container}>
      <div className={styles.first}></div>
      <div className={styles.day}>Monday</div>
      <div className={styles.day}>Tuesday</div>
      <div className={styles.day}>Wednesday</div>
      <div className={styles.day}>Thursday</div>
      <div className={styles.day}>Friday</div>
      <div className={styles.day}>Saturday</div>
      <div className={styles.day}>Sunday</div>
    </div>
  );
};

export default WeekDays;
