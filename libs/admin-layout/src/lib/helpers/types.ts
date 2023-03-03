/* eslint-disable @typescript-eslint/no-empty-interface */
export type LayoutContext = {
  appName: string;
  navlinks: React.ReactNode;
  mobileNav: {
    toggle: () => unknown | Promise<unknown>;
    close: () => unknown | Promise<unknown>;
    open: boolean;
  };
  isMobile: boolean;
};

export interface AdminNavbarProps {}

export interface AdminHeaderProps {}

export type AdminLayoutProps = Pick<LayoutContext, 'appName' | 'navlinks'>;
