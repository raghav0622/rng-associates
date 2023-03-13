import { Divider, NavLink } from '@mantine/core';
import { IconGauge } from '@tabler/icons';
import Link from 'next/link';

export function NavLinks() {
  return (
    <>
      <Link href="/" legacyBehavior>
        <NavLink label="Dashboard" icon={<IconGauge size={24} />} />
      </Link>
      <Divider my="sm" />
      {/* <Link href="/ledger" legacyBehavior>
        <NavLink label="View Ledgers" icon={<IconGauge size={24} />} />
      </Link>
      <Divider my="sm" />
      <Link href="/ledger/create" legacyBehavior>
        <NavLink label="Create Ledger" icon={<IconGauge size={24} />} />
      </Link> */}

      <Link href="/account/create" legacyBehavior>
        <NavLink label="Create Account" icon={<IconGauge size={24} />} />
      </Link>
      {/* <Link href="/autocomplete-data" legacyBehavior>
        <NavLink label="Autocomplete Data" icon={<IconGauge size={24} />} />
      </Link> */}
    </>
  );
}
