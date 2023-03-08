import { SelectItem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useCreateRNGForm, useCreateUISchema } from '@rng-associates/forms';
import { useAutoKeyAPI, useAutoKeySelectOption } from '../AutoKey';
import { useEntitySelectOptions } from '../Entity';
import { APIFormErrorHandler } from '../utils';
import { useAccountAPI } from './api';
import { AccountSchema } from './schema';

export const useAccountForms = () => {
  const { create, update } = useAccountAPI();
  const { create: createAutoKey } = useAutoKeyAPI();
  const entitySelectOptions = useEntitySelectOptions();
  const bankAutoKeys = useAutoKeySelectOption('bank-name');
  const bankTypeAutoKeys = useAutoKeySelectOption('bank-type');
  const bankIFSCAutoKeys = useAutoKeySelectOption('bank-ifsc');
  const AccountFormFullSchema = useCreateUISchema(
    AccountSchema.omit({ id: true }),
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
        name: 'type',
        label: 'Type of Account',
        type: 'select',
        required: true,
        data: bankTypeAutoKeys || [],
        nothingFound: 'No data to show',
        searchable: true,
        clearable: true,

        creatable: true,
        getCreateLabel: (query) => `Create ${query}`,
        onCreate: async (q) => {
          await createAutoKey({ name: 'bank-type', value: q });

          return {
            value: q,
            label: q,
          } as SelectItem;
        },
      },
      {
        name: 'bankName',
        label: 'Bank Name',
        type: 'select',
        required: true,
        data: bankAutoKeys || [],
        nothingFound: 'No data to show',
        searchable: true,
        clearable: true,

        creatable: true,
        getCreateLabel: (query) => `Create ${query}`,
        onCreate: async (q) => {
          await createAutoKey({ name: 'bank-name', value: q });

          return {
            value: q,
            label: q,
          } as SelectItem;
        },
      },
      {
        name: 'ifscCode',
        label: 'IFSC',
        type: 'select',
        required: true,
        data: bankIFSCAutoKeys || [],
        nothingFound: 'No data to show',
        searchable: true,
        clearable: true,

        creatable: true,
        getCreateLabel: (query) => `Create ${query}`,
        onCreate: async (q) => {
          await createAutoKey({ name: 'bank-ifsc', value: q });

          return {
            value: q,
            label: q,
          } as SelectItem;
        },
      },
      {
        name: 'accountNumber',
        label: 'Account Number',
        type: 'text',
        required: true,
      },
      {
        name: 'nickName',
        label: 'Nick Name',
        type: 'text',
        required: true,
      },
      {
        name: 'branchName',
        label: 'Branch Name',
        type: 'text',
      },
      {
        name: 'branchAddress',
        label: 'Branch Address',
        type: 'text',
      },
    ]
  );
  const createAccount = useCreateRNGForm(
    AccountSchema.omit({
      id: true,
    }),
    {
      name: 'create-account-form',
      initialValues: {
        owner: undefined,
        type: undefined,
        branchName: undefined,
        bankName: undefined,
        ifscCode: undefined,
        accountNumber: undefined,
        nickName: undefined,
        branchAddress: undefined,
      },
      meta: {
        formTitle: 'Create A New Account!',
        // formDescription:
        // 'An entity refers to a person or buisness, organization, corporation etc.',
      },
      uiSchema: AccountFormFullSchema,
      onSubmit: async (values) => {
        const t = await APIFormErrorHandler(async () => {
          const result = await create(values);

          notifications.show({
            autoClose: 3000,
            title: `Success!`,
            message: `Account Created: ${result?.nickName}`,
            color: 'teal',
          });

          return {
            errors: false,
          };
        });

        return t;
      },
    }
  );

  const editAccount = useCreateRNGForm(
    AccountSchema.omit({
      id: true,
    }),
    {
      name: 'edit-account-form',
      initialValues: {
        owner: undefined,
        type: undefined,
        branchName: undefined,
        bankName: undefined,
        ifscCode: undefined,
        accountNumber: undefined,
        nickName: undefined,
        branchAddress: undefined,
      },
      meta: {
        formTitle: 'Edit Account!',
      },
      uiSchema: AccountFormFullSchema,
    }
  );

  return {
    createAccount,
    editAccount,
  };
};
