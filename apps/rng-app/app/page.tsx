'use client';

import { Grid, Stack, Title } from '@mantine/core';
import { useEntityCtx } from '@rng-associates/accounts';
import { AccountInfoCard } from '../components/Accounts';

export default function AccountsList() {
  const {
    entity: { id },
    accounts: data,
  } = useEntityCtx();

  if (data.length === 0) {
    return <>No Accounts To Show. Create One?</>;
  }

  return (
    <Stack>
      <Title order={6} ml="sm">
        Accounts
      </Title>
      <Grid>
        {data.map((acc) => (
          <Grid.Col key={acc.id} xs={12} md={4} lg={3}>
            <AccountInfoCard {...acc} />
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
}
