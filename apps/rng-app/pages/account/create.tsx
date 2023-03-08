import { Container } from '@mantine/core';
import { lazy } from 'react';

const CreateForm = lazy(
  () => import('../../components/Account/CreateAccountForm')
);

function CreateAccountPage() {
  return (
    <Container size="xs">
      <CreateForm />
    </Container>
  );
}
export default CreateAccountPage;
