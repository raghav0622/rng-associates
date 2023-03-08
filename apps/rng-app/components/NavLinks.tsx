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
      <NavLink label="Entity" defaultOpened={true} childrenOffset={0}>
        <Link href="/entity/create" legacyBehavior>
          <NavLink label="Create Entity" icon={<IconGauge size={24} />} />
        </Link>
        <Link href="/entity/view" legacyBehavior>
          <NavLink label="View Entities" icon={<IconGauge size={24} />} />
        </Link>
      </NavLink>
      <NavLink label="Accounts" defaultOpened={true} childrenOffset={0}>
        <Link href="/account/create" legacyBehavior>
          <NavLink label="Create Account" icon={<IconGauge size={24} />} />
        </Link>
      </NavLink>
      <Link href="/autocomplete-data" legacyBehavior>
        <NavLink label="Autocomplete Data" icon={<IconGauge size={24} />} />
      </Link>
    </>
  );
}
