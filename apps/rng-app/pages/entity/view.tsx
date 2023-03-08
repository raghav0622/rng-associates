import { lazy } from 'react';

const ViewEntity = lazy(() => import('../../components/Entity/ViewEntity'));

function ViewEntityPage() {
  return <ViewEntity />;
}
export default ViewEntityPage;
