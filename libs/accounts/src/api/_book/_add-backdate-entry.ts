import dayjs from 'dayjs';
import { AccountBook, CreateTransaction, Transaction } from '../../schema';
import { cleanEmpty, fireDate } from '../../utils';
import { ReCalcBookEntries } from './_recalc-entries';

export const AddBackDateEntryInBook = (
  book: AccountBook,
  transaction: CreateTransaction
): AccountBook => {
  const transactions = book?.transactions || [];

  const IndexToInsert = transactions.filter((data) => {
    return dayjs(fireDate(data.date)).isBefore(transaction.date);
  }).length;

  const newTransaction = {
    ...transaction,
    order: 0,
    previousBalance: 0,
    nextBalance: 0,
  } as Transaction;

  const newTransactions = [...transactions];

  newTransactions.splice(IndexToInsert, 0, cleanEmpty(newTransaction));

  const updatedBook = ReCalcBookEntries({
    ...book,
    transactions: newTransactions,
  });

  return updatedBook;
};
