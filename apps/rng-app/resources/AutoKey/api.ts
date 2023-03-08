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
import { groupBy, sortBy } from 'lodash';
import { useFirestoreCollectionData } from 'reactfire';
import { z } from 'zod';
import { useAutoKey } from './schema';

export const useAutoKeyAPI = () => {
  const {
    name,
    ref,
    refWithConverter,
    converter,
    getRefByID,
    schema,
    firestore,
    firestoreCollectionName,
  } = useAutoKey();

  const api = {
    async create(
      { name, value }: Omit<z.infer<typeof schema>, 'id'>,
      validateOnly?: boolean
    ) {
      if (name === undefined || name === 'undefined' || name.length === 0) {
        throw new APIError(
          'Please provide valid name for autocomplete key!',
          'name'
        );
      }
      if (value === undefined || value === 'undefined' || value.length === 0) {
        throw new APIError(
          'Please provide valid value for autocomplete key!',
          'value'
        );
      }

      /**Actual Creation of document */
      if (validateOnly === undefined || !validateOnly) {
        const { id: uid } = await addDoc(ref, { name, value } as Omit<
          z.infer<typeof schema>,
          'id'
        >);

        await updateDoc(getRefByID(uid), {
          id: uid,
        });

        return { id: uid, name, value } as z.infer<typeof schema>;
      }
    },

    async remove(id: string) {
      if (id === undefined) {
        throw new APIError('Please provide valid ID for auto-key!', 'id');
      }

      const doc = getRefByID(id);

      deleteDoc(doc);
    },
  };

  return api;
};

export const useAutoKeyDataGrouped = () => {
  const { ref, refWithConverter, schema } = useAutoKey();

  const q = query(ref, orderBy('name', 'asc'));
  const { status, data } = useFirestoreCollectionData(q, { suspense: true });
  const groupedData = groupBy(data as z.infer<typeof schema>[], 'name');

  return groupedData;
};

export const useAutoKeyDataByName = (name: string) => {
  const { ref, refWithConverter, schema } = useAutoKey();

  const q = query(ref, where('name', '==', name));
  const { status, data } = useFirestoreCollectionData(q, { suspense: true });

  return sortBy(data as z.infer<typeof schema>[], 'value');
};

export const useAutoKeySelectOption = (name: string) => {
  const data = useAutoKeyDataByName(name);

  return data.map((item) => {
    return {
      value: item.value,
      label: item.value,
    } as SelectItem;
  });
};
