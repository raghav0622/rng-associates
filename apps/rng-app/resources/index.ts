export * from './Entity';
export * from './Ledger';
export * from './utils';

export const numberToCurrency = (num: number) => {
  const postfix = num < 0 ? 'DR' : 'CR';

  return `${new Intl.NumberFormat('en-in', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    signDisplay: 'never',
  }).format(num)} ${postfix}`;
};
