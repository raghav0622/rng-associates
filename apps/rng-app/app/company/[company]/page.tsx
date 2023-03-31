'use client';

import { Card, Grid, Stack, Tabs, Title } from '@mantine/core';
import { useCompanyCtx } from '@rng-associates/accounts';
import { groupBy, orderBy } from 'lodash';
import React, { Suspense, useMemo } from 'react';
import { AccountInfoCard } from '../../../components';

function AccountsList() {
  const { accounts: data } = useCompanyCtx();
  const groupedAccounts = useMemo(() => {
    const orderedData = orderBy(data, 'type', 'asc');
    const obj = groupBy(orderedData, 'type');

    return obj;
  }, [data]);

  if (data.length === 0) {
    return <>No Accounts To Show. Create One?</>;
  }

  return (
    <Stack>
      {Object.keys(groupedAccounts).map((key, idx) => {
        return (
          <React.Fragment key={'account-type-' + key}>
            <Title order={6} ml="sm">
              {key}
            </Title>
            <Grid>
              {groupedAccounts[key].map((acc) => (
                <Grid.Col key={acc.id} xs={12} md={4} lg={3}>
                  <AccountInfoCard {...acc} />
                </Grid.Col>
              ))}
            </Grid>
          </React.Fragment>
        );
      })}
    </Stack>
  );
}

export default function CompanyDashboard() {
  return (
    <>
      <Tabs defaultValue={'accounts'}>
        <Tabs.List>
          <Tabs.Tab value="accounts">Accounts</Tabs.Tab>
          <Tabs.Tab value="ledgers">Ledgers</Tabs.Tab>
        </Tabs.List>
        <Card mt="md" p="lg">
          <Tabs.Panel value="accounts">
            <Suspense fallback={<>Loading Accounts...</>}>
              <AccountsList />
            </Suspense>
          </Tabs.Panel>
          <Tabs.Panel value="ledgers">To implement</Tabs.Panel>
        </Card>
      </Tabs>
    </>
  );
}