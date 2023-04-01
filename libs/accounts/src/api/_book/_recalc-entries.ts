import { AccountBook, Transaction } from '../../schema';

export const ReCalcBookEntries = (book: AccountBook): AccountBook => {
  const transactions: Transaction[] = [];
  let deposits = 0;
  let withdrawls = 0;

  book.transactions.forEach((entry, index) => {
    const previousEntry = transactions[index - 1];
    const previousBalance = index === 0 ? 0 : previousEntry?.nextBalance;
    const nextBalance =
      entry.type === 'CR'
        ? previousBalance + entry.amount
        : previousBalance - entry.amount;
    const order = index + 1;

    deposits = entry.type === 'CR' ? deposits + entry.amount : deposits;
    withdrawls = entry.type === 'DR' ? withdrawls + entry.amount : withdrawls;

    const t = {
      ...entry,
      nextBalance,
      previousBalance,
      order,
    } as Transaction;

    return transactions.push(t);
  });

  return {
    ...book,
    transactions,
    deposits,
    withdrawls,
  };
};
