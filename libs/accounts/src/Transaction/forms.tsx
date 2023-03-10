import { notifications } from '@mantine/notifications';
import { useCreateRNGForm } from '@rng-associates/forms';
import { APIFormErrorHandler } from '../utils';

import { RNGForm } from '@rng-associates/forms';
import { useTransactionAPI } from './api';
import { CreateTransactionSchema } from './schema';

export const useTransactionForms = () => {
  const { create } = useTransactionAPI();

  const createTransaction = useCreateRNGForm(CreateTransactionSchema, {
    name: 'create-Transaction-in-ledger-form',
    initialValues: {
      amount: 0,
      type: 'CR',
      particular: undefined,
      narration: undefined,
      primaryLedger: undefined,
      date: new Date(),
    },
    meta: {
      formTitle: 'Create A New Transaction!',
    },
    uiSchema: [
      {
        name: 'primaryLedger',
        type: 'hidden',
      },
      {
        name: 'date',
        label: 'Transaction Date',
        type: 'date',
        withAsterisk: true,
        colProps: { xs: 12, md: 4, lg: 2 },
      },
      {
        name: 'amount',
        type: 'number',
        label: 'Amount',
        withAsterisk: true,
        colProps: { xs: 8, md: 4, lg: 2 },
      },
      {
        name: 'type',
        type: 'select',
        label: 'Type',
        required: true,
        colProps: { xs: 4, md: 4, lg: 1 },
        data: ['CR', 'DR'],
      },
      {
        name: 'particular',
        type: 'text',
        label: 'Particulars (if any)',
        colProps: { xs: 4, md: 3, lg: 4 },
      },
      {
        name: 'narration',
        type: 'text',
        label: 'Bank Narration (if any)',
        colProps: { xs: 4, md: 3, lg: 3 },
      },
    ],
    onSubmit: async (values) => {
      const t = await APIFormErrorHandler(async () => {
        await create(values);

        notifications.show({
          autoClose: 3000,
          title: `Success!`,
          message: `Transaction Created`,
          color: 'teal',
        });

        return {
          errors: false,
        };
      });

      return t;
    },
  });

  return {
    createTransaction,
  };
};

export function CreateTransactionForm() {
  const { createTransaction } = useTransactionForms();

  return <RNGForm {...createTransaction} />;
}
