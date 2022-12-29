import React from 'react';
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

  return (
    <div className={styles.menu}>
      <button onClick={handleZoomOut}>
        <AiOutlineMinus />
      </button>
      <button onClick={dayBack}>
        <AiOutlineArrowLeft />
      </button>
      <p>{currentDate?.toLocaleDateString('en-US')}</p>
      <button onClick={dayAhead}>
        <AiOutlineArrowRight />
      </button>
      <button onClick={handleZoomIn}>
        <AiOutlinePlus />
      </button>
    </div>
  );
};

export default RightLeft;
