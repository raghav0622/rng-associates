/* eslint-disable @typescript-eslint/no-unused-vars */
import { SelectItem } from '@mantine/core';
import { APIError } from '@rng-associates/firesource';
import {
  addDoc,
  arrayUnion,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useFirestoreCollectionData } from 'reactfire';
import { z } from 'zod';
import { firstoreTimestampToDate } from '..';
import { useCompanyCtx } from '../_Context';
import { Entity, FinancialYear, useEntity } from './schema';

export const useCreateEntityAPI = () => {
  const { ref, getRefByID, schema } = useEntity();

  const data = useEntityData();

  const mutate = async ({ name }: { name: string }) => {
    if (name === 'undefined') {
      throw new APIError('Please provide valid name for Company!', 'name');
    }

    if (data.length > 0) {
      const isDuplicateName =
        data.filter((existing) => existing.name === name).length > 0;

      if (isDuplicateName) {
        throw new APIError('Please provide unique name for Company!', 'name');
      }
    }

    const { id: uid } = await addDoc(ref, {
      name,
      fy: [],
    } as Omit<z.infer<typeof schema>, 'id'>);

    await updateDoc(getRefByID(uid), {
      id: uid,
    });

    return { id: uid, name, fy: [] } as Entity;
  };

  return { mutate };
};

export const useCreateFYinEntityAPI = () => {
  const {
    company: { id },
  } = useCompanyCtx();
  const { getRefByID: getCompanyRef } = useEntity();
  const mutate = async (payload: FinancialYear) => {
    await updateDoc(getCompanyRef(id), {
      fy: arrayUnion(payload),
    });
  };

  return { mutate };
};

export const useEntityData = () => {
  const { ref } = useEntity();

  const q = query(ref, orderBy('name', 'asc'));
  const { data } = useFirestoreCollectionData(q, { suspense: true });

  if (data.length === 0) {
    return [] as Entity[];
  }

  return data as Entity[];
};

export const useEntityDataById = (id: string) => {
  const { ref } = useEntity();

  const q = query(ref, where('id', '==', id));
  const { status, data } = useFirestoreCollectionData(q, { suspense: true });

  if (data.length === 0) {
    return undefined;
  }

  const result = data[0] as Entity;
  const newFy = result.fy.map((fy) => ({
    ...fy,
    start: firstoreTimestampToDate(fy.start),
    end: firstoreTimestampToDate(fy.end),
  }));

  return { ...result, fy: newFy } as Entity;
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
