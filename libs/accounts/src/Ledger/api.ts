/* eslint-disable @typescript-eslint/no-unused-vars */
import { SelectItem } from '@mantine/core';
import { APIError } from '@rng-associates/firesource';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  deleteDoc,
  getDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useFirestoreCollectionData } from 'reactfire';
import { z } from 'zod';
import { Entity, useEntity } from '../Entity';
import { Transaction } from '../Transaction';
import { CreateLedger, Ledger, useLedger } from './schema';

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
    async create(payload: CreateLedger, validateOnly?: boolean) {
      if (data.length > 0) {
        const isDuplicateName =
          data.filter(
            (existing) =>
              existing.name === name && existing.owner === payload.owner
          ).length > 0;

        if (isDuplicateName) {
          throw new APIError('Please provide unique name for ledger!', 'name');
        }
      }

      /**Actual Creation of document */
      if (validateOnly === undefined || !validateOnly) {
        const data = {
          balance: 0,
          transactions: [],
          updatedAt: new Date(),
          ...payload,
        } as Omit<Ledger, 'id'>;

        const { id: uid } = await addDoc(ref, data);

        await updateDoc(getRefByID(uid), {
          id: uid,
        });

        return { id: uid, ...data } as Ledger;
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

    async addLedgerTransaction(payload: Transaction) {
      const doc = getRefByID(payload.primaryLedger);

      await updateDoc(doc, {
        balance: payload.primaryNextBalance,
        updatedAt: new Date(),
        transactions: arrayUnion(payload),
      });
    },

    async removeLedgerTransaction(payload: Transaction) {
      const doc = getRefByID(payload.primaryLedger);
      const currentDoc = (await getDoc(doc)).data();
      const currentBalance = currentDoc?.balance || 0;

      const NewLedgerBalance =
        payload.type === 'CR'
          ? currentBalance - payload.amount
          : currentBalance + payload.amount;

      const transactionsToRemove = currentDoc?.transactions.filter((t) => {
        if (t.primaryOrder >= payload.primaryOrder) {
          return true;
        }
        return false;
      });

      const transactionsToUpdate = currentDoc?.transactions.filter((t) => {
        if (t.primaryOrder > payload.primaryOrder) {
          return true;
        }
        return false;
      });

      const transactionsToAdd = transactionsToUpdate?.map((p, i) => {
        if (i === 0) {
          const newPrevBal = payload.primaryPrevBalance;
          return {
            ...p,
            primaryOrder: p.primaryOrder - 1,
            primaryPrevBalance: newPrevBal,
            primaryNextBalance:
              p.type === 'CR' ? newPrevBal + p.amount : newPrevBal - p.amount,
          };
        }
        const newPrevBal =
          payload.type === 'CR'
            ? p.primaryPrevBalance - payload.amount
            : p.primaryPrevBalance + payload.amount;
        return {
          ...p,
          primaryOrder: p.primaryOrder - 1,
          primaryPrevBalance: newPrevBal,
          primaryNextBalance:
            p.type === 'CR' ? newPrevBal + p.amount : newPrevBal - p.amount,
        };
      });

      console.log(transactionsToAdd);
      if (transactionsToRemove !== undefined) {
        await updateDoc(doc, {
          balance: NewLedgerBalance,
          updatedAt: new Date(),
          transactions: arrayRemove(...transactionsToRemove),
        });
      }
      if (transactionsToAdd !== undefined) {
        await updateDoc(doc, {
          updatedAt: new Date(),
          transactions: arrayUnion(...transactionsToAdd),
        });
      }
    },
  };

  return api;
};
export const useLedgerData = () => {
  const { ref, refWithConverter, schema } = useLedger();

  const { status, data } = useFirestoreCollectionData(ref, { suspense: true });

  return data as z.infer<typeof schema>[];
};

export const useLedgerDataWithOwnerName = () => {
  const base = useLedgerData();
  const { ref, refWithConverter, schema, getRefByID } = useEntity();
  const data: SelectItem[] = [];

  Promise.all(
    base.map(async (ledger) => {
      const ownerData = (
        await getDocs(query(ref, where('id', '==', ledger.owner)))
      ).docs[0].data() as Entity;

      return {
        label: `${ledger.name} (${ownerData.name})`,
        value: ledger.id,
      } as SelectItem;
    })
  ).then((result) => {
    data.push(...result);
  });

  return data;
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

  const transactionsRec = (data[0] as Ledger).transactions;

  const newTransactions = transactionsRec.map((t) => {
    return {
      ...t,
      //@ts-expect-error firebase timestamp to date
      date: (t.date as Timestamp).toDate(),
    };
  });

  return { ...data[0], transactions: newTransactions } as Ledger;
};
