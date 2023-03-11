'use client';

import React, { useState } from 'react';
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineMinus,
  AiOutlinePlus,
} from 'react-icons/ai';
import { useLayoutContext } from '../../context/useLayoutContext';
import styles from './DateSwitcher.module.scss';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentDate, goDayAhead, goDayBack } from '../../redux/date';

const RightLeft = () => {
  const { handleZoomIn, handleZoomOut } = useLayoutContext();

  // redux
  const dispatch = useDispatch();
  const currentDate = useSelector(getCurrentDate);

  const [switching, setSwitching] = useState<boolean>(false);

  return (
    <div className={styles.menu}>
      <button onClick={handleZoomOut}>
        <AiOutlineMinus />
      </button>
      <button
        onClick={() => {
          if (switching) {
            return;
          }
          dispatch(goDayBack({}));
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
          dispatch(goDayAhead({}));
          setSwitching(true);
          setTimeout(() => {
            setSwitching(false);
          }, 400);
        }}>
        <AiOutlineArrowRight />
      </button>
      <button onClick={handleZoomIn}>
        <AiOutlinePlus />
      </button>
    </div>
  );
};

export default RightLeft;
