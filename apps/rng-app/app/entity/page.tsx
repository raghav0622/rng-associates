'use client';

import { Title } from '@mantine/core';
import { ViewEntity } from '../../components';

export default function EntityPage() {
  return (
    <>
      <Title order={2}>Entities</Title>
      <ViewEntity />
    </>
  );
}
