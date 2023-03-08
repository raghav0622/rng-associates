import { Container } from '@mantine/core';
import { lazy } from 'react';

const CreateEntityForm = lazy(
  () => import('../../components/Entity/CreateEntityForm')
);

function CreateEntityPage() {
  return (
    <Container size="xs">
      <CreateEntityForm />
    </Container>
  );
}
export default CreateEntityPage;
