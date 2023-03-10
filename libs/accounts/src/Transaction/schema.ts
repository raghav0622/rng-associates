import { useCreateResource } from '@rng-associates/firesource';
import dayjs from 'dayjs';
import { useFirestore } from 'reactfire';
import { z } from 'zod';
export const TransactionSchema = z
  .object({
    id: z.string(),
    date: z.string().transform((string) => dayjs(string).toDate()),
    amount: z
      .number()
      .refine(
        (val) => val !== 0 || val > 0,
        'Please enter valid positive integer'
      ),
    type: z.enum(['CR', 'DR']),

    primaryLedger: z.string().min(1),
    primaryOrder: z
      .number()
      .refine(
        (val) => val !== 0 || val > 0,
        'Please enter valid positive integer'
      ),
    primaryPrevBalance: z.number(),
    primaryNextBalance: z.number(),

    // secondaryLedger: z
    //   .string()
    //   .min(1)
    //   .optional()
    //   .or(z.literal('').transform((t) => undefined))
    //   .or(z.literal(null).transform((t) => undefined)),
    // secondaryPrevBalance: z.number().optional(),
    // secondaryNextBalance: z.number().optional(),

    particular: z
      .string()
      .min(1)
      .optional()
      .or(z.literal('').transform((t) => undefined)),

    narration: z
      .string()
      .min(1)
      .optional()
      .or(z.literal('').transform((t) => undefined)),
  })
  .strict();

export type Transaction = z.infer<typeof TransactionSchema>;

export const CreateTransactionSchema = TransactionSchema.omit({
  id: true,
  primaryOrder: true,

  primaryNextBalance: true,
  primaryPrevBalance: true,
  // secondaryPrevBalance: true,
  // secondaryNextBalance: true,
});

export type CreateTransaction = z.infer<typeof CreateTransactionSchema>;

export const useTransaction = () => {
  const firestore = useFirestore();

  return useCreateResource({
    name: 'transaction',
    firestoreCollectionName: 'transaction',
    schema: TransactionSchema,
    firestore: firestore,
  });
};
