'use client';

import {
  CompanyProvider,
  useCompanyCtx,
  useCreateFYForm,
} from '@rng-associates/accounts';
import { AdminLayout } from '@rng-associates/admin-layout';
import { usePathname } from 'next/navigation';

import {
  Badge,
  Container,
  Divider,
  Group,
  NavLink,
  Select,
  SelectItem,
  Stack,
  Title,
} from '@mantine/core';
import { RNGForm } from '@rng-associates/forms';
import { IconGauge } from '@tabler/icons';
import Link from 'next/link';

export function AsideMenu() {
  const { appPath } = useCompanyCtx();
  return (
    <>
      <Link href={appPath} legacyBehavior>
        <NavLink label="Dashboard" icon={<IconGauge size={24} />} />
      </Link>
      <Link href={appPath + 'account/create'} legacyBehavior>
        <NavLink label="Create Account" icon={<IconGauge size={24} />} />
      </Link>
      <Link href={appPath + 'ledger/create'} legacyBehavior>
        <NavLink label="Create Ledger" icon={<IconGauge size={24} />} />
      </Link>
      <Divider my="sm" />
      <Link href={appPath + 'add-fy'} legacyBehavior>
        <NavLink label="Add F.Y." icon={<IconGauge size={24} />} />
      </Link>
      <Link href="/" legacyBehavior>
        <NavLink label="Exit Company" icon={<IconGauge size={24} />} />
      </Link>
    </>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const {
    company: { name, fy },
    fy: appFy,
    changeFy,
  } = useCompanyCtx();
  const props = useCreateFYForm();
  if (fy.length === 0) {
    return (
      <Container size={'xs'}>
        <Stack pt="lg">
          <Title order={4} align="center">
            No Financial Year Created
          </Title>
          <RNGForm {...props} />
        </Stack>
      </Container>
    );
  }
  return (
    <AdminLayout
      asideMenu={<AsideMenu />}
      header={
        <Group position="apart" sx={{ flexGrow: 1 }}>
          <Badge variant="gradient" size="xl">
            {name}
          </Badge>
          <div>
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
          </div>
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
  const EntityID = usePathname().split('/')[2];
  return (
    <CompanyProvider id={EntityID} appPath={`/company/${EntityID}/`}>
      <Layout>{children}</Layout>
    </CompanyProvider>
  );
}
