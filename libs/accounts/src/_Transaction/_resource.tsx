import { useCreateResource } from '@rng-associates/firesource';
import { useFirestore } from 'reactfire';
import { AccountTransactionSchema } from './_schema';

export const useTransaction = () => {
  const firestore = useFirestore();

  return useCreateResource({
    name: 'transaction',
    firestoreCollectionName: 'transaction',
    schema: AccountTransactionSchema,
    firestore: firestore,
  });
};
