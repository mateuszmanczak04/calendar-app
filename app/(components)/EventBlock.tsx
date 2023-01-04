'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDateContext } from '../../context/useDateContext';
import { useEventsContext } from '../../context/useEventsContext';
import { useLayoutContext } from '../../context/useLayoutContext';
import styles from './EventBlock.module.scss';

type Props = {
  yOffset: number;
  height: number;
  color: string;
  title: string;
  _id: string;
  startTime: number;
  endTime: number;
  onContextMenu: (
    e: React.MouseEvent,
    _id: string,
    yOffset: number,
    title: string,
    startTime: number,
    endTime: number
  ) => void;
};

const EventBlock = ({
  yOffset: initialYOffset,
  height: initialHeight,
  color,
  title,
  _id,
  startTime,
  endTime,
  onContextMenu,
}: Props) => {
  const [height, setHeight] = useState(initialHeight);
  const ref = useRef<HTMLDivElement>(null);
  const [yOffset, setYOffset] = useState(initialYOffset);
  const { rowHeight } = useLayoutContext();
  const [movingTop, setMovingTop] = useState<boolean>(false);
  const [movingBottom, setMovingBottom] = useState<boolean>(false);
  const [displayEnd, setDisplayEnd] = useState(true);
  const [displayStart, setDisplayStart] = useState(true);
  const { submitChangeDate, changeDate } = useEventsContext();
  const { currentDate } = useDateContext();

  useEffect(() => {
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(24, 0, 0);
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

  // todo snapping hours
  // const snapTop = useCallback(() => {
  //   const block = ref.current!;
  //   const hourGrid = ref.current!.parentElement!;
  //   let fromTop =
  //     block.getBoundingClientRect()?.top - hourGrid.getBoundingClientRect().top;
  //   const snapAmount = rowHeight / 4;
  //   const rest = fromTop % snapAmount;

  //   if (rest >= snapAmount / 2) {
  //     // snap to bottom
  //     const needToAdd = snapAmount - rest;
  //     setYOffset((prev) => prev + needToAdd);
  //     setHeight((prev) => prev - needToAdd);
  //   } else {
  //     // snap to top
  //     setYOffset((prev) => prev - rest);
  //     setHeight((prev) => prev + rest);
  //   }
  // }, [rowHeight]);

  // const snapBottom = useCallback(() => {
  //   const block = ref.current!;
  //   const hourGrid = ref.current!.parentElement!;
  //   let fromTop =
  //     block.getBoundingClientRect()?.top - hourGrid.getBoundingClientRect().top;
  //   fromTop += height;
  //   const snapAmount = rowHeight / 4;
  //   const rest = fromTop % snapAmount;

  //   if (rest >= snapAmount / 2) {
  //     // snap to bottom
  //     const needToAdd = snapAmount - rest;
  //     setHeight((prev) => prev + needToAdd);
  //   } else {
  //     // snap to top
  //     setHeight((prev) => prev + -rest);
  //   }
  // }, [height, rowHeight]);

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
      if (mouseFromTop < 0 || mouseFromTop >= 24 * rowHeight) {
        setYOffset(initialYOffset);
        setHeight(initialHeight);
        setMovingTop(false);
        setMovingBottom(false);
        return;
      }

      if (movingTop) {
        setMovingTop(false);
      }

      if (movingBottom) {
        setMovingBottom(false);
      }

      const startDate = new Date(startTime);
      startDate.setHours(0, (yOffset / (rowHeight * 24)) * 24 * 60, 0);

      const endDate = new Date(endTime);
      endDate.setHours(0, ((yOffset + height) / (rowHeight * 24)) * 24 * 60, 0);

      changeDate(_id, startDate, endDate);
      submitChangeDate(_id, startDate, endDate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [
    _id,
    changeDate,
    submitChangeDate,
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
    <div
      className={styles.event}
      style={{
        borderLeft: '2px solid ' + color,
        borderRight: '2px solid ' + color,
        background: color + 'aa',
        top: yOffset + 'px',
        height: height + 'px',
      }}
      onContextMenu={(e) =>
        onContextMenu(e, _id, yOffset, title, startTime, endTime)
      }
      ref={ref}>
      {displayStart && (
        <div
          className={styles.drag}
          style={{ top: 0, background: color + 'aa' }}
          onMouseDown={handleMouseDownTop}></div>
      )}
      <p>{title}</p>
      {displayEnd && (
        <div
          className={styles.drag}
          style={{ bottom: 0, background: color + 'aa' }}
          onMouseDown={handleMouseDownBottom}></div>
      )}
    </div>
  );
};

export default EventBlock;
