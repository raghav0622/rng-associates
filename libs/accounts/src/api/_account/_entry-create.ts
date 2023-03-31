/* eslint-disable @typescript-eslint/no-unused-vars */
import dayjs from 'dayjs';
import { updateDoc } from 'firebase/firestore';
import { cleanEmpty, firstoreTimestampToDate } from '../../index';
import { useAccountResource } from '../../resource';
import { AccountBook, CreateTransaction, Transaction } from '../../schema';
import { useAccountCtx, useAccountUtils } from './utils';

export const useAddTransactionInAccountAPI = () => {
  const { getRefByID } = useAccountResource();
  const { reCalculateEntries } = useAccountUtils();
  const { getAccountByID } = useAccountCtx();

  const simpleEntry = ({
    type,
    account,
    amount,
    book,
    date,
    bankNarration,
    particular,
    id,
    linkType,
    linkRef,
  }: CreateTransaction) => {
    const allBooks = getAccountByID(account)?.books || [];
    const accountBook = allBooks.find((i) => i.id === book);

    if (!accountBook) {
      return;
    }

    const accountTransactions = accountBook?.transactions || [];
    const transactionCount = accountTransactions?.length || 0;
    const previousBalance =
      transactionCount > 0
        ? accountTransactions[transactionCount - 1].nextBalance
        : 0;
    const nextBalance =
      type === 'CR' ? previousBalance + amount : previousBalance - amount;
    const newTransaction = {
      account,
      amount,
      book,
      date,
      id,
      order: transactionCount + 1,
      type,
      bankNarration: bankNarration || '',
      particular: particular || '',
      previousBalance,
      nextBalance,

      linkType,
      linkBook: linkType !== 'no-link' ? book : undefined,
      linkRef: linkType !== 'no-link' ? linkRef : undefined,
    } as Transaction;

    const newTransactions = [
      ...accountTransactions,
      cleanEmpty(newTransaction),
    ];

    const updatedBook = {
      ...accountBook,
      deposits:
        type === 'CR' ? accountBook.deposits + amount : accountBook.deposits,
      withdrawls:
        type === 'DR'
          ? accountBook.withdrawls + amount
          : accountBook.withdrawls,
      transactions: newTransactions,
    } as AccountBook;

    const updatedBooks = [
      ...allBooks.filter((val) => val.id !== updatedBook.id),
    ];

    updatedBooks.push(updatedBook);

    return updatedBooks;
  };

  const backDateEntry = ({
    type,
    account,
    amount,
    book,
    date,
    bankNarration,
    particular,
    linkType,
    linkRef,
  }: CreateTransaction) => {
    const allBooks = getAccountByID(account)?.books || [];
    const accountBook = allBooks.find((i) => i.id === book);

    if (!accountBook) {
      return;
    }

    const accountTransactions = accountBook?.transactions || [];

    const IndexToInsert = accountTransactions.filter((data) => {
      return dayjs(firstoreTimestampToDate(data.date)).isBefore(date);
    }).length;

    const newTransaction = {
      account,
      amount,
      book,
      date,
      order: 0,
      type,
      bankNarration: bankNarration || '',
      particular: particular || '',
      previousBalance: 0,
      nextBalance: 0,

      linkType,
      linkBook: linkType !== 'no-link' ? book : undefined,
      linkRef: linkType !== 'no-link' ? linkRef : undefined,
    } as Transaction;
    const newTransactions = [...accountTransactions];

    newTransactions.splice(IndexToInsert, 0, cleanEmpty(newTransaction));

    const updatedBookData = reCalculateEntries(newTransactions);
    const updatedBook = {
      ...accountBook,
      ...updatedBookData,
    } as AccountBook;

    const updatedBooks = [
      ...allBooks.filter((val) => val.id !== updatedBook.id),
    ];

    updatedBooks.push(updatedBook);

    return updatedBooks;
  };

  const mutate = async (payload: CreateTransaction) => {
    const allBooks = getAccountByID(payload.account)?.books || [];
    const accountBook = allBooks.find((i) => i.id === payload.book);

    if (!accountBook) {
      return;
    }

    const accountTransactions = accountBook?.transactions || [];

    const transactionCount = accountTransactions?.length || 0;
    const lastTransaction =
      transactionCount > 0
        ? accountTransactions[transactionCount - 1]
        : undefined;

    const isNewDateOlderThanLastTransaction = lastTransaction
      ? dayjs(payload.date).isBefore(
          firstoreTimestampToDate(lastTransaction.date)
        )
      : false;

    const books = isNewDateOlderThanLastTransaction
      ? backDateEntry(payload)
      : simpleEntry(payload);

    await updateDoc(getRefByID(payload.account), {
      books,
    });
  };

  return { mutate };
};
