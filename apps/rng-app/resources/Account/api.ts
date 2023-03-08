/* eslint-disable @typescript-eslint/no-unused-vars */
import { APIError } from '@rng-associates/firesource';
import { addDoc, deleteDoc, query, updateDoc, where } from 'firebase/firestore';
import { pickBy } from 'lodash';
import { useFirestoreCollectionData } from 'reactfire';
import { z } from 'zod';
import { useAccount } from './schema';

export const useAccountAPI = () => {
  const {
    name,
    ref,
    refWithConverter,
    converter,
    getRefByID,
    schema,
    firestore,
    firestoreCollectionName,
  } = useAccount();
  // const data = useAccountData();

  const api = {
    async update(id: string, payload: Omit<z.infer<typeof schema>, 'id'>) {
      const sanitizedPayload = pickBy(payload, (i) => i !== undefined);

      await updateDoc(getRefByID(id), {
        ...sanitizedPayload,
      });
    },
    async create(
      payload: Omit<z.infer<typeof schema>, 'id'>,
      validateOnly?: boolean
    ) {
      const sanitizedPayload = pickBy(payload, (i) => i !== undefined);
      // if (name === undefined || name === 'undefined' || name.length === 0) {
      //   throw new APIError('Please provide valid name for entity!', 'name');
      // }

      // if (data.length > 0) {
      //   const isDuplicateName =
      //     data.filter((existing) => existing.name === name).length > 0;

      //   if (isDuplicateName) {
      //     throw new APIError('Please provide unique name for entity!', 'name');
      //   }
      // }

      /**Actual Creation of document */
      if (validateOnly === undefined || !validateOnly) {
        const { id: uid } = await addDoc(
          ref,
          sanitizedPayload as Omit<z.infer<typeof schema>, 'id'>
        );

        await updateDoc(getRefByID(uid), {
          id: uid,
        });

        return { ...sanitizedPayload, id: uid } as z.infer<typeof schema>;
      }
    },

    async remove(id: string) {
      if (id === undefined) {
        throw new APIError('Please provide valid ID for account!', 'id');
      }

      const doc = getRefByID(id);

      deleteDoc(doc);
    },
  };

  return api;
};

export const useAccountData = () => {
  const { ref, refWithConverter, schema } = useAccount();

  const q = query(ref);
  const { status, data } = useFirestoreCollectionData(q, { suspense: true });

  return data as z.infer<typeof schema>[];
};

export const useAccountByOwnerID = (ownerId: string) => {
  const { ref, refWithConverter, schema } = useAccount();

  const q = query(ref, where('owner', '==', ownerId));
  const { status, data } = useFirestoreCollectionData(q, { suspense: true });

  return data as z.infer<typeof schema>[];
};

export const useAccountByID = (id: string) => {
  const { ref, refWithConverter, schema } = useAccount();

  const q = query(ref, where('id', '==', id));
  const { status, data } = useFirestoreCollectionData(q, { suspense: true });

  return data[0] as z.infer<typeof schema>;
};
