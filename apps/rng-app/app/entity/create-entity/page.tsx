'use client';

import { lazy } from 'react';
import ContentWin from '../../../components/ContentWin';

const CreateForm = lazy(
  () => import('../../../components/Entity/CreateEntityForm')
);

export function EntityPage() {
  return (
    <ContentWin mx="auto">
      <CreateForm />
    </ContentWin>
  );
}

export default EntityPage;
