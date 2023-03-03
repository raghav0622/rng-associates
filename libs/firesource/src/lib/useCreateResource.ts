import { collection, doc, QueryDocumentSnapshot } from 'firebase/firestore';
import { useFirestore } from 'reactfire';
import { z } from 'zod';
import { Resource } from './types';

export function useCreateResource<Schema extends z.ZodType<any, any>>({
  name,
  schema,
  firestoreCollectionName,
}: Omit<Resource<Schema>, 'fn'>) {
  const firestore = useFirestore();

  if (!firestore) {
    throw new Error('Initialize firestore properly.');
  }

  const converter = {
    toFirestore: (data: z.infer<Schema>) => data,
    fromFirestore: (snap: QueryDocumentSnapshot<z.infer<Schema>>) =>
      snap.data(),
  };

  const ref = collection(firestore, firestoreCollectionName);
  const refWithConverter = collection(
    firestore,
    firestoreCollectionName
  ).withConverter(converter);

  const getRefByID = (id: string) => doc(refWithConverter, id);

  function createFunctions(
    args: Record<string, (args: z.infer<Schema>) => Promise<unknown>>
  ) {
    return args;
  }

  return {
    name,
    schema,
    firestoreCollectionName,
    converter,
    ref,
    refWithConverter,
    getRefByID,
    firestore,
    createFunctions,
  };
}
