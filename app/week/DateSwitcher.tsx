import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useLayoutContext } from '../../context/useLayoutContext';
import {
  goDayAhead,
  goDayBack,
  goWeekAhead,
  goWeekBack,
} from '../../redux/date';
import styles from './DateSwitcher.module.scss';

const DateSwitcher = () => {
  const { handleZoomIn, handleZoomOut } = useLayoutContext();

  // redux
  const dispatch = useDispatch();

  // it's needed to block switching date before animation ends
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
          dispatch(goWeekBack({}));
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
          dispatch(goDayBack({}));
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
          dispatch(goDayAhead({}));
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
          dispatch(goWeekAhead({}));
          setSwitching(true);
          setTimeout(() => {
            setSwitching(false);
          }, 400);
        }}>
        +7
      </button>
      <button onClick={handleZoomIn}>
        <AiOutlinePlus />
      </button>
    </div>
  );
};

export default DateSwitcher;
