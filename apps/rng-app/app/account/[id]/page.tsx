'use client';

import { Badge, Card, Group, Stack, Title } from '@mantine/core';
import {
  CreateTransactionForm,
  numberToCurrency,
  useEntityCtx,
} from '@rng-associates/accounts';

type AccountPageProps = {
  params: {
    id: string;
  };
};

export default function AccountPage({ params: { id } }: AccountPageProps) {
  const { accounts } = useEntityCtx();
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
              <Badge size="lg" variant="filled" color="red">
                Balance: {numberToCurrency(account.balance, true)}
              </Badge>
            </Group>
          </Stack>
        </Card>
        <CreateTransactionForm account={account} />
      </Stack>
    </>
  );
}
