'use client';

import { Container } from '@mantine/core';
import { useCreateAccountForm } from '@rng-associates/accounts';
import { RNGForm } from '@rng-associates/forms';

export default function CreateAccountPage() {
  const props = useCreateAccountForm();
  return (
    <Container size={'xs'}>
      <RNGForm {...props} />
    </Container>
  );
}
