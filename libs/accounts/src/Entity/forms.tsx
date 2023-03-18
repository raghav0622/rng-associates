import { notifications } from '@mantine/notifications';
import { useCreateRNGForm } from '@rng-associates/forms';
import { APIFormErrorHandler, successNotification } from '../utils';
import { useCompanyCtx } from '../_Context';
import { useCreateEntityAPI, useCreateFYinEntityAPI } from './api';
import { EntitySchema, fy } from './schema';

export const useCreateCompanyForm = () => {
  const { mutate } = useCreateEntityAPI();

  const form = useCreateRNGForm(
    EntitySchema.omit({
      id: true,
    }),
    {
      name: 'create-company-form',
      initialValues: {
        name: undefined,
      },
      meta: {
        formTitle: 'Create A New Company!',
      },
      uiSchema: [
        {
          name: 'name',
          label: 'Name of Company',
          type: 'text',
          required: true,
        },
      ],
      onSubmit: async (values) => {
        const t = await APIFormErrorHandler(async () => {
          const result = await mutate(values);

          notifications.show({
            autoClose: 3000,
            title: `Success!`,
            message: `Entity Created: ${result?.name}`,
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

  return {
    createCompany: form,
  };
};

export const useCreateFYForm = () => {
  const {
    company: { id },
  } = useCompanyCtx();
  const { mutate } = useCreateFYinEntityAPI();

  const form = useCreateRNGForm(fy, {
    name: 'create-fy-in-company-form',
    initialValues: {
      name: undefined,
      start: undefined,
      end: undefined,
    },
    meta: {
      formTitle: 'Add A New Financial Year!',
    },
    uiSchema: [
      {
        name: 'name',
        type: 'text',
        label: 'Name of Fiancial Year',
      },
      {
        name: 'start',
        type: 'date',
        label: 'Start Date',
      },
      {
        name: 'end',
        type: 'date',
        label: 'End Date',
      },
    ],
    onSubmit: async (values) => {
      const t = await APIFormErrorHandler(async () => {
        await mutate(values);

        successNotification('Successfully added Finacnial Year');

        return {
          errors: false,
        };
      });

      return t;
    },
  });
  return form;
};
