import { useCreateResource } from '@rng-associates/firesource';
import { useFirestore } from 'reactfire';
import { z } from 'zod';

export const AccountSchema = z
  .object({
    id: z.string(),
    owner: z.string().min(1),
    // to implement
    // coOwner: z.array(z.string().min(1)).optional(),
    nickName: z.string().min(1),
    bankName: z.string().min(1),
    ifscCode: z.string().min(1),
    accountNumber: z.string().min(1),
    branchAddress: z
      .string()
      .min(1)
      .optional()
      .or(z.literal('').transform(() => undefined)),
    branchName: z
      .string()
      .min(1)
      .optional()
      .or(z.literal('').transform(() => undefined)),
    type: z.string().min(1),
  })
  .strict();

export type Account = z.infer<typeof AccountSchema>;

export const useAccount = () => {
  const firestore = useFirestore();

  return useCreateResource({
    name: 'account',
    firestoreCollectionName: 'account',
    schema: AccountSchema,
    firestore: firestore,
  });
};
