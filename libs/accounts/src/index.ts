import dayjs from 'dayjs';

export * from './Entity';
export * from './utils';
export * from './_Account';
export * from './_AutoKey';
export * from './_Context';
export * from './_Ledger';
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

export const firstoreTimestampToDateString = (date: Date) => {
  //@ts-expect-error timestamp to date
  return dayjs(date.toDate()).format('DD-MM-YYYY');
};

export const firstoreTimestampToDate = (date: Date) => {
  //@ts-expect-error timestamp to date
  return date.toDate();
};
