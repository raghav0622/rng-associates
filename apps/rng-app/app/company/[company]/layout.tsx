'use client';

import { CompanyProvider, useCompanyCtx } from '@rng-associates/accounts';
import { AdminLayout } from '@rng-associates/admin-layout';
import { usePathname } from 'next/navigation';

import { Badge, Divider, Group, NavLink } from '@mantine/core';
import { IconGauge } from '@tabler/icons';
import Link from 'next/link';

export function AsideMenu() {
  const { appPath } = useCompanyCtx();
  return (
    <>
      <Link href={appPath} legacyBehavior>
        <NavLink label="Company Dashboard" icon={<IconGauge size={24} />} />
      </Link>
      <Link href={appPath + '/create-account'} legacyBehavior>
        <NavLink label="Create Account" icon={<IconGauge size={24} />} />
      </Link>
      <Link href={appPath + '/ledger/create'} legacyBehavior>
        <NavLink label="Create Ledger" icon={<IconGauge size={24} />} />
      </Link>
      <Divider my="sm" />
      <Link href="/" legacyBehavior>
        <NavLink label="Exit Company" icon={<IconGauge size={24} />} />
      </Link>
    </>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const {
    company: { name },
    viewFY,
  } = useCompanyCtx();
  return (
    <AdminLayout
      asideMenu={<AsideMenu />}
      header={
        <Group position="apart" sx={{ flexGrow: 1 }}>
          <Badge variant="gradient" size="xl">
            {name}
          </Badge>
          <Badge variant="gradient" size="xl">
            {viewFY.name}
          </Badge>
          {/* <div>
            <Select
              placeholder="Pick one"
              w={130}
              data={fy.map(
                (fy) =>
                  ({
                    label: fy.name,
                    value: fy.name,
                  } as SelectItem)
              )}
              value={appFy.name}
              onChange={(query) => {
                if (query) {
                  changeFy(query);
                }
              }}
            />
          </div> */}
        </Group>
      }
    >
      {children}
    </AdminLayout>
  );
}

export default function CompanyDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const company = usePathname().split('/')[2];
  return (
    <CompanyProvider company={company}>
      <Layout>{children}</Layout>
    </CompanyProvider>
  );
}
