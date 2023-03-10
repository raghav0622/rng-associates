import { useCreateResource } from '@rng-associates/firesource';
import { useFirestore } from 'reactfire';
import { z } from 'zod';

export const EntitySchema = z
  .object({
    id: z.string(),
    name: z.string().min(1),
  })
  .strict();

export type Entity = z.infer<typeof EntitySchema>;

export const useEntity = () => {
  const firestore = useFirestore();

  return useCreateResource({
    name: 'entity',
    firestoreCollectionName: 'entity',
    schema: EntitySchema,
    firestore: firestore,
  });
};
