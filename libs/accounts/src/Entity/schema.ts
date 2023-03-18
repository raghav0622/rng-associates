import { useCreateResource } from '@rng-associates/firesource';
import { useFirestore } from 'reactfire';
import { z } from 'zod';

export const fy = z.object({
  name: z.string().min(1),
  start: z.date(),
  end: z.date(),
});

export const EntitySchema = z
  .object({
    id: z.string(),
    name: z.string().min(1),
    fy: z.array(fy),
  })
  .strict();

export type Entity = z.infer<typeof EntitySchema>;

export type FinancialYear = z.infer<typeof fy>;

export const useEntity = () => {
  const firestore = useFirestore();

  return useCreateResource({
    name: 'entity',
    firestoreCollectionName: 'entity',
    schema: EntitySchema,
    firestore: firestore,
  });
};
