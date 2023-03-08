import { Box, ScrollArea } from '@mantine/core';
import { useLayoutContext } from './context';
import { AdminNavbarProps } from './types';

export const AdminNavbar: React.FC<AdminNavbarProps> = () => {
  const { navlinks } = useLayoutContext();

  return (
    <Box
      sx={(t) => ({
        height: '100%',
        flex: '0 0 300px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: t.colors.gray[1],

        [`@media (max-width: ${t.breakpoints.sm})`]: {
          display: 'none',
        },
      })}
    >
      <ScrollArea p="md">{navlinks}</ScrollArea>
    </Box>
  );
};
export default AdminNavbar;
