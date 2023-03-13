import { useCreateResource } from '@rng-associates/firesource';
import { useFirestore } from 'reactfire';
import { AccountSchema } from './_schema';

export const useAccount = () => {
  const firestore = useFirestore();

  return useCreateResource({
    name: 'account',
    firestoreCollectionName: 'account',
    schema: AccountSchema,
    firestore: firestore,
  });
};
