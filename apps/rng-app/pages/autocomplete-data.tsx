import { lazy } from 'react';
const AutoCompleteData = lazy(() => import('../components/AutoCompleteData'));

export function AutoKeyDataPage() {
  return <AutoCompleteData />;
}

export default AutoKeyDataPage;
