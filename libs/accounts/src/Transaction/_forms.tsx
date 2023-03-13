import {
  RNGForm,
  useCreateRNGForm,
  useCreateUISchema,
} from '@rng-associates/forms';
import { PathValue } from 'react-hook-form';
import { Account, useAccountOptions } from '../Account';
import { APIFormErrorHandler } from '../utils';
import {
  CreateTransaction,
  CreateTransactionSchema,
  TransactionType,
} from './_schema';

export const useCreateTransactionForm = (account: Account) => {
  const accOptions = useAccountOptions().filter((a) => a.value !== account.id);
  const createTransactionFormUISchema = useCreateUISchema(
    CreateTransactionSchema,
    [
      { type: 'hidden', name: 'ref' },
      { type: 'hidden', name: 'refOrder' },
      { type: 'hidden', name: 'refPreviousBalance' },
      {
        type: 'date',
        name: 'date',
        label: 'Date',
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
        getVal: (value): PathValue<CreateTransaction, 'linkType'> => {
          const link = value('link');
          const isAccount =
            accOptions.filter(
              //@ts-expect-error samjhauga
              (acc) => acc.value === link
            ).length > 0;

          if (isAccount) {
            return 'account';
          }
          return 'ledger';
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

  const createAccountForm = useCreateRNGForm(CreateTransactionSchema, {
    name: 'create-Transaction-form',
    meta: {
      formTitle: `Create New Transaction`,
      titleOrder: 6,
    },
    initialValues: {
      date: new Date(),
      ref: account.id,
      refOrder: account.transactions.length + 1,
      refPreviousBalance: account.balance,
      amount: 0,
      link: undefined,
      linkType: undefined,
      narration: undefined,
      particular: undefined,
      type: 'CR',
    },

    uiSchema: createTransactionFormUISchema.form,
    onSubmit: async (values) => {
      const data = await APIFormErrorHandler(async () => {
        console.log(values);

        // successNotification(`Account Created: ${result.nickName}`);

        return {
          errors: false,
        };
      });

      return data;
    },
  });

  return createAccountForm;
};

type CreateTransactionFormProps = {
  account: Account;
};

export const CreateTransactionForm: React.FC<CreateTransactionFormProps> = ({
  account,
}) => {
  const props = useCreateTransactionForm(account);
  return <RNGForm {...props} />;
};
