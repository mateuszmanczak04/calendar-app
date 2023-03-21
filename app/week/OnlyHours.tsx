import React from 'react';
import { getRowHeight } from '../../redux/layout';
import { useAppSelector } from '../../redux/store';
import styles from './OnlyHours.module.scss';

const OnlyHours = () => {
  // redux
  const rowHeight = useAppSelector(getRowHeight);

  return (
    <div className={styles.container} style={{ height: 24 * rowHeight + 48 }}>
      <div className={styles.first}></div>
      <p>00:00</p>
      <p>01:00</p>
      <p>02:00</p>
      <p>03:00</p>
      <p>04:00</p>
      <p>05:00</p>
      <p>06:00</p>
      <p>07:00</p>
      <p>08:00</p>
      <p>09:00</p>
      <p>10:00</p>
      <p>11:00</p>
      <p>12:00</p>
      <p>13:00</p>
      <p>14:00</p>
      <p>15:00</p>
      <p>16:00</p>
      <p>17:00</p>
      <p>18:00</p>
      <p>19:00</p>
      <p>20:00</p>
      <p>21:00</p>
      <p>22:00</p>
      <p>23:00</p>
    </div>
  );
};

export default OnlyHours;
