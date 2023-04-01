'use client';
import { ToWords } from 'to-words';

import { Badge, Card, Group, Stack, Title } from '@mantine/core';
import {
  APIFormErrorHandler,
  CreateTransaction,
  CreateTransactionSchema,
  currency,
  fireDate,
  successNotification,
  useAccountCtx,
  useAccountOptions,
  useCompanyCtx,
  useCreateTransactionAPI,
  useLedgerOptions,
} from '@rng-associates/accounts';
import { RNGForm, useCreateRNGForm } from '@rng-associates/forms';
import { PathValue } from 'react-hook-form';
import { TransactionTable } from '../../../../../components';

type AccountPageProps = {
  params: {
    id: string;
  };
};

function CreateTransactionForm({
  account,
  book,
}: {
  account: string;
  book: string;
}) {
  const { viewFY } = useCompanyCtx();
  const { mutate } = useCreateTransactionAPI();
  const accOptions = useAccountOptions().filter((a) => a.value !== account);
  const ledgerOptions = useLedgerOptions();
  const toWords = new ToWords({
    localeCode: 'en-IN',
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
    },
  });
  const props = useCreateRNGForm(CreateTransactionSchema, {
    name: 'create-transaction-form',
    initialValues: {
      account,
      book,
      amount: undefined,
      bankNarration: undefined,
      date: undefined,
      particular: undefined,
      type: undefined,
      id: 'auto',
      linkRef: undefined,
      linkType: 'no-link',
    },
    uiSchema: [
      {
        type: 'hidden',
        name: 'id',
      },
      {
        type: 'hidden',
        name: 'account',
      },
      {
        type: 'hidden',
        name: 'book',
      },
      {
        name: 'linkType',
        type: 'dependent',
        label: 'Link Type',
        dependentFields: ['linkRef'],
        getVal: (value): PathValue<CreateTransaction, 'linkType'> => {
          const link = value('linkRef');
          const isAccount =
            accOptions.filter(
              //@ts-expect-error samjhauga
              (acc) => acc.value === link
            ).length > 0;

          const isLedger =
            ledgerOptions.filter(
              //@ts-expect-error samjhauga
              (acc) => acc.value === link
            ).length > 0;

          if (isAccount) {
            return 'account-to-account';
          }
          if (isLedger) {
            return 'account-to-ledger';
          }
          return 'no-link';
        },
      },
      {
        type: 'date',
        name: 'date',
        label: 'Date',
        minDate: fireDate(viewFY.start),
        maxDate: fireDate(viewFY.end),
        colProps: {
          lg: 2,
        },
      },
      {
        name: 'linkRef',
        type: 'select',
        label: 'Link Account / Ledger',
        data: [...accOptions, ...ledgerOptions],
        clearable: true,
        searchable: true,

        colProps: { lg: 4 },
      },
      {
        type: 'number',
        name: 'amount',
        label: 'Amount',
        description: (value: number) => {
          return value > 0 && value !== Infinity ? toWords.convert(value) : '';
        },
        colProps: {
          lg: 4,
        },
      },
      {
        type: 'select',
        name: 'type',
        label: 'Transaction Type',

        required: true,
        searchable: true,
        clearable: true,
        nothingFound: 'No data exists with this query',
        data: ['CR', 'DR'],
        colProps: {
          lg: 2,
        },
      },
      {
        type: 'text',
        name: 'particular',
        label: 'Particulars',
        colProps: {
          lg: 6,
        },
      },
      {
        type: 'text',
        name: 'bankNarration',
        label: 'Bank narration',
        colProps: {
          lg: 6,
        },
      },
    ],
    onSubmit: async (values) => {
      const data = await APIFormErrorHandler(async () => {
        if (values.linkType === 'no-link' && !values.particular) {
          return {
            errors: [
              {
                message: 'Add particular if not linking account / ledger',
              },
            ],
          };
        }

        await mutate(values);

        successNotification(`Transaction Created`);

        return {
          errors: false,
        };
      });

      return data;
    },
  });

  return <RNGForm {...props} />;
}

export default function AccountPage({ params: { id } }: AccountPageProps) {
  const { viewFY } = useCompanyCtx();
  const { getTransactionData } = useAccountCtx();

  const transactionData = getTransactionData(id);

  if (transactionData === undefined) {
    return <>Error 404!</>;
  }

  const { data: account, currentBook, count } = transactionData;

  return (
    <>
      <Stack>
        <Card>
          <Group position="apart">
            <Title order={3}>{account.nickName}</Title>
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
        <CreateTransactionForm account={account.id} book={viewFY.name} />
        <TransactionTable type="Account" refrence={account.id} />
      </Stack>
    </>
  );
}
