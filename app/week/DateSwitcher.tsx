import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useDateContext } from '../../context/useDateContext';
import { useLayoutContext } from '../../context/useLayoutContext';
import styles from './DateSwitcher.module.scss';

const DateSwitcher = () => {
  const { handleZoomIn, handleZoomOut } = useLayoutContext();
  const { weekAhead, weekBack, dayBack, dayAhead } = useDateContext();

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
          weekBack();
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
          dayBack();
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
          dayAhead();
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
          weekAhead();
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
