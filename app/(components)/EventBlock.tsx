'use client';

import React, { MouseEvent, useState } from 'react';
import styles from './EventBlock.module.scss';

type Props = {
  yOffset: number;
  height: number;
  color: string;
  title: string;
  _id: string;
  onContextMenu: (e: MouseEvent, _id: string, yOffset: number) => void;
};

const EventBlock = ({
  yOffset,
  height,
  color,
  title,
  _id,
  onContextMenu,
}: Props) => {
  return (
    <div
      className={styles.event}
      style={{
        border: '2px solid ' + color,
        background: color + 'aa',
        top: yOffset + 'px',
        height: height + 'px',
      }}
      onContextMenu={(e) => onContextMenu(e, _id, yOffset)}>
      {title}
    </div>
  );
};

export default EventBlock;
