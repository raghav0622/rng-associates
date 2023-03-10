import { useCreateRNGForm, useCreateUISchema } from '@rng-associates/forms';
import { useEntitySelectOptions } from '../Entity';
import { APIFormErrorHandler, successNotification } from '../utils';
import { AccountType, CreateAccountSchema } from './_schema';

export const useCreateAccountForm = () => {
  const entitySelectOptions = useEntitySelectOptions();

  const createAccountFormUISchema = useCreateUISchema(CreateAccountSchema, [
    {
      name: 'owner',
      label: 'Owner',
      type: 'select',
      required: true,
      searchable: true,
      clearable: true,
      nothingFound: 'No data exists with this query',
      data: entitySelectOptions,
    },
    {
      name: 'type',
      label: 'Type of Account',
      type: 'select',
      required: true,
      searchable: true,
      clearable: true,
      nothingFound: 'No data exists with this query',
      data: AccountType,
    },
    {
      name: 'nickName',
      label: 'Nick Name of Account',
      type: 'text',
      required: true,
    },
    {
      name: 'bankName',
      label: 'Bank Name',
      type: 'text',
      required: true,
    },
    {
      name: 'ifsc',
      label: 'IFSC',
      type: 'text',
      required: true,
    },
    {
      name: 'accountNumber',
      label: 'Account Number',
      type: 'text',
      required: true,
    },
  ]);

  const createAccountForm = useCreateRNGForm(CreateAccountSchema, {
    name: 'create-account-form',
    initialValues: {
      accountNumber: undefined,
      bankName: undefined,
      ifsc: undefined,
      nickName: undefined,
      owner: undefined,
      type: undefined,
    },
    meta: {
      formTitle: 'Create A New Account!',
    },
    uiSchema: createAccountFormUISchema.form,
    onSubmit: async (values) => {
      const data = await APIFormErrorHandler(async () => {
        console.log(values);
        successNotification('Created Account (Check console)');

        return {
          errors: false,
        };
      });

      return data;
    },
  });

  return createAccountForm;
};
