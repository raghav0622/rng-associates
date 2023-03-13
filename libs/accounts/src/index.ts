export * from './AutoKey';
export * from './Entity';
export * from './EntityCtx';
export * from './utils';
export * from './_Account';
export * from './_Transaction';

export const numberToCurrency = (num: number, withPostfix?: boolean) => {
  const postfix = withPostfix ? (num < 0 ? 'DR' : 'CR') : '';

  return `${new Intl.NumberFormat('en-in', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    signDisplay: 'never',
  }).format(num)} ${postfix}`;
};
