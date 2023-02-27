'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useEventsContext } from '../../context/useEventsContext';
import { useLayoutContext } from '../../context/useLayoutContext';
import styles from './EventBlock.module.scss';
import { BiMenu } from 'react-icons/bi';
import EditEvent from './(editEvent)/EditEvent';
import { AnimatePresence, motion } from 'framer-motion';
import { BsArrowsMove } from 'react-icons/bs';

type Props = {
  yOffset: number;
  height: number;
  color: string;
  title: string;
  _id: string;
  startTime: number;
  endTime: number;
  currentDate: Date;
};

const EventBlock = ({
  yOffset: initialYOffset,
  height: initialHeight,
  color,
  title,
  _id,
  startTime,
  endTime,
  currentDate,
}: Props) => {
  const [height, setHeight] = useState(initialHeight);
  const ref = useRef<HTMLDivElement>(null);
  const [yOffset, setYOffset] = useState(initialYOffset);
  const { rowHeight } = useLayoutContext();
  const [movingTop, setMovingTop] = useState<boolean>(false);
  const [movingBottom, setMovingBottom] = useState<boolean>(false);
  const [displayEnd, setDisplayEnd] = useState(true);
  const [displayStart, setDisplayStart] = useState(true);
  const { change, submitChanges } = useEventsContext();
  const [editing, setEditing] = useState<boolean>(false);

  useEffect(() => {
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0);
    if (endTime > tomorrow.getTime()) setDisplayEnd(false);
    else setDisplayEnd(true);

    const today = new Date(currentDate);
    today.setHours(0, 0, 0);
    if (startTime < today.getTime()) setDisplayStart(false);
    else setDisplayStart(true);
  }, [startTime, endTime, currentDate]);

  useEffect(() => {
    setYOffset(initialYOffset);
    setHeight(initialHeight);
  }, [initialYOffset, initialHeight]);

  const handleMouseDownTop = (e: React.MouseEvent<HTMLDivElement>) => {
    setMovingTop(true);
  };

  const handleMouseDownBottom = (e: React.MouseEvent<HTMLDivElement>) => {
    setMovingBottom(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (movingTop) {
        setYOffset((prevYOffset) => prevYOffset + e.movementY);
        setHeight((prevHeight) => prevHeight - e.movementY);
      }
      if (movingBottom) {
        setHeight((prevHeight) => prevHeight + e.movementY);
      }
    };

    const handleMouseUp = async (e: MouseEvent) => {
      if (!movingBottom && !movingTop) {
        return;
      }

      const mouseFromTop =
        e.pageY - ref!.current!.parentElement!.getBoundingClientRect().top;
      if (mouseFromTop < 0 || mouseFromTop >= 24 * rowHeight || height <= 0) {
        setYOffset(initialYOffset);
        setHeight(initialHeight);
        setMovingTop(false);
        setMovingBottom(false);
        return;
      }

      const startDate = new Date(startTime);
      const endDate = new Date(endTime);

      if (movingTop) {
        setMovingTop(false);
        startDate.setHours(0, (yOffset / (rowHeight * 24)) * 24 * 60, 0);
      }

      if (movingBottom) {
        setMovingBottom(false);
        endDate.setHours(
          0,
          ((yOffset + height) / (rowHeight * 24)) * 24 * 60,
          0
        );
      }

      change(_id, title, startDate, endDate);
      submitChanges(_id, title, startDate, endDate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [
    _id,
    change,
    submitChanges,
    title,
    startTime,
    endTime,
    height,
    initialHeight,
    yOffset,
    initialYOffset,
    movingTop,
    movingBottom,
    rowHeight,
  ]);

  return (
    <>
      <div
        className={styles.event}
        style={{
          borderLeft: '2px solid ' + color,
          borderRight: '2px solid ' + color,
          background: color,
          top: yOffset + 'px',
          height: height + 'px',
          minHeight: '16px',
        }}
        ref={ref}>
        {displayStart && (
          <div
            className={styles.drag}
            style={{ top: 0, background: color + 'aa' }}
            onMouseDown={handleMouseDownTop}></div>
        )}
        <p className={styles.title}>{title}</p>
        <button onClick={() => setEditing(true)}>
          <BiMenu />
        </button>
        {displayEnd && (
          <div
            className={styles.drag}
            style={{ bottom: 0, background: color + 'aa' }}
            onMouseDown={handleMouseDownBottom}></div>
        )}
      </div>
      <AnimatePresence>
        {editing && (
          <motion.div
            className={styles.eventMenu}
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.5 }}>
            <EditEvent
              _id={_id}
              title={title}
              startTime={startTime}
              endTime={endTime}
              closeMenu={() => setEditing(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EventBlock;
