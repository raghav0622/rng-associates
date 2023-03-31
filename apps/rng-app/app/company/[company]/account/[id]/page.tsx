'use client';

import { Badge, Card, Group, Stack, Title } from '@mantine/core';
import {
  APIFormErrorHandler,
  CreateTransaction,
  CreateTransactionSchema,
  firstoreTimestampToDate,
  successNotification,
  useAccountOptions,
  useCompanyCtx,
  useCreateTransactionAPI,
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

          if (isAccount) {
            return 'account-to-account';
          }
          return 'no-link';
        },
      },
      {
        type: 'date',
        name: 'date',
        label: 'Date',
        minDate: firstoreTimestampToDate(viewFY.start),
        maxDate: firstoreTimestampToDate(viewFY.end),
        colProps: {
          lg: 2,
        },
      },
      {
        name: 'linkRef',
        type: 'select',
        label: 'Link Account / Ledger',
        data: [...accOptions],
        clearable: true,
        searchable: true,

        colProps: { lg: 4 },
      },
      {
        type: 'number',
        name: 'amount',
        label: 'Amount',
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
  const { accounts, viewFY } = useCompanyCtx();
  const account = accounts.find((e) => e.id === id);
  const book = account?.books.find((val) => val.id === viewFY.name);
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
        <CreateTransactionForm account={account.id} book={viewFY.name} />
        {book && <TransactionTable accountBook={book} />}
      </Stack>
    </>
  );
}
