/* eslint-disable @typescript-eslint/no-unused-vars */
import { SelectItem } from '@mantine/core';
import { APIError } from '@rng-associates/firesource';
import { addDoc, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { useFirestoreCollectionData } from 'reactfire';
import { useCompanyCtx } from '../_Context';
import { useLedger } from './_resource';
import { CreateLedger, Ledger } from './_schema';

export const useCreateLedgerAPI = () => {
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
  const { ledgers } = useCompanyCtx();
  const mutate = async (payload: CreateLedger) => {
    const { name, company, category } = payload;
    if (ledgers.length > 0) {
      const isDuplicateName =
        ledgers.filter((existing) => existing.name === name).length > 0;

      if (isDuplicateName) {
        throw new APIError('Please provide unique name for Ledger!', 'name');
      }
    }

    const { id: uid } = await addDoc(refWithConverter, {
      ...payload,
      type: 'ledger',
      balance: 0,
      transactions: [],
      updatedAt: new Date(),
      id: '',
    });

    updateDoc(getRefByID(uid), {
      id: uid,
    });

    return { id: uid, ...payload } as Ledger;
  };
  return { mutate };
};

export const useLedgerDataByCompany = (company: string) => {
  const { ref } = useLedger();

  const q = query(ref, where('company', '==', company), orderBy('name', 'asc'));

  const { data } = useFirestoreCollectionData(q, { suspense: true });
  if (data.length === 0) {
    return [] as Ledger[];
  }

  return data.map((acc) => {
    return { ...acc, updatedAt: acc.updatedAt.toDate() };
  }) as Ledger[];
};

export const useLedgerDataByID = () => {
  const { ledgers } = useCompanyCtx();
  const getData = (id: string) => {
    const accDetails = ledgers.find((e) => e.id === id);
    if (accDetails === undefined) {
      throw new Error('bai bai');
    }
    return accDetails;
  };

  return { getData };
};

export const useLedgerOptions = () => {
  const { ledgers } = useCompanyCtx();

  const options = ledgers.map((acc) => {
    return {
      value: acc.id,
      label: acc.name,
      group: 'Ledgers',
    } as SelectItem;
  });

  return options;
};
