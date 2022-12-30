import React, { useRef } from 'react';
import { useEventsContext } from '../../context/useEventsContext';
import { useOnClickOutside } from '../../lib/useOnClickOutside';
import styles from './EventMenu.module.scss';

type Props = {
  x: number;
  y: number;
  closeContextMenu: () => void;
  _id: string;
};

const EventMenu = ({ x, y, closeContextMenu, _id }: Props) => {
  const contextMenuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(contextMenuRef, closeContextMenu);
  const { removeEvent } = useEventsContext();

  const handleRemove = () => {
    removeEvent(_id);
  };

  return (
    <div
      ref={contextMenuRef}
      onClick={closeContextMenu}
      className={styles.container}
      style={{ left: x + 'px', top: y + 'px' }}>
      <p onClick={handleRemove}>Delete</p>
    </div>
  );
};

export default EventMenu;
