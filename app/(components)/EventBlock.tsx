'use client';

import React from 'react';
import styles from './EventBlock.module.scss';

type Props = {
  yOffset: number;
  height: number;
  color: string;
  title: string;
};

const EventBlock = ({ yOffset, height, color, title }: Props) => {
  return (
    <div
      className={styles.event}
      style={{
        border: '2px solid ' + color,
        background: color + 'aa',
        top: yOffset + 'px',
        height: height + 'px',
      }}>
      {title}
    </div>
  );
};

export default EventBlock;
