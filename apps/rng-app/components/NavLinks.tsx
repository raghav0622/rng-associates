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
      <Divider my="sm" />
      <Link href="/entity/create-entity" legacyBehavior>
        <NavLink label="Create Entity" icon={<IconGauge size={24} />} />
      </Link>
      {/* <Link href="/autocomplete-data" legacyBehavior>
        <NavLink label="Autocomplete Data" icon={<IconGauge size={24} />} />
      </Link> */}
    </>
  );
}
