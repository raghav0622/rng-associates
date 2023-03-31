/* eslint-disable @typescript-eslint/no-unused-vars */
import { updateDoc } from 'firebase/firestore';
import { useCompanyCtx } from '../../context';
import { useAccountResource } from '../../resource';
import { AccountBook } from '../../schema';
import { useAccountCtx, useAccountUtils } from './utils';

export const useRemoveTransactionInAccountAPI = () => {
  const { getRefByID } = useAccountResource();
  const { reCalculateEntries } = useAccountUtils();
  const { getAccountByID } = useAccountCtx();
  const { viewFY } = useCompanyCtx();

  const mutate = async (account: string, transaction: string) => {
    const allBooks = getAccountByID(account)?.books || [];
    const accountBook = allBooks.find((i) => i.id === viewFY.name);

    if (!accountBook) {
      return;
    }

    const accountTransactions = accountBook?.transactions.length
      ? [...accountBook.transactions]
      : [];

    const index = accountTransactions.findIndex(
      (val) => val.id === transaction
    );

    accountTransactions.splice(index, 1);

    const updatedBookData = reCalculateEntries(accountTransactions);
    const updatedBook = {
      ...accountBook,
      ...updatedBookData,
    } as AccountBook;

    const updatedBooks = [
      ...allBooks.filter((val) => val.id !== updatedBook.id),
    ];

    updatedBooks.push(updatedBook);

    await updateDoc(getRefByID(account), {
      books: updatedBooks,
    });
  };

  return { mutate };
};
