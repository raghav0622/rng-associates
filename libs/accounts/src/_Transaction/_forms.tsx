import {
  RNGForm,
  useCreateRNGForm,
  useCreateUISchema,
} from '@rng-associates/forms';
import { PathValue } from 'react-hook-form';
import { APIFormErrorHandler } from '../utils';
import { Account, useAccountOptions } from '../_Account';
import { useCompanyCtx } from '../_Context';
import { useCreateTransactionAPI } from './_api';
import { CreateTransactionLink, TransactionType } from './_schema';

export const useCreateTransactionForm = (account: Account) => {
  const { mutate } = useCreateTransactionAPI();
  const accOptions = useAccountOptions().filter((a) => a.value !== account.id);
  const { fy } = useCompanyCtx();
  const createTransactionFormUISchema = useCreateUISchema(
    CreateTransactionLink,
    [
      { type: 'hidden', name: 'ref' },
      {
        type: 'date',
        name: 'date',
        label: 'Date',
        clearable: true,
        minDate: fy.start,
        maxDate: fy.end,
        colProps: { lg: 2 },
      },
      {
        name: 'link',
        type: 'select',
        label: 'Link Account / Ledger',
        data: [...accOptions],
        clearable: true,
        searchable: true,

        colProps: { lg: 4 },
      },
      {
        name: 'linkType',
        type: 'dependent',
        label: 'Link Type',
        dependentFields: ['link'],
        getVal: (value): PathValue<CreateTransactionLink, 'linkType'> => {
          const link = value('link');
          const isAccount =
            accOptions.filter(
              //@ts-expect-error samjhauga
              (acc) => acc.value === link
            ).length > 0;

          if (isAccount) {
            return 'account';
          }
          return 'none';
        },
      },
      {
        name: 'amount',
        type: 'number',
        label: 'Amount',

        colProps: { lg: 4 },
      },
      {
        name: 'type',
        type: 'select',
        label: 'Type of Transaction',
        data: TransactionType,

        colProps: { lg: 2 },
      },
      {
        name: 'particular',
        type: 'text',
        label: 'Particulars',
        colProps: { lg: 6 },
      },
      {
        name: 'narration',
        type: 'text',
        label: 'Bank Narration',
        colProps: { lg: 6 },
      },
    ]
  );

  const createForm = useCreateRNGForm(CreateTransactionLink, {
    name: 'create-Transaction-form',
    meta: {
      formTitle: `Create New Transaction`,
      titleOrder: 6,
    },
    initialValues: {
      date: new Date(),
      ref: account.id,
      amount: 0,
      link: undefined,
      linkType: undefined,
      narration: undefined,
      particular: undefined,
      type: 'CR',
    },

    uiSchema: createTransactionFormUISchema.form,

    onSubmit: async (values) => {
      console.log(values);
      const data = await APIFormErrorHandler(async () => {
        await mutate(values);
        // successNotification(`Account Created: ${result.nickName}`);

        return {
          errors: false,
        };
      });

      return data;
    },
  });

  return { createForm };
};

type CreateTransactionFormProps = {
  account: Account;
};

export const CreateTransactionForm: React.FC<CreateTransactionFormProps> = ({
  account,
}) => {
  const { createForm } = useCreateTransactionForm(account);
  return <RNGForm {...createForm} />;
};
