import React, { MouseEvent, useState } from 'react';
import { useEventsContext } from '../../context/useEventsContext';
import { useLayoutContext } from '../../context/useLayoutContext';
import EventBlock from './EventBlock';
import EventMenu from './EventMenu';
import styles from './Events.module.scss';

type Props = {
  currentDate: Date;
};

const initialContextMenu = {
  show: false,
  x: 0,
  y: 0,
  _id: '',
};

const Events = ({ currentDate }: Props) => {
  const { events } = useEventsContext();
  const { rowHeight } = useLayoutContext();
  const [contextMenu, setContextMenu] = useState(initialContextMenu);

  const handleContextMenu = (e: MouseEvent, _id: string, yOffset: number) => {
    e.preventDefault();

    if (e.target instanceof Element) {
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left + 8;
      const y = e.clientY - rect.top + yOffset;

      setContextMenu({ show: true, x: x, y: y, _id: _id });
    }
  };

  const closeContextMenu = () => {
    setContextMenu(initialContextMenu);
  };

  return (
    <div className={styles.events}>
      {events.map((event) => {
        const { _id, startTime, title, endTime, color } = event;

        const startDate = new Date(startTime);
        const startHour = startDate.getHours();
        const startMinute = startDate.getMinutes();

        const endDate = new Date(endTime);
        const endHour = endDate.getHours();
        const endMinute = endDate.getMinutes();

        const currentDateMidnight = new Date(currentDate);
        currentDateMidnight.setHours(0, 0, 0, 0);

        const nextDateMidnight = new Date(currentDate);
        nextDateMidnight.setDate(nextDateMidnight.getDate() + 1);
        nextDateMidnight.setHours(0, 0, 0, 0);

        let yOffset = 0;
        let height = 0;

        // if event starts later than on currently set day
        if (startDate >= nextDateMidnight) {
          return null;
        }

        // if event ends before currently set day
        if (endDate <= currentDateMidnight) {
          return null;
        }

        // if starts on currently set day
        if (startDate >= currentDateMidnight && startDate < nextDateMidnight) {
          // for example 9:30 is 9.5
          const startTime = startHour + startMinute / 60;
          // distance from top in pixels
          yOffset = startTime * rowHeight;
        } else {
          yOffset = 0;
        }

        if (endDate < nextDateMidnight) {
          // if event ends on currently set day

          const endTime = endHour + endMinute / 60;
          const duration = endTime;

          height = duration * rowHeight - yOffset;
        } else if (endDate >= nextDateMidnight) {
          // if event lasts longer than currently set day
          height = 24 * rowHeight - yOffset;
        }

        return (
          <EventBlock
            yOffset={yOffset}
            height={height}
            color={color}
            title={title}
            _id={_id}
            key={_id}
            onContextMenu={handleContextMenu}
          />
        );
      })}
      {contextMenu.show && (
        <EventMenu
          x={contextMenu.x}
          y={contextMenu.y}
          closeContextMenu={closeContextMenu}
          _id={contextMenu._id}
        />
      )}
    </div>
  );
};

export default Events;
