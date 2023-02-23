import React, { useState } from 'react';
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineMinus,
  AiOutlinePlus,
} from 'react-icons/ai';
import { useDateContext } from '../../../context/useDateContext';
import { useLayoutContext } from '../../../context/useLayoutContext';
import styles from './DateSwitcher.module.scss';
import moment from 'moment';

const RightLeft = () => {
  const { handleZoomIn, handleZoomOut } = useLayoutContext();
  const {
    currentDate,
    dayBack,
    dayAhead,
    getDateBefore,
    getDateAfter,
    setCurrentDate,
  } = useDateContext();

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
          setCurrentDate(getDateBefore(currentDate, 7));
          setSwitching(true);
          setTimeout(() => {
            setSwitching(false);
          }, 400);
        }}>
        <AiOutlineArrowLeft />
      </button>
      <p>{moment(currentDate).format('YYYY-MM-DD')}</p>
      <p>{moment(getDateAfter(currentDate, 6)).format('YYYY-MM-DD')}</p>
      <button
        onClick={() => {
          if (switching) {
            return;
          }
          setCurrentDate(getDateAfter(currentDate, 7));
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
