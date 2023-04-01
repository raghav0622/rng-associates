'use client';

import { Container } from '@mantine/core';
import {
  APIFormErrorHandler,
  CreateAccountSchema,
  successNotification,
  useAutoKeyAPI,
  useAutoKeySelectOption,
  useCompanyCtx,
  useCreateAccount,
} from '@rng-associates/accounts';
import { RNGForm, useCreateRNGForm } from '@rng-associates/forms';

export default function CreateAccountPage() {
  const { mutate } = useCreateAccount();
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
        label: 'Nick Name',
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
        label: 'Bank Name',
        renderLogic: async (i) => i.type !== 'Cash',
      },
      {
        type: 'text',
        name: 'accountNumber',
        label: 'A/c Number (if any)',
        renderLogic: async (i) => i.type !== 'Cash',
      },
      {
        type: 'text',
        name: 'ifsc',
        label: 'IFSC Code (if any)',
        renderLogic: async (i) => i.type !== 'Cash',
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
        // if (values.type !== 'Cash') {
        //   const errors: ErrorArray = [];
        //   if (!values.bankName) {
        //     errors.push({ message: 'Provide Bank Name', path: 'bankName' });
        //   }
        //   if (!values.accountNumber) {
        //     errors.push({
        //       message: 'Provide Account Number',
        //       path: 'accountNumber',
        //     });
        //   }
        //   if (!values.ifsc) {
        //     errors.push({ message: 'Provide IFSC for Bank', path: 'ifsc' });
        //   }

        //   return {
        //     errors,
        //   };
        // }
        // console.log(values);

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
