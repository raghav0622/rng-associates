/* eslint-disable @typescript-eslint/no-unused-vars */
import { updateDoc } from 'firebase/firestore';
import { useCompanyCtx } from '../../context';
import { useAccountResource } from '../../resource';
import { MergeBookData, RemoveEntryInBook } from '../_book';
import { useAccountCtx } from './utils';

export const useRemoveEntryInAccount = () => {
  const { getRefByID } = useAccountResource();
  const { getTransactionData } = useAccountCtx();
  const { viewFY } = useCompanyCtx();

  const mutate = async (account: string, transaction: string) => {
    const transactionData = getTransactionData(account);

    if (!transactionData) return;

    const { allBooks, count, currentBook } = transactionData;

    const updatedBook = RemoveEntryInBook(currentBook, transaction);
    const updatedBooks = MergeBookData(allBooks, updatedBook);

    await updateDoc(getRefByID(account), {
      books: updatedBooks,
    });
  };

  return { mutate };
};
