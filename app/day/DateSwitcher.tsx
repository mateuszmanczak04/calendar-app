'use client';

import React, { useState } from 'react';
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineMinus,
  AiOutlinePlus,
} from 'react-icons/ai';
import styles from './DateSwitcher.module.scss';
import moment from 'moment';
import { getCurrentDate, goDayAhead, goDayBack } from '../../redux/date';
import { zoomIn, zoomOut } from '../../redux/layout';
import { useAppDispatch, useAppSelector } from '../../redux/store';

const DateSwitcher = () => {
  // redux
  const dispatch = useAppDispatch();
  const currentDate = useAppSelector(getCurrentDate);

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
          dispatch(goDayBack());
          setSwitching(true);
          setTimeout(() => {
            setSwitching(false);
          }, 400);
        }}>
        <AiOutlineArrowLeft />
      </button>
      <p>{moment(currentDate).format('YYYY-MM-DD')}</p>
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
        <AiOutlineArrowRight />
      </button>
      <button onClick={() => dispatch(zoomIn())}>
        <AiOutlinePlus />
      </button>
    </div>
  );
};

export default DateSwitcher;
