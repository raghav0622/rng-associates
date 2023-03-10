/* eslint-disable @typescript-eslint/no-unused-vars */
import { addDoc, getDoc, updateDoc } from 'firebase/firestore';
import { pickBy } from 'lodash';
import { useLedger, useLedgerAPI } from '../Ledger';
import { CreateTransaction, Transaction, useTransaction } from './schema';

export const useTransactionAPI = () => {
  const { getRefByID: getLedgerRef } = useLedger();
  const { ref, getRefByID } = useTransaction();
  const { addLedgerTransaction } = useLedgerAPI();

  const api = {
    async create(payload: CreateTransaction) {
      const primaryLedgerData = (
        await getDoc(getLedgerRef(payload.primaryLedger))
      ).data();

      const primaryPrevBalance: number = primaryLedgerData?.balance || 0;
      const primaryNextBalance: number =
        payload.type === 'CR'
          ? primaryPrevBalance + payload.amount
          : primaryPrevBalance - payload.amount;

      const newTransaction = pickBy(
        {
          ...payload,

          primaryNextBalance: primaryNextBalance,
          primaryPrevBalance: primaryPrevBalance,
          primaryOrder: (primaryLedgerData?.transactions.length || 0) + 1,
        },
        (i) => i !== undefined
      ) as Omit<Transaction, 'id'>;

      const { id: uid } = await addDoc(ref, newTransaction);

      await updateDoc(getRefByID(uid), {
        id: uid,
      });

      const result = { id: uid, ...newTransaction } as Transaction;

      await addLedgerTransaction(result);

      return result;
    },
  };

  return api;
};
