import { lazy } from 'react';

const CreateEntityForm = lazy(
  () => import('../../components/Entity/CreateEntityForm')
);

function CreateEntityPage() {
  return <CreateEntityForm />;
}
export default CreateEntityPage;
