'use client';

import { Badge, Group, NavLink } from '@mantine/core';
import { AdminLayout } from '@rng-associates/admin-layout';
import { IconGauge } from '@tabler/icons';
import Link from 'next/link';

export function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayout
      asideMenu={
        <>
          <Link href="/" legacyBehavior>
            <NavLink label="User Dashboard" icon={<IconGauge size={24} />} />
          </Link>
          <Link href="/create-company" legacyBehavior>
            <NavLink label="Create Company" icon={<IconGauge size={24} />} />
          </Link>
        </>
      }
      header={
        <Group position="apart" sx={{ flexGrow: 1 }}>
          <Badge variant="gradient" size="xl">
            SuperUser
          </Badge>
        </Group>
      }
    >
      {children}
    </AdminLayout>
  );
}
