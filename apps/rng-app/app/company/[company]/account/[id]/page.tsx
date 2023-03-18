'use client';

import { Badge, Card, Group, Stack, Title } from '@mantine/core';
import { CreateTransactionForm, useCompanyCtx } from '@rng-associates/accounts';
import { TransactionTable } from '../../../../../components';

type AccountPageProps = {
  params: {
    id: string;
  };
};

export default function AccountPage({ params: { id } }: AccountPageProps) {
  const { accounts } = useCompanyCtx();
  const account = accounts.find((e) => e.id === id);

  if (account === undefined) {
    return <>Error 404!</>;
  }

  return (
    <>
      <Stack>
        <Card>
          <Stack>
            <Title order={3}>Account: {account.nickName}</Title>
            <Group>
              <Badge size="lg" variant="filled" color="blue">
                A/c Type: {account.type}
              </Badge>
            </Group>
          </Stack>
        </Card>
        <CreateTransactionForm account={account} />
        <TransactionTable
          viewer={account.id}
          transactions={account.transactions}
        />
      </Stack>
    </>
  );
}
