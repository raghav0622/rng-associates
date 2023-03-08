import { Container } from '@mantine/core';
import { lazy } from 'react';

const ViewEntity = lazy(() => import('../../components/Entity/ViewEntity'));

function ViewEntityPage() {
  return (
    <Container fluid>
      <ViewEntity />
    </Container>
  );
}
export default ViewEntityPage;
