import { createContext, useContext } from 'react';
import { LayoutContext } from './types';

export const AdminLayoutContext = createContext<LayoutContext | undefined>(
  undefined
);

export const useLayoutContext = () => {
  const val = useContext(AdminLayoutContext);
  if (val === undefined) {
    throw new Error('Admin Layout Not initialized');
  }
  return val;
};
