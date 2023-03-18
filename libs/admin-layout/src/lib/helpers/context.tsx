import { createContext, useContext } from 'react';

/* eslint-disable @typescript-eslint/no-empty-interface */
export type LayoutContext = {
  mobileNav: {
    toggle: () => unknown | Promise<unknown>;
    close: () => unknown | Promise<unknown>;
    open: boolean;
  };
  isMobile: boolean;
};
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
