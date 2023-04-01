/* eslint-disable @typescript-eslint/no-unused-vars */
import dayjs from 'dayjs';
import { updateDoc } from 'firebase/firestore';
import { fireDate, useAccountCtx, useLedgerCtx } from '../../index';
import { useAccountResource, useLedgerResource } from '../../resource';
import { CreateTransaction } from '../../schema';
import {
  AddBackDateEntryInBook,
  AddEntryInBook,
  MergeBookData,
} from '../_book';

export type AddEntryOpt = 'Account' | 'Ledger';

export const useAddEntry = (entryIn: AddEntryOpt) => {
  const { getRefByID: getAccountRef } = useAccountResource();
  const { getTransactionData: getAccTransactionData } = useAccountCtx();
  const { getRefByID: getLedgerRef } = useLedgerResource();
  const { getTransactionData: getLedgerTransactionData } = useLedgerCtx();

  const getRefByID = entryIn === 'Account' ? getAccountRef : getLedgerRef;
  const getTransactionData =
    entryIn === 'Account' ? getAccTransactionData : getLedgerTransactionData;

  const mutate = async (payload: CreateTransaction) => {
    const ref =
      (entryIn === 'Account' ? payload.account : payload.linkRef) || undefined;

    if (ref) {
      const transactionData = getTransactionData(ref);

      if (!transactionData) return;

      const { allBooks, currentBook, lastTransaction } = transactionData;

      const isNewDateOlderThanLastTransaction = lastTransaction
        ? dayjs(payload.date).isBefore(fireDate(lastTransaction.date))
        : false;

      const updatedBook = isNewDateOlderThanLastTransaction
        ? AddBackDateEntryInBook(currentBook, payload)
        : AddEntryInBook(currentBook, payload);

      const books = MergeBookData(allBooks, updatedBook);

      console.log(books);
      await updateDoc(getRefByID(ref), {
        books,
      });
    }
    return;
  };

  return { mutate };
};
