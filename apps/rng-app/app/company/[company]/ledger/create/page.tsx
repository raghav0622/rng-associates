'use client';

import { Container } from '@mantine/core';
import { useCreateLedgerForm } from '@rng-associates/accounts';
import { RNGForm } from '@rng-associates/forms';

export default function CreateAccountPage() {
  const props = useCreateLedgerForm();
  return (
    <Container size={'xs'}>
      <RNGForm {...props} />
    </Container>
  );
}
