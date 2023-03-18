import { ActionIcon, Drawer, ScrollArea } from '@mantine/core';
import { IconMenu2 } from '@tabler/icons';
import { useLayoutContext } from './context';
import { AdminNavbarProps } from './types';
export const AdminDrawer: React.FC<AdminNavbarProps> = () => {
  const {
    isMobile,
    mobileNav: { open, close, toggle },
  } = useLayoutContext();

  return (
    <>
      <ActionIcon
        variant="filled"
        onClick={() => toggle()}
        sx={{
          position: 'fixed',
          zIndex: 100,
          bottom: '1.5em',
          right: '1.5em',
        }}
        size={'md'}
        color="blue"
      >
        <IconMenu2 />
      </ActionIcon>
      <Drawer
        opened={isMobile && open}
        onClose={() => close()}
        closeOnEscape
        closeOnClickOutside
        position="bottom"
        padding="sm"
        size="lg"
        title={appName}
        styles={{
          header: { backgroundColor: 'white', zIndex: 200 },

          content: {
            height: '65vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          },
          body: {
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          },
        }}
      >
        <ScrollArea offsetScrollbars={true}>{navlinks}</ScrollArea>
      </Drawer>
    </>
  );
};
export default AdminDrawer;
