import { Container } from '@mantine/core';
import { lazy } from 'react';
const AutoCompleteData = lazy(() => import('../components/AutoCompleteData'));

export function AutoKeyDataPage() {
  return (
    <Container fluid>
      <AutoCompleteData />
    </Container>
  );
}

export default AutoKeyDataPage;
