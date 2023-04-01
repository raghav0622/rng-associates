/* eslint-disable @typescript-eslint/no-unused-vars */
import { SelectItem } from '@mantine/core';
import { query, where } from 'firebase/firestore';
import { useFirestoreCollectionData } from 'reactfire';
import { useCompanyCtx } from '../../context';
import { useAccountResource } from '../../resource';
import { Account, AccountBook, Transaction } from '../../schema';

export const useAccountCtx = () => {
  const { accounts, viewFY } = useCompanyCtx();

  const getTransactionData = (
    account: string
  ):
    | {
        data: Account;
        currentBook: AccountBook;
        allBooks: AccountBook[];
        lastTransaction: Transaction | undefined;
        firstTransaction: Transaction | undefined;
        transactions: Transaction[];
        count: number;
      }
    | undefined => {
    const accountData = accounts.find((val) => val.id === account);

    const currentBook = accountData?.books.find(
      (val) => val.id === viewFY.name
    );
    if (!accountData || !currentBook) {
      return undefined;
    }

    const count = currentBook.transactions.length;
    const lastTransaction =
      count > 0 ? currentBook.transactions[count - 1] : undefined;
    const firstTransaction = currentBook.transactions[0] || undefined;

    return {
      data: accountData,
      currentBook,
      allBooks: accountData.books,
      count,
      firstTransaction,
      lastTransaction,
      transactions: currentBook.transactions,
    };
  };
  return { getTransactionData };
};

export const useAccountOptions = () => {
  const { accounts } = useCompanyCtx();

  const options = accounts.map((acc) => {
    return {
      value: acc.id,
      label: acc.nickName,
      group: acc.type,
    } as SelectItem;
  });

  return options;
};

export const useAccountDataByCompany = (company: string) => {
  const { ref } = useAccountResource();
  const q = query(ref, where('company', '==', company));

  const { data } = useFirestoreCollectionData(q, { suspense: true });

  if (data.length === 0) {
    return [] as Account[];
  }

  return data as Account[];
};
