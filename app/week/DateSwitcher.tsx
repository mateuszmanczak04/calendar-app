import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import {
  goDayAhead,
  goDayBack,
  goWeekAhead,
  goWeekBack,
} from '../../redux/date';
import { zoomIn, zoomOut } from '../../redux/layout';
import { useAppDispatch } from '../../redux/store';
import styles from './DateSwitcher.module.scss';

const DateSwitcher = () => {
  // redux
  const dispatch = useAppDispatch();

  // it's needed to block switching date before animation ends
  const [switching, setSwitching] = useState<boolean>(false);

  return (
    <div className={styles.menu}>
      <button onClick={() => dispatch(zoomOut())}>
        <AiOutlineMinus />
      </button>
      <button
        onClick={() => {
          if (switching) {
            return;
          }
          dispatch(goWeekBack());
          setSwitching(true);
          setTimeout(() => {
            setSwitching(false);
          }, 400);
        }}>
        -7
      </button>
      <button
        onClick={() => {
          if (switching) {
            return;
          }
          dispatch(goDayBack());
          setSwitching(true);
          setTimeout(() => {
            setSwitching(false);
          }, 400);
        }}>
        -1
      </button>
      <button
        onClick={() => {
          if (switching) {
            return;
          }
          dispatch(goDayAhead());
          setSwitching(true);
          setTimeout(() => {
            setSwitching(false);
          }, 400);
        }}>
        +1
      </button>
      <button
        onClick={() => {
          if (switching) {
            return;
          }
          dispatch(goWeekAhead());
          setSwitching(true);
          setTimeout(() => {
            setSwitching(false);
          }, 400);
        }}>
        +7
      </button>
      <button onClick={() => dispatch(zoomIn())}>
        <AiOutlinePlus />
      </button>
    </div>
  );
};

export default DateSwitcher;
