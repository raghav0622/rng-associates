'use client';

import { Title } from '@mantine/core';
import { lazy, Suspense } from 'react';
import ContentWin from '../../components/ContentWin';

const ViewEntity = lazy(() => import('../../components/Entity/ViewEntity'));

export default function EntityPage() {
  return (
    <ContentWin sx={{ flex: '1 0 auto' }}>
      <Title order={2}>Entities</Title>
      <Suspense fallback={<>Entitiy Data Loader</>}>
        <ViewEntity />
      </Suspense>
    </ContentWin>
  );
}
