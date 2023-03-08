import { lazy } from 'react';
import ContentWin from '../../components/ContentWin';

const ViewEntity = lazy(() => import('../../components/Entity/ViewEntity'));

function ViewEntityPage() {
  return (
    <ContentWin>
      <ViewEntity />
    </ContentWin>
  );
}
export default ViewEntityPage;
