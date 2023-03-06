import { useContext } from 'react';
import { EditContext } from './EditContext';

export const useEditContext = () => {
  const context = useContext(EditContext);
  return context;
};
