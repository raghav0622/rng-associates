'use client';

import {
  APIFormErrorHandler,
  CreateCompanySchema,
  successNotification,
  useCreateCompanyAPI,
} from '@rng-associates/accounts';
import { RNGForm, useCreateRNGForm } from '@rng-associates/forms';
import { UserLayout } from '../../components/Layout';

export default function CreateCompany() {
  const { mutate } = useCreateCompanyAPI();
  const props = useCreateRNGForm(CreateCompanySchema, {
    name: 'create-company-form',
    initialValues: { name: undefined, startYear: new Date().getFullYear() },
    uiSchema: [
      {
        type: 'text',
        name: 'name',
        label: 'New Company Name',
      },
      {
        type: 'number',
        name: 'startYear',
        label: 'Company Start Year',
      },
    ],
    onSubmit: async (values) => {
      const data = await APIFormErrorHandler(async () => {
        await mutate(values);

        successNotification(`Company Created: ${values.name}`);

        return {
          errors: false,
        };
      });

      return data;
    },
  });
  return (
    <UserLayout>
      <RNGForm {...props} />
    </UserLayout>
  );
}
