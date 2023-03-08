import { lazy } from 'react';
import ContentWin from '../../components/ContentWin';

const CreateForm = lazy(
  () => import('../../components/Ledger/CreateAccountForm')
);

function CreateAccountPage() {
  return (
    <ContentWin>
      <CreateForm />
    </ContentWin>
  );
}
export default CreateAccountPage;
