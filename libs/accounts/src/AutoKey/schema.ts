import { useCreateResource } from '@rng-associates/firesource';
import { useFirestore } from 'reactfire';
import { z } from 'zod';

export const AutoKeySchema = z
  .object({
    id: z.string(),
    name: z.string().min(1),
    value: z.string().min(1),
  })
  .strict();

export type AutoKey = z.infer<typeof AutoKeySchema>;

export const useAutoKey = () => {
  const firestore = useFirestore();

  return useCreateResource({
    name: 'autoKey',
    firestoreCollectionName: 'autocomplete-keyval',
    schema: AutoKeySchema,
    firestore: firestore,
  });
};
