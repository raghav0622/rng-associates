'use client';

import { Badge, Card, Group, Stack, Title } from '@mantine/core';
import {
  currency,
  useCompanyCtx,
  useLedgerCtx,
} from '@rng-associates/accounts';
import { TransactionTable } from '../../../../../components';

type LedgerPageProps = {
  params: {
    id: string;
  };
};

export default function AccountPage({ params: { id } }: LedgerPageProps) {
  const { viewFY } = useCompanyCtx();
  const { getTransactionData } = useLedgerCtx();

  const transactionData = getTransactionData(id);

  if (transactionData === undefined) {
    return <>Error 404!</>;
  }

  const { data: ledger, currentBook, count } = transactionData;

  return (
    <>
      <Stack>
        <Card>
          <Group position="apart">
            <Title order={3}>{ledger.name}</Title>
            <Group>
              <Badge size="lg" variant="filled" color="blue">
                Deposits: {currency(currentBook.deposits)}
              </Badge>
              <Badge size="lg" variant="filled" color="blue">
                Withdrawls: {currency(currentBook.withdrawls)}
              </Badge>
              <Badge size="lg" variant="filled" color="blue">
                Count: {count}
              </Badge>
            </Group>
          </Group>
        </Card>
        <TransactionTable type="Ledger" refrence={ledger.id} />
      </Stack>
    </>
  );
}
