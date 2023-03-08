import { lazy } from 'react';
import ContentWin from '../../components/ContentWin';

const CreateEntityForm = lazy(
  () => import('../../components/Entity/CreateEntityForm')
);

function CreateEntityPage() {
  return (
    <ContentWin>
      <CreateEntityForm />
    </ContentWin>
  );
}
export default CreateEntityPage;
