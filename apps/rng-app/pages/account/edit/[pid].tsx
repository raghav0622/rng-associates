import { Container } from '@mantine/core';
import { useRouter } from 'next/router';
import { lazy } from 'react';

const EditForm = lazy(
  () => import('../../../components/Account/EditAccountForm')
);

function CreateAccountPage() {
  const router = useRouter();
  const { pid } = router.query;

  if (pid !== undefined && typeof pid === 'string') {
    return (
      <Container size="xs">
        <EditForm id={pid} />
      </Container>
    );
  }
  return <Container size="lg">Error 404</Container>;
}
export default CreateAccountPage;
