import { Container } from '@mantine/core';
import { RNGForm } from '@rng-associates/forms';
import { z } from 'zod';

export const BankSchema = z
  .object({
    name1: z.string().min(1),
  })
  .strict();
export function Index() {
  return (
    <>
      <Container size="xs">
        <RNGForm
          schema={BankSchema}
          initialValues={{
            name1: undefined,
          }}
          meta={{
            name: 'test-form',
            formTitle: 'Test Form',
            formDescription: 'Test Form Description',
          }}
          ui={{
            schema: [
              {
                name: 'name1',
                label: 'Name 1',
                description: 'test description',
                type: 'text',
                required: true,
              },
            ],
          }}
          functions={{
            onSubmit: async (values) => {
              console.log(values);

              return {
                errors: false,
              };
            },
          }}
        />
      </Container>
    </>
  );
}

export default Index;
