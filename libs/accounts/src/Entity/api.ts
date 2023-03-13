/* eslint-disable @typescript-eslint/no-unused-vars */
import { SelectItem } from '@mantine/core';
import { APIError } from '@rng-associates/firesource';
import {
  addDoc,
  deleteDoc,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useFirestoreCollectionData } from 'reactfire';
import { z } from 'zod';
import { useLedgerAPI } from '../_Ledger';
import { useEntity } from './schema';

export const useEntityAPI = () => {
  const {
    name,
    ref,
    refWithConverter,
    converter,
    getRefByID,
    schema,
    firestore,
    firestoreCollectionName,
  } = useEntity();
  const data = useEntityData();
  const { create: createLedger, removeByOwnerID: removeLedgerByOwnerID } =
    useLedgerAPI();
  const api = {
    async create(
      { name }: Omit<z.infer<typeof schema>, 'id'>,
      validateOnly?: boolean
    ) {
      if (name === undefined || name === 'undefined' || name.length === 0) {
        throw new APIError('Please provide valid name for entity!', 'name');
      }

      if (data.length > 0) {
        const isDuplicateName =
          data.filter((existing) => existing.name === name).length > 0;

        if (isDuplicateName) {
          throw new APIError('Please provide unique name for entity!', 'name');
        }
      }

      /**Actual Creation of document */
      if (validateOnly === undefined || !validateOnly) {
        const { id: uid } = await addDoc(ref, { name } as Omit<
          z.infer<typeof schema>,
          'id'
        >);

        await Promise.all([
          updateDoc(getRefByID(uid), {
            id: uid,
          }),
          createLedger({
            category: 'Cash',
            name: 'Cash in Hand',
            owner: uid,
          }),
        ]);

        return { id: uid, name } as z.infer<typeof schema>;
      }
    },

    async remove(id: string) {
      if (id === undefined) {
        throw new APIError('Please provide valid ID for entity!', 'id');
      }

      const doc = getRefByID(id);
      await removeLedgerByOwnerID(id);
      await deleteDoc(doc);
    },
  };

  return api;
};
export const useEntityData = () => {
  const { ref, refWithConverter, schema } = useEntity();

  const q = query(ref, orderBy('name', 'asc'));
  const { status, data } = useFirestoreCollectionData(q, { suspense: true });

  return data as z.infer<typeof schema>[];
};

export const useEntityDataById = (id: string) => {
  const { ref, refWithConverter, schema } = useEntity();

  const q = query(ref, where('id', '==', id || ''));
  const { status, data } = useFirestoreCollectionData(q, { suspense: true });

  return data[0] as z.infer<typeof schema>;
};

export const useEntitySelectOptions = () => {
  const data = useEntityData();

  return data.map((item) => {
    return {
      value: item.id,
      label: item.name,
    } as SelectItem;
  });
};
