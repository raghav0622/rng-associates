/* eslint-disable @typescript-eslint/no-unused-vars */
import { SelectItem } from '@mantine/core';
import { addDoc, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { useFirestoreCollectionData } from 'reactfire';
import { useEntityCtx } from '../EntityCtx';
import { useAccount } from './_resource';
import { Account, CreateAccount } from './_schema';

export const useCreateAccountAPI = () => {
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

  const mutate = async (payload: CreateAccount) => {
    const { nickName, owner, type } = payload;
    // if (data.length > 0) {
    //   const isDuplicateName =
    //     data.filter((existing) => existing.name === name).length > 0;

    //   if (isDuplicateName) {
    //     throw new APIError('Please provide unique name for entity!', 'name');
    //   }
    // }

    const { id: uid } = await addDoc(refWithConverter, {
      ...payload,
      balance: 0,
      transactions: [],
      updatedAt: new Date(),
      id: '',
    });

    updateDoc(getRefByID(uid), {
      id: uid,
    });

    return { id: uid, ...payload } as Account;
  };
  return { mutate };
};

export const useAccountDataByOwner = (owner: string) => {
  const { ref, refWithConverter, schema } = useAccount();

  const q = query(ref, where('owner', '==', owner), orderBy('nickName', 'asc'));
  const { status, data } = useFirestoreCollectionData(q, { suspense: true });
  if (data.length === 0) {
    return [] as Account[];
  }

  return data.map((acc) => {
    return { ...acc, updatedAt: acc.updatedAt.toDate() };
  }) as Account[];
};

export const useAccountDataByID = (id: string) => {
  const { ref, refWithConverter, schema } = useAccount();

  const q = query(ref, where('id', '==', id));
  const { status, data } = useFirestoreCollectionData(q, { suspense: true });

  return data[0] as Account;
};

export const useAccountOptions = () => {
  const { accounts } = useEntityCtx();

  const options = accounts.map((acc) => {
    return {
      value: acc.id,
      label: acc.nickName,
      group: 'Accounts',
    } as SelectItem;
  });

  return options;
};
