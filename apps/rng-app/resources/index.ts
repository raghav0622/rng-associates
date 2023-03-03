/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCreateResource } from '@rng-associates/firesource';
import { addDoc, updateDoc } from 'firebase/firestore';
import { z } from 'zod';

export const BankSchema = z
  .object({
    id: z.string(),
    name: z.string(),
  })
  .strict();

export type Bank = z.infer<typeof BankSchema>;

export const useBankResource = () =>
  useCreateResource({
    name: 'Bank',
    firestoreCollectionName: 'bank',
    schema: BankSchema,
  });

export const useBankAPI = () => {
  const {
    name,
    ref,
    refWithConverter,
    converter,
    getRefByID,
    schema,
    firestore,
    firestoreCollectionName,
    createFunctions,
  } = useBankResource();

  const fns = createFunctions({
    create: async ({ id, name }) => {
      if (name === undefined || name.length === 0) {
        throw new Error('Please define proper name for add document "Bank"');
      }

      const { id: uid } = await addDoc(refWithConverter, {
        name: name,
      });

      await updateDoc(getRefByID(uid), {
        id: uid,
      });
    },
  });

  return fns;
};
