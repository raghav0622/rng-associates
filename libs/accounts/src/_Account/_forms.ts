import { useCreateRNGForm, useCreateUISchema } from '@rng-associates/forms';
import { APIFormErrorHandler, successNotification } from '../utils';
import { useCompanyCtx } from '../_Context';
import { useCreateAccountAPI } from './_api';
import { AccountType, CreateAccountSchema } from './_schema';

export const useCreateAccountForm = () => {
  const { mutate } = useCreateAccountAPI();
  const {
    company: { id: entity },
  } = useCompanyCtx();
  const createAccountFormUISchema = useCreateUISchema(CreateAccountSchema, [
    {
      name: 'owner',
      type: 'hidden',
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
    // {
    //   name: 'bankName',
    //   label: 'Bank Name',
    //   type: 'text',
    //   required: true,
    // },
    // {
    //   name: 'ifsc',
    //   label: 'IFSC',
    //   type: 'text',
    //   required: true,
    // },
    // {
    //   name: 'accountNumber',
    //   label: 'Account Number',
    //   type: 'text',
    //   required: true,
    // },
  ]);

  const createAccountForm = useCreateRNGForm(CreateAccountSchema, {
    name: 'create-account-form',
    initialValues: {
      // accountNumber: undefined,
      // bankName: undefined,
      // ifsc: undefined,
      nickName: undefined,
      owner: entity,
      type: 'Bank Account',
    },
    meta: {
      formTitle: `Create New Account`,
    },
    uiSchema: createAccountFormUISchema.form,
    onSubmit: async (values) => {
      const data = await APIFormErrorHandler(async () => {
        const result = await mutate(values);

        successNotification(`Account Created: ${result.nickName}`);

        return {
          errors: false,
        };
      });

      return data;
    },
  });

  return createAccountForm;
};
