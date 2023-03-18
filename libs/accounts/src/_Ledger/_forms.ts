import { useCreateRNGForm, useCreateUISchema } from '@rng-associates/forms';
import { APIFormErrorHandler, successNotification } from '../utils';
import { useAutoKeyAPI, useAutoKeySelectOption } from '../_AutoKey';
import { useCompanyCtx } from '../_Context';
import { useCreateLedgerAPI } from './_api';
import { CreateLedgerSchema } from './_schema';

export const useCreateLedgerForm = () => {
  const { create } = useAutoKeyAPI();
  const { mutate } = useCreateLedgerAPI();
  const {
    company: { id: entity },
  } = useCompanyCtx();
  const ledgerTypeData = useAutoKeySelectOption('ledger-category');
  const createLedgerFormUISchema = useCreateUISchema(CreateLedgerSchema, [
    {
      name: 'company',
      type: 'hidden',
    },
    {
      name: 'category',
      label: 'Category of Ledger',
      type: 'select',
      required: true,
      searchable: true,
      clearable: true,
      nothingFound: 'No data exists with this query',
      data: ledgerTypeData,
      creatable: true,
      getCreateLabel: (q) => `Create Ledger Category: ${q}`,
      onCreate: async (query) => {
        const item = { value: query, label: query };
        await create({
          name: 'ledger-category',
          value: query,
        });
        return item;
      },
    },
    {
      name: 'name',
      label: 'Name of Ledger',
      type: 'text',
      required: true,
    },
  ]);

  const createLedgerForm = useCreateRNGForm(CreateLedgerSchema, {
    name: 'create-Ledger-form',
    initialValues: {
      name: undefined,
      company: entity,
      category: undefined,
    },
    meta: {
      formTitle: `Create New Ledger`,
    },
    uiSchema: createLedgerFormUISchema.form,
    onSubmit: async (values) => {
      const data = await APIFormErrorHandler(async () => {
        const result = await mutate(values);

        successNotification(`Ledger Created: ${result.name}`);

        return {
          errors: false,
        };
      });

      return data;
    },
  });

  return createLedgerForm;
};
