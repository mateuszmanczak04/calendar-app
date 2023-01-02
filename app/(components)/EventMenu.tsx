import React, { FormEventHandler, useEffect, useRef, useState } from 'react';
import { useEventsContext } from '../../context/useEventsContext';
import { useOnClickOutside } from '../../lib/useOnClickOutside';
import styles from './EventMenu.module.scss';

type Props = {
  x: number;
  y: number;
  closeContextMenu: () => void;
  _id: string;
  title: string;
};

const EventMenu = ({ x, y, closeContextMenu, _id, title }: Props) => {
  const contextMenuRef = useRef<HTMLDivElement>(null);

  const { removeEvent, renameEvent } = useEventsContext();
  const [newTitle, setNewTitle] = useState(title);

  const handleRemove = () => {
    removeEvent(_id);
    closeContextMenu();
  };

  const handleClose = () => {
    renameEvent(_id, newTitle);
    closeContextMenu();
  };

  useOnClickOutside(contextMenuRef, handleClose);

  return (
    <div
      ref={contextMenuRef}
      className={styles.container}
      style={{ left: x + 'px', top: y + 'px' }}>
      <div className={styles.item} onClick={handleRemove}>
        <p>Delete</p>
      </div>
      <form className={styles.item} onSubmit={handleClose}>
        <input
          type='text'
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </form>
    </div>
  );
};

export default EventMenu;
