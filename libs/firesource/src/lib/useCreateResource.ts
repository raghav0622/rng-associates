import {
  collection,
  doc,
  Firestore,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { z } from 'zod';
import { Resource } from './types';

export type createResourceProp<Schema extends z.ZodType<any, any>> = Omit<
  Resource<Schema>,
  'fn'
> & {
  firestore: Firestore;
};
export function useCreateResource<Schema extends z.ZodType<any, any>>({
  name,
  schema,
  firestoreCollectionName,
  firestore,
}: createResourceProp<Schema>) {
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

  return {
    name,
    schema,
    firestoreCollectionName,
    converter,
    ref,
    refWithConverter,
    getRefByID,
    firestore,
  };
}
