import React, { useState } from 'react';
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineMinus,
  AiOutlinePlus,
} from 'react-icons/ai';
import { useDateContext } from '../../context/useDateContext';
import { useLayoutContext } from '../../context/useLayoutContext';
import styles from './DateSwitcher.module.scss';

const RightLeft = () => {
  const { handleZoomIn, handleZoomOut } = useLayoutContext();
  const { currentDate, dayBack, dayAhead } = useDateContext();

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
          dayBack();
          setSwitching(true);
          setTimeout(() => {
            setSwitching(false);
          }, 400);
        }}>
        <AiOutlineArrowLeft />
      </button>
      <p>{currentDate?.toLocaleDateString('en-US')}</p>
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
        <AiOutlineArrowRight />
      </button>
      <button onClick={handleZoomIn}>
        <AiOutlinePlus />
      </button>
    </div>
  );
};

export default RightLeft;
