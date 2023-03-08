import { useCreateResource } from '@rng-associates/firesource';
import { useFirestore } from 'reactfire';
import { z } from 'zod';

export const LedgerType = ['Cash', 'Bank Account', 'General'] as const;

export const LedgerCategories = [
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
    account: z
      .string()
      .min(1)
      .optional()
      .or(z.literal('').transform(() => undefined)),
    name: z.string().min(1),
    type: z.enum(LedgerType),
    category: z.enum(LedgerCategories),
    balance: z.number(),
  })
  .strict();

export type Ledger = z.infer<typeof LedgerSchema>;

export const useLedger = () => {
  const firestore = useFirestore();

  return useCreateResource({
    name: 'ledger',
    firestoreCollectionName: 'ledger',
    schema: LedgerSchema,
    firestore: firestore,
  });
};
