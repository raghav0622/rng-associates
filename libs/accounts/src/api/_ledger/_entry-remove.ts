/* eslint-disable @typescript-eslint/no-unused-vars */
import { updateDoc } from 'firebase/firestore';
import { useLedgerResource } from '../../resource';
import { MergeBookData, RemoveEntryInBook } from '../_book';
import { useLedgerCtx } from './utils';

export const useRemoveEntryInLedger = () => {
  const { getRefByID } = useLedgerResource();
  const { getTransactionData } = useLedgerCtx();

  const mutate = async (ledger: string, transaction: string) => {
    const transactionData = getTransactionData(ledger);

    if (!transactionData) return;

    const { allBooks, currentBook } = transactionData;

    const updatedBook = RemoveEntryInBook(currentBook, transaction);
    const updatedBooks = MergeBookData(allBooks, updatedBook);

    await updateDoc(getRefByID(ledger), {
      books: updatedBooks,
    });
  };

  return { mutate };
};
