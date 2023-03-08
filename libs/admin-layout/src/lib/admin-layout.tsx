import { Box, MantineProvider } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import AdminDrawer from './helpers/admin-drawer';
import AdminHeader from './helpers/admin-header';
import AdminNavbar from './helpers/admin-nav';
import { AdminLayoutContext } from './helpers/context';
import { RouterTransition } from './helpers/router-transitions';
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
      <MantineProvider
        withNormalizeCSS
        theme={{
          globalStyles: (theme) => ({
            '#__next': {
              width: '100vw',
              height: '100vh',
              maxWidth: '100vw',
              maxHeight: '100vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            },
          }),
        }}
      >
        <Notifications />
        <RouterTransition />
        <AdminHeader />
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            height: 'calc(100% - 72px)',
          }}
        >
          <AdminNavbar />
          <Box>{children}</Box>
        </Box>
        {isMobile && <AdminDrawer />}
      </MantineProvider>
    </AdminLayoutContext.Provider>
  );
};

export default AdminLayout;
