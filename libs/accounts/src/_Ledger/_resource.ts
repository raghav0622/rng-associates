import { useCreateResource } from '@rng-associates/firesource';
import { useFirestore } from 'reactfire';
import { LedgerSchema } from './_schema';

export const useLedger = () => {
  const firestore = useFirestore();

  return useCreateResource({
    name: 'ledger',
    firestoreCollectionName: 'ledger',
    schema: LedgerSchema,
    firestore: firestore,
  });
};
