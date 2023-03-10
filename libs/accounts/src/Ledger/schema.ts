import { useCreateResource } from '@rng-associates/firesource';
import { useFirestore } from 'reactfire';
import { z } from 'zod';
import { TransactionSchema } from '../Transaction';

export const LedgerCategories = [
  'Fixed Deposit',
  'General',
  'Capital Account',
  'Expenses (Direct)',
  'Expenses (Indirect)',
  'Income (Direct)',
  'Income (Indirect)',
  'Interest (+)',
  'Interest (-)',
  'Bank Account',
  'Duties & taxes',
  'Cash',
  'Withdrawls',
] as const;

export const LedgerSchema = z
  .object({
    id: z.string().min(1),
    owner: z.string().min(1),
    name: z.string().min(1),
    category: z.enum(LedgerCategories),
    balance: z.number(),
    updatedAt: z.date(),
    transactions: z.array(TransactionSchema),
  })
  .strict();

export type Ledger = z.infer<typeof LedgerSchema>;

export const CreateLedgerSchema = LedgerSchema.omit({
  id: true,
  balance: true,
  updatedAt: true,
  transactions: true,
});

export type CreateLedger = z.infer<typeof CreateLedgerSchema>;

export const useLedger = () => {
  const firestore = useFirestore();

  return useCreateResource({
    name: 'ledger',
    firestoreCollectionName: 'ledger',
    schema: LedgerSchema,
    firestore: firestore,
  });
};
