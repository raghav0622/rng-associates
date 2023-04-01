import { AccountBook } from '../../schema';

export const MergeBookData = (
  books: AccountBook[],
  book: AccountBook
): AccountBook[] => {
  const data = [...books.filter((b) => b.id !== book.id), book];

  return data;
};
