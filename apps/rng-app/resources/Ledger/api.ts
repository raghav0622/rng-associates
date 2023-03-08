/* eslint-disable @typescript-eslint/no-unused-vars */
import { APIError } from '@rng-associates/firesource';
import {
  addDoc,
  deleteDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { pickBy } from 'lodash';
import { useFirestoreCollectionData } from 'reactfire';
import { z } from 'zod';
import { useLedger } from './schema';

export const useLedgerAPI = () => {
  const {
    name,
    ref,
    refWithConverter,
    converter,
    getRefByID,
    schema,
    firestore,
    firestoreCollectionName,
  } = useLedger();

  const data = useLedgerData();

  const api = {
    async create(
      payload: Omit<z.infer<typeof schema>, 'id'>,
      validateOnly?: boolean
    ) {
      const sanitizedPayload = pickBy(payload, (i) => i !== undefined);
      if (name === undefined || name === 'undefined' || name.length === 0) {
        throw new APIError('Please provide valid name for Ledger!', 'name');
      }

      if (data.length > 0) {
        const isDuplicateName =
          data.filter(
            (existing) =>
              existing.name === name &&
              existing.owner === sanitizedPayload.owner
          ).length > 0;

        if (isDuplicateName) {
          throw new APIError('Please provide unique name for ledger!', 'name');
        }
      }

      /**Actual Creation of document */
      if (validateOnly === undefined || !validateOnly) {
        const { id: uid } = await addDoc(
          ref,
          sanitizedPayload as Omit<z.infer<typeof schema>, 'id'>
        );

        await updateDoc(getRefByID(uid), {
          id: uid,
        });

        return { id: uid, ...sanitizedPayload } as z.infer<typeof schema>;
      }
    },

    async removeByOwnerID(owner: string) {
      if (owner === undefined) {
        throw new APIError('Please provide valid ID for OWner!');
      }

      const doc = query(refWithConverter, where('owner', '==', owner));
      const data = await getDocs(doc);
      if (data.docs.length > 0) {
        await Promise.all(
          data.docs.map((d) => {
            return deleteDoc(getRefByID(d.id));
          })
        );
      }
    },

    async remove(id: string) {
      if (id === undefined) {
        throw new APIError('Please provide valid ID for ledger!', 'id');
      }

      const doc = getRefByID(id);

      deleteDoc(doc);
    },
  };

  return api;
};
export const useLedgerData = () => {
  const { ref, refWithConverter, schema } = useLedger();

  const { status, data } = useFirestoreCollectionData(ref, { suspense: true });

  return data as z.infer<typeof schema>[];
};

export const useLedgerDataByOwnerID = (owner: string) => {
  const { ref, refWithConverter, schema } = useLedger();

  const q = query(ref, orderBy('name', 'asc'), where('owner', '==', owner));
  const { status, data } = useFirestoreCollectionData(q, { suspense: true });

  return data as z.infer<typeof schema>[];
};

export const useLedgerDataByID = (id: string) => {
  const { ref, refWithConverter, schema } = useLedger();

  const q = query(ref, where('id', '==', id));
  const { status, data } = useFirestoreCollectionData(q, { suspense: true });

  return data[0] as z.infer<typeof schema>;
};

// export const useEntitySelectOptions = () => {
//   const data = useLedgerData();

//   return data.map((item) => {
//     return {
//       value: item.id,
//       label: item.name,
//     } as SelectItem;
//   });
// };
