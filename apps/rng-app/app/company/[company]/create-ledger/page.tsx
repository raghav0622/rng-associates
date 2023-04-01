'use client';

import { Container } from '@mantine/core';
import {
  APIFormErrorHandler,
  CreateLedgerSchema,
  successNotification,
  useAutoKeyAPI,
  useAutoKeySelectOption,
  useCompanyCtx,
  useCreateLedger,
} from '@rng-associates/accounts';
import { RNGForm, useCreateRNGForm } from '@rng-associates/forms';

export default function CreateLedgerPage() {
  const { mutate } = useCreateLedger();
  const { create: createAutoKey } = useAutoKeyAPI();
  const { company } = useCompanyCtx();
  const LedgerTypeData = useAutoKeySelectOption('ledger-category');

  const props = useCreateRNGForm(CreateLedgerSchema, {
    name: 'create-Ledger-form',
    initialValues: {
      company: company.id,
      category: undefined,
      name: undefined,
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
        name: 'name',
        label: 'Name',
      },
      {
        type: 'select',
        name: 'category',
        label: 'Ledger Category',
        required: true,
        searchable: true,
        clearable: true,
        nothingFound: 'No data exists with this query',
        data: LedgerTypeData,
        creatable: true,
        getCreateLabel: (q) => `Create Ledger Category: ${q}`,
        onCreate: async (query) => {
          const item = { value: query, label: query };
          await createAutoKey({
            name: 'ledger-category',
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

        successNotification(`Ledger Created: ${values.name}`);

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
