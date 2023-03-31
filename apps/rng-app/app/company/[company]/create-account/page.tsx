'use client';

import { Container } from '@mantine/core';
import {
  APIFormErrorHandler,
  CreateAccountSchema,
  successNotification,
  useAutoKeyAPI,
  useAutoKeySelectOption,
  useCompanyCtx,
  useCreateAccountAPI,
} from '@rng-associates/accounts';
import { RNGForm, useCreateRNGForm } from '@rng-associates/forms';

export default function CreateAccountPage() {
  const { mutate } = useCreateAccountAPI();
  const { create: createAutoKey } = useAutoKeyAPI();
  const { company } = useCompanyCtx();
  const accountTypeData = useAutoKeySelectOption('account-type');

  const props = useCreateRNGForm(CreateAccountSchema, {
    name: 'create-account-form',
    initialValues: {
      company: company.id,
      nickName: undefined,
      type: accountTypeData[0].value,
      bankName: undefined,
      accountNumber: undefined,
      ifsc: undefined,
      particular: undefined,
      prevBalance: undefined,
    },
    uiSchema: [
      {
        type: 'hidden',
        name: 'company',
      },
      {
        type: 'text',
        name: 'nickName',
        label: 'Account Nick Name',
      },
      {
        type: 'select',
        name: 'type',
        label: 'Account Type',

        required: true,
        searchable: true,
        clearable: true,
        nothingFound: 'No data exists with this query',
        data: accountTypeData,
        creatable: true,
        getCreateLabel: (q) => `Create Ledger Category: ${q}`,
        onCreate: async (query) => {
          const item = { value: query, label: query };
          await createAutoKey({
            name: 'account-type',
            value: query,
          });
          return item;
        },
      },
      {
        type: 'number',
        name: 'prevBalance',
        label: 'Opening Balance',
      },
      {
        type: 'text',
        name: 'particular',
        label: 'Particular for Opening Balance',
      },
      {
        type: 'text',
        name: 'bankName',
        label: 'Bank Name (if any)',
      },
      {
        type: 'text',
        name: 'accountNumber',
        label: 'A/c Number (if any)',
      },
      {
        type: 'text',
        name: 'ifsc',
        label: 'IFSC Code (if any)',
      },
    ],
    onSubmit: async (values) => {
      const data = await APIFormErrorHandler(async () => {
        if (values.prevBalance && !values.particular) {
          return {
            errors: [
              {
                message: 'Please enter particular for opening balance',
              },
            ],
          };
        }
        await mutate(values);

        successNotification(`Account Created: ${values.nickName}`);

        return {
          errors: false,
        };
      });

      return data;
    },
  });

  return (
    <Container size={'xs'}>
      <RNGForm {...props} />
    </Container>
  );
}
