/* eslint-disable @typescript-eslint/no-unused-vars */
import { SelectItem } from '@mantine/core';
import { query, where } from 'firebase/firestore';
import { useFirestoreCollectionData } from 'reactfire';
import { useCompanyCtx } from '../../context';
import { useAccountResource } from '../../resource';
import { Account, AccountBook, Transaction } from '../../schema';

export const useAccountCtx = () => {
  const { accounts, viewFY } = useCompanyCtx();

  const getAccountByID = (id: string) => {
    return accounts.find((val) => val.id === id);
  };

  const getCurrentBook = (account: string) => {
    const book = getAccountByID(account)?.books.find(
      (val) => val.id === viewFY.name
    );
    return book;
  };

  return { getAccountByID, getCurrentBook };
};

export const useAccountUtils = () => {
  // const transposeTransactionLink = (payload: TransactionLink) => {
  //   return {
  //     ...payload,
  //     link: payload.ref,
  //     narration: '',
  //     ref: payload.link,
  //     type: payload.type === 'CR' ? 'DR' : 'CR',
  //   } as TransactionLink;
  // };

  const reCalculateEntries = (
    trans: Transaction[]
  ): Pick<AccountBook, 'deposits' | 'withdrawls' | 'transactions'> => {
    const transactions: Transaction[] = [];
    const deposits = 0;
    const withdrawls = 0;

    trans.forEach((entry, index) => {
      const previousEntry = transactions[index - 1];
      const previousBalance = index === 0 ? 0 : previousEntry?.nextBalance;
      const nextBalance =
        entry.type === 'CR'
          ? previousBalance + entry.amount
          : previousBalance - entry.amount;
      const order = index + 1;

      const t = {
        ...entry,
        nextBalance,
        previousBalance,
        order,
      } as Transaction;

      return transactions.push(t);
    });

    return {
      transactions,
      deposits,
      withdrawls,
    };
  };

  return {
    // transposeTransactionLink,
    reCalculateEntries,
  };
};

export const useAccountOptions = () => {
  const { accounts } = useCompanyCtx();

  const options = accounts.map((acc) => {
    return {
      value: acc.id,
      label: acc.nickName,
      group: 'Accounts',
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
