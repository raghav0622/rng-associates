import { DatesProvider } from '@mantine/dates';
import 'dayjs/locale/en-in';

import { Box, MantineProvider } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import AdminDrawer from './helpers/admin-drawer';
import AdminHeader from './helpers/admin-header';
import AdminNavbar from './helpers/admin-nav';
import Content from './helpers/content';
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
      <MantineProvider
        withNormalizeCSS
        theme={{
          globalStyles: (theme) => ({
            body: {
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
        <DatesProvider settings={{ locale: 'en-in' }}>
          <Notifications />
          {/* <RouterTransition /> */}
          <AdminHeader />
          <Box
            sx={{
              display: 'flex',
              width: '100vw',
              maxWidth: '100vw',
              flexGrow: 1,
              height: 'calc(100% - 72px)',
            }}
          >
            <AdminNavbar />
            <Content>{children}</Content>
          </Box>
          {isMobile && <AdminDrawer />}
        </DatesProvider>
      </MantineProvider>
    </AdminLayoutContext.Provider>
  );
};

export default AdminLayout;
