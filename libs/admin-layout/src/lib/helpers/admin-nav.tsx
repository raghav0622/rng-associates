import { Navbar, ScrollArea } from '@mantine/core';
import { useLayoutContext } from './context';
import { AdminNavbarProps } from './types';

export const AdminNavbar: React.FC<AdminNavbarProps> = () => {
  const { navlinks } = useLayoutContext();

  return (
    <Navbar
      hiddenBreakpoint="md"
      hidden
      p="sm"
      width={{ base: 300 }}
      bg="#F5F5F5"
    >
      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs" py="sm">
        {navlinks}
      </Navbar.Section>
    </Navbar>
  );
};
export default AdminNavbar;
