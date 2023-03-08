import { useRouter } from 'next/router';
import { lazy } from 'react';

const EditForm = lazy(
  () => import('../../../components/Account/EditAccountForm')
);

function CreateAccountPage() {
  const router = useRouter();
  const { pid } = router.query;

  if (pid !== undefined && typeof pid === 'string') {
    return <EditForm id={pid} />;
  }
  return <>Error 404</>;
}
export default CreateAccountPage;
