import React, { createContext, useState } from 'react';

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

  const handleZoomIn = () => {
    if (rowHeight < 128) {
      setRowHeight((prev) => prev + 8);
    }
  };

  const handleZoomOut = () => {
    if (rowHeight > 32) {
      setRowHeight((prev) => prev - 8);
    }
  };

  return (
    <LayoutContext.Provider value={{ rowHeight, handleZoomIn, handleZoomOut }}>
      {children}
    </LayoutContext.Provider>
  );
};
