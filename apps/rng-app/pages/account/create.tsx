import { lazy } from 'react';

const CreateForm = lazy(
  () => import('../../components/Account/CreateAccountForm')
);

function CreateAccountPage() {
  return <CreateForm />;
}
export default CreateAccountPage;
