import { AccountBook, CreateTransaction, Transaction } from '../../schema';
import { cleanEmpty } from '../../utils';

export const AddEntryInBook = (
  book: AccountBook,
  transaction: CreateTransaction
): AccountBook => {
  const transactions = book?.transactions || [];
  const transactionCount = transactions?.length || 0;
  const previousBalance =
    transactionCount > 0 ? transactions[transactionCount - 1].nextBalance : 0;
  const nextBalance =
    transaction.type === 'CR'
      ? previousBalance + transaction.amount
      : previousBalance - transaction.amount;

  const newTransaction = {
    ...transaction,
    order: transactionCount + 1,
    previousBalance,
    nextBalance,
  } as Transaction;

  const newTransactions = [...transactions, cleanEmpty(newTransaction)];

  const deposits =
    transaction.type === 'CR'
      ? book.deposits + transaction.amount
      : book.deposits;

  const withdrawls =
    transaction.type === 'DR'
      ? book.withdrawls + transaction.amount
      : book.withdrawls;

  const updatedBook = {
    ...book,
    deposits,
    withdrawls,
    transactions: newTransactions,
  } as AccountBook;

  return updatedBook;
};
