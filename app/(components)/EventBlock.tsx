'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './EventBlock.module.scss';
import { BiMenu } from 'react-icons/bi';
import { setEditedEvent } from '../../redux/edit';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { updateEvent } from '../../redux/events';
import { getRowHeight } from '../../redux/layout';

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
  const [movingTop, setMovingTop] = useState<boolean>(false);
  const [movingBottom, setMovingBottom] = useState<boolean>(false);
  const [displayEnd, setDisplayEnd] = useState(true);
  const [displayStart, setDisplayStart] = useState(true);

  // redux
  const dispatch = useAppDispatch();
  const rowHeight = useAppSelector(getRowHeight);

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

      dispatch(
        updateEvent({
          _id,
          title,
          startTime: startDate.getTime(),
          endTime: endDate.getTime(),
        })
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [
    _id,
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
    dispatch,
  ]);

  return (
    <>
      <div
        className={styles.event + ' eventBlock'}
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
        <button
          onClick={() =>
            dispatch(setEditedEvent({ _id, title, startTime, endTime }))
          }>
          <BiMenu />
        </button>
        {displayEnd && (
          <div
            className={styles.drag}
            style={{ bottom: 0, background: color + 'aa' }}
            onMouseDown={handleMouseDownBottom}></div>
        )}
      </div>
    </>
  );
};

export default EventBlock;
