import { useFirestore } from 'reactfire';
import {
  AccountSchema,
  AutoKeySchema,
  CompanySchema,
  TransactionEtrySchema,
} from '../schema';
import { useCreateResource } from '../useCreateResource';

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

export const useLedgerResource = () => {
  const firestore = useFirestore();

  return useCreateResource({
    name: 'ledger',
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

export const useAutoKeyResource = () => {
  const firestore = useFirestore();

  return useCreateResource({
    name: 'autoKey',
    schema: AutoKeySchema,
    firestore: firestore,
  });
};
