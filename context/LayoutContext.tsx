'use client';

import React, { createContext, useEffect, useState } from 'react';

export const LayoutContext = createContext<{
  rowHeight: number;
  handleZoomIn: () => void;
  handleZoomOut: () => void;
}>({
  rowHeight: 32,
  handleZoomIn: () => {},
  handleZoomOut: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const LayoutContextProvider = ({ children }: Props) => {
  const [rowHeight, setRowHeight] = useState(32);

  useEffect(() => {
    if (localStorage.getItem('rowHeight')) {
      setRowHeight(Number(localStorage.getItem('rowHeight')));
    }
  }, []);

  const handleZoomIn = () => {
    if (rowHeight < 128) {
      setRowHeight((prev) => prev + 8);
      localStorage.setItem('rowHeight', (rowHeight + 8).toString());
    }
  };

  const handleZoomOut = () => {
    if (rowHeight > 32) {
      setRowHeight((prev) => prev - 8);
      localStorage.setItem('rowHeight', (rowHeight - 8).toString());
    }
  };

  return (
    <LayoutContext.Provider value={{ rowHeight, handleZoomIn, handleZoomOut }}>
      {children}
    </LayoutContext.Provider>
  );
};
