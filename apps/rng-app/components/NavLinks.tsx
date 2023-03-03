import { Divider, NavLink } from '@mantine/core';
import { IconGauge } from '@tabler/icons';
import Link from 'next/link';

export default function NavLinks() {
  return (
    <>
      <Link href="/" legacyBehavior>
        <NavLink label="Dashboard" icon={<IconGauge size={24} />} />
      </Link>
      <Divider my="sm" />
      <NavLink label="Projects" defaultOpened={true} childrenOffset={0}>
        <Link href="/project" legacyBehavior>
          <NavLink label="Project Dashboard" icon={<IconGauge size={24} />} />
        </Link>
        <Link href="/project/search" legacyBehavior>
          <NavLink label="Search Projects" icon={<IconGauge size={24} />} />
        </Link>
        <Link href="/project/new" legacyBehavior>
          <NavLink label="New Project" icon={<IconGauge size={24} />} />
        </Link>
      </NavLink>
    </>
  );
}
