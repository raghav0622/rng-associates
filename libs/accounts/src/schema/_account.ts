import { z } from 'zod';
import { date, number, optionalNumber, optionalString, string } from '../utils';
import { TransactionSchema } from './_transaction';

export const AccountBookSchema = z.object({
  id: string,
  withdrawls: number,
  deposits: number,
  transactions: z.array(TransactionSchema),
});

export type AccountBook = z.infer<typeof AccountBookSchema>;

export const AccountSchema = z.object({
  id: string, // account-id
  company: string, // company id
  type: string,
  nickName: string,
  closed: date.optional(),
  openDate: date.optional(),
  closeDate: date.optional(),
  accountNumber: optionalString,
  ifsc: optionalString,
  bankName: optionalString,
  books: z.array(AccountBookSchema),
});

export type Account = z.infer<typeof AccountSchema>;

export const CreateAccountSchema = AccountSchema.pick({
  company: true,
  type: true,
  nickName: true,
  accountNumber: true,
  ifsc: true,
  bankName: true,
}).extend({
  prevBalance: optionalNumber,
  particular: optionalString,
});

export type CreateAccount = z.infer<typeof CreateAccountSchema>;
