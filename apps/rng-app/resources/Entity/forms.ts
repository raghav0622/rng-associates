import { notifications } from '@mantine/notifications';
import { useCreateRNGForm } from '@rng-associates/forms';
import { APIFormErrorHandler } from '../utils';
import { useEntityAPI } from './api';
import { EntitySchema } from './schema';

export const useEntityForms = () => {
  const { create } = useEntityAPI();
  const createEntity = useCreateRNGForm(
    EntitySchema.omit({
      id: true,
    }),
    {
      name: 'create-entity-form',
      initialValues: {
        name: undefined,
      },
      meta: {
        formTitle: 'Create A New Entity!',
        formDescription:
          'An entity refers to a person or buisness, organization, corporation etc.',
      },
      uiSchema: [
        {
          name: 'name',
          label: 'Name of Entity',
          type: 'text',
          required: true,
        },
      ],
      onSubmit: async (values) => {
        const t = await APIFormErrorHandler(async () => {
          const result = await create(values);

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
    createEntity,
  };
};
