'use client';

import { Badge, Card, Group, Stack, Title } from '@mantine/core';
import {
  numberToCurrency,
  useEntityDataById,
  useLedgerDataByID,
  useTransactionForms,
} from '@rng-associates/accounts';
import { RNGForm } from '@rng-associates/forms';
import { Suspense } from 'react';
import { TransactionTableSimple } from '../../../components';

type PageProps = {
  params: { id: string };
};

function LedgerPage({ params: { id } }: PageProps) {
  const ledger = useLedgerDataByID(id);
  const entity = useEntityDataById(ledger.owner);
  const { createTransaction } = useTransactionForms();
  return (
    <Stack spacing="md">
      <Card sx={{ flexGrow: 1 }}>
        <Group position="apart">
          <Title order={3}>Ledger: {ledger.name}</Title>
          <Group spacing="sm">
            <Badge size="lg" color="red" variant="filled">
              {entity.name}
            </Badge>
            <Badge size="lg" color="blue" variant="filled">
              Category: {ledger.category}
            </Badge>
            <Badge size="lg" variant="gradient">
              Balance : {numberToCurrency(ledger.balance, true)}
            </Badge>
          </Group>
        </Group>
      </Card>
      <Suspense fallback={<>Loading Add Transaction Form...</>}>
        <RNGForm
          {...createTransaction}
          initialValues={{
            ...createTransaction.initialValues,
            primaryLedger: id,
          }}
        />
      </Suspense>
      <Card sx={{ flexGrow: 1 }}>
        <Suspense fallback={<>Loading Transactions...</>}>
          {ledger.transactions.length > 0 ? (
            <TransactionTableSimple data={ledger.transactions} />
          ) : (
            <>No Transactions</>
          )}
        </Suspense>
      </Card>
    </Stack>
  );
}

export default LedgerPage;
