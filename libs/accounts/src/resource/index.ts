import { useCreateResource } from '@rng-associates/firesource';
import { useFirestore } from 'reactfire';
import { AccountSchema, CompanySchema, TransactionEtrySchema } from '../schema';

export const useCompanyResource = () => {
  const firestore = useFirestore();

  return useCreateResource({
    name: 'company',
    schema: CompanySchema,
    firestore: firestore,
  });
};
export const useAccountResource = () => {
  const firestore = useFirestore();

  return useCreateResource({
    name: 'account',
    schema: AccountSchema,
    firestore: firestore,
  });
};

export const useTransactionEntryResource = () => {
  const firestore = useFirestore();

  return useCreateResource({
    name: 'transactions',
    schema: TransactionEtrySchema,
    firestore: firestore,
  });
};
