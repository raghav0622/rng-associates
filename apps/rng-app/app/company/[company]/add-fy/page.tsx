'use client';

import { Container } from '@mantine/core';
import { useCreateFYForm } from '@rng-associates/accounts';
import { RNGForm } from '@rng-associates/forms';

export default function CreateAccountPage() {
  const props = useCreateFYForm();
  return (
    <Container size={'xs'}>
      <RNGForm {...props} />
    </Container>
  );
}
