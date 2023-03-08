import ContentWin from '../../../components/ContentWin';

import { useRouter } from 'next/router';
import { lazy } from 'react';

const EditForm = lazy(
  () => import('../../../components/Ledger/EditAccountForm')
);

function CreateAccountPage() {
  const router = useRouter();
  const { pid } = router.query;

  if (pid !== undefined && typeof pid === 'string') {
    return (
      <ContentWin>
        <EditForm id={pid} />
      </ContentWin>
    );
  }
  return <ContentWin>Error 404</ContentWin>;
}
export default CreateAccountPage;
