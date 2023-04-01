/* eslint-disable @typescript-eslint/no-unused-vars */
import { SelectItem } from '@mantine/core';
import { query, where } from 'firebase/firestore';
import { useFirestoreCollectionData } from 'reactfire';
import { useCompanyCtx } from '../../context';
import { useLedgerResource } from '../../resource';
import { AccountBook, Ledger, Transaction } from '../../schema';

export const useLedgerCtx = () => {
  const { ledgers, viewFY } = useCompanyCtx();

  const getTransactionData = (
    ledger: string
  ):
    | {
        data: Ledger;
        currentBook: AccountBook;
        allBooks: AccountBook[];
        lastTransaction: Transaction | undefined;
        firstTransaction: Transaction | undefined;
        transactions: Transaction[];
        count: number;
      }
    | undefined => {
    const ledgerData = ledgers.find((val) => val.id === ledger);

    const currentBook = ledgerData?.books.find((val) => val.id === viewFY.name);

    if (!ledgerData || !currentBook) {
      return undefined;
    }

    const count = currentBook.transactions.length;
    const lastTransaction =
      count > 0 ? currentBook.transactions[count - 1] : undefined;
    const firstTransaction = currentBook.transactions[0] || undefined;

    return {
      data: ledgerData,
      currentBook,
      allBooks: ledgerData.books,
      count,
      firstTransaction,
      lastTransaction,
      transactions: currentBook.transactions,
    };
  };
  return { getTransactionData };
};

export const useLedgerOptions = () => {
  const { ledgers } = useCompanyCtx();

  const options = ledgers.map((ledger) => {
    return {
      value: ledger.id,
      label: ledger.name,
      group: 'Ledgers',
    } as SelectItem;
  });

  return options;
};

export const useLedgerDataByCompany = (company: string) => {
  const { ref } = useLedgerResource();
  const q = query(ref, where('company', '==', company));

  const { data } = useFirestoreCollectionData(q, { suspense: true });

  if (data.length === 0) {
    return [] as Ledger[];
  }

  return data as Ledger[];
};
