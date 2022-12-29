import { useContext } from 'react';
import { LayoutContext } from './LayoutContext';

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);

  return context;
};
