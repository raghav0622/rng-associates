import 'dayjs/locale/en-in';

import { Box, MantineProvider } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import AsideMenu from './helpers/admin-aside';
import AdminHeader from './helpers/admin-header';
import Content from './helpers/content';
import { AdminLayoutContext } from './helpers/context';

export type AdminLayoutProps = {
  asideMenu: React.ReactNode;
  header: React.ReactNode;
};

export const AdminLayout: React.FC<
  React.PropsWithChildren<AdminLayoutProps>
> = ({ children, asideMenu, header }) => {
  const [openNav, { toggle, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 576px)');

  return (
    <AdminLayoutContext.Provider
      value={{
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
        <Notifications />
        {/* <RouterTransition /> */}
        <AdminHeader children={header} />
        <Box
          sx={{
            display: 'flex',
            width: '100vw',
            maxWidth: '100vw',
            flexGrow: 1,
            height: 'calc(100% - 72px)',
          }}
        >
          <AsideMenu children={asideMenu} />
          <Content>{children}</Content>
        </Box>
        {/* {isMobile && <AdminDrawer />} */}
      </MantineProvider>
    </AdminLayoutContext.Provider>
  );
};

export default AdminLayout;
