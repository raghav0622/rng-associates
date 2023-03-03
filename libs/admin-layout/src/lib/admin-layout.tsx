import { AppShell, MantineProvider } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import AdminDrawer from './helpers/admin-drawer';
import AdminHeader from './helpers/admin-header';
import AdminNavbar from './helpers/admin-nav';
import { AdminLayoutContext } from './helpers/context';
import { AdminLayoutProps } from './helpers/types';

export const AdminLayout: React.FC<
  React.PropsWithChildren<AdminLayoutProps>
> = ({ children, appName, navlinks }) => {
  const [openNav, { toggle, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 576px)');

  return (
    <AdminLayoutContext.Provider
      value={{
        appName: appName,
        navlinks: navlinks,
        isMobile,
        mobileNav: {
          close,
          toggle,
          open: openNav,
        },
      }}
    >
      <MantineProvider withNormalizeCSS>
        <AppShell
          padding="md"
          navbarOffsetBreakpoint="sm"
          navbar={<AdminNavbar />}
          header={<AdminHeader />}
          styles={(theme) => ({
            main: {
              backgroundColor: theme.colors.gray[2],
            },
          })}
        >
          {children}
        </AppShell>
        {isMobile && <AdminDrawer />}
      </MantineProvider>
    </AdminLayoutContext.Provider>
  );
};

export default AdminLayout;
