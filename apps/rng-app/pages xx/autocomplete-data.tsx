import { lazy } from 'react';
import ContentWin from '../components/ContentWin';
const AutoCompleteData = lazy(() => import('../components/AutoCompleteData'));

export function AutoKeyDataPage() {
  return (
    <ContentWin>
      <AutoCompleteData />
    </ContentWin>
  );
}

export default AutoKeyDataPage;
