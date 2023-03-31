import dayjs from 'dayjs';

import { notifications } from '@mantine/notifications';
import { APIError } from '@rng-associates/firesource';
import { OnSubmitResult } from '@rng-associates/forms';

import { z } from 'zod';

export const successNotification = (message: string) =>
  notifications.show({
    autoClose: 2000,
    title: `Success!`,
    message,
    color: 'teal',
  });

export async function APIFormErrorHandler(fn: () => Promise<OnSubmitResult>) {
  try {
    const result = await fn();

    return result;
  } catch (err) {
    if (err instanceof APIError) {
      return {
        errors: [
          {
            message: err.message,
            path: err.name || undefined,
          },
        ],
      };
    } else {
      console.error(err);
      return {
        errors: [
          {
            // @ts-expect-error error unknown
            message: err.message || 'please check console',
          },
        ],
      };
    }
  }
}

export async function APIErrorNotification(fn: () => Promise<void>) {
  try {
    await fn();
  } catch (err) {
    if (err instanceof APIError) {
      notifications.show({
        autoClose: 3000,
        title: `Error!`,
        message: err.message,
        color: 'red',
      });
    } else {
      console.error(err);

      notifications.show({
        autoClose: 3000,
        title: `Error!`,
        //@ts-expect-error unknow
        message: err?.message || 'please check console',
        color: 'red',
      });
    }
  }
}

export function cleanEmpty<T extends Record<any, any>>(o: T) {
  const obj = { ...o };
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined) {
      delete obj[key];
    }
  });

  return obj as T;
}

export const string = z.string().min(1);
export const optionalString = z
  .string()
  .min(1)
  .optional()
  .or(z.literal('').transform((t) => undefined));
export const date = z.date();
export const boolean = z.boolean();
export const number = z.number();

export const optionalNumber = z
  .number()
  .optional()
  .or(z.literal('').transform((t) => undefined));

export const TransactionType = ['CR', 'DR'] as const;
export const TransactionLinkType = [
  'account-to-account',
  'account-to-ledger',
  'no-link',
] as const;

export const FinancialYearSchema = z.object({
  name: string,
  start: date,
  end: date,
  locked: boolean,
  previous: optionalString,
});

export type FinancialYear = z.infer<typeof FinancialYearSchema>;

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
