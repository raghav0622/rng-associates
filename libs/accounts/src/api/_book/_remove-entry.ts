import { AccountBook } from '../../schema';
import { ReCalcBookEntries } from './_recalc-entries';

export const RemoveEntryInBook = (
  book: AccountBook,
  transaction: string
): AccountBook => {
  const transactions = book?.transactions.length ? [...book.transactions] : [];

  const index = transactions.findIndex((val) => val.id === transaction);

  transactions.splice(index, 1);

  const updatedBook = ReCalcBookEntries({ ...book, transactions });

  return updatedBook;
};
