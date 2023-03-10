import { notifications } from '@mantine/notifications';
import {
  RNGForm,
  useCreateRNGForm,
  useCreateUISchema,
} from '@rng-associates/forms';
import { useEntitySelectOptions } from '../Entity';
import { APIFormErrorHandler } from '../utils';
import { useLedgerAPI } from './api';
import { LedgerCategories, LedgerSchema } from './schema';

export const useLedgerForms = () => {
  const { create } = useLedgerAPI();
  const entitySelectOptions = useEntitySelectOptions();

  const CreateLedgerFormSchema = useCreateUISchema(
    LedgerSchema.omit({
      id: true,
      balance: true,
      updatedAt: true,
      transactions: true,
    }),
    [
      {
        name: 'owner',
        label: 'Owner',
        type: 'select',
        required: true,
        searchable: true,
        clearable: true,
        nothingFound: 'No Owner exists with this query',
        data: entitySelectOptions,
      },
      {
        name: 'name',
        label: 'Name of Ledger',
        type: 'text',
        required: true,
      },
      {
        name: 'category',
        label: 'Category of Ledger',
        type: 'select',
        required: true,
        searchable: true,
        clearable: true,
        nothingFound: 'No Type exists with this query',
        data: LedgerCategories.map((t) => ({ label: t, value: t })),
      },
    ]
  );

  const createLedger = useCreateRNGForm(CreateLedgerFormSchema.schema, {
    name: 'create-ledger-form',
    initialValues: {
      category: undefined,
      name: undefined,
      owner: undefined,
    },
    meta: {
      formTitle: 'Create A New Ledger!',
      // formDescription:
      // 'An entity refers to a person or buisness, organization, corporation etc.',
    },
    uiSchema: CreateLedgerFormSchema.form,
    onSubmit: async (values) => {
      const t = await APIFormErrorHandler(async () => {
        const result = await create(values);

        notifications.show({
          autoClose: 3000,
          title: `Success!`,
          message: `Ledger Created: ${result?.name}`,
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
    createLedger,
  };
};

export function CreateLedgerForm() {
  const { createLedger } = useLedgerForms();

  return <RNGForm {...createLedger} />;
}
