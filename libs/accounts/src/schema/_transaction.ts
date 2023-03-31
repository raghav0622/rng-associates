import { z } from 'zod';
import {
  date,
  number,
  optionalString,
  string,
  TransactionLinkType,
  TransactionType,
} from '../utils';

export const TransactionSchema = z
  .object({
    id: string,
    order: number,
    date: date,
    account: string,
    book: string, // Book id
    amount: number,
    type: z.enum(TransactionType),
    nextBalance: number,
    previousBalance: number,
    particular: optionalString,
    bankNarration: optionalString,
    linkType: z.enum(TransactionLinkType),
    linkRef: optionalString, // link refrence account id
    linkBook: optionalString, // link refrence Book id
  })
  .strict();

export type Transaction = z.infer<typeof TransactionSchema>;

export const TransactionEtrySchema = TransactionSchema.omit({
  order: true,
  nextBalance: true,
  previousBalance: true,
});

export type TransactionEtry = z.infer<typeof TransactionEtrySchema>;

export const CreateTransactionSchema = TransactionSchema.pick({
  date: true,
  account: true,
  book: true,
  amount: true,
  type: true,
  particular: true,
  bankNarration: true,
  id: true,
  linkType: true,
  linkRef: true,
});

export type CreateTransaction = z.infer<typeof CreateTransactionSchema>;
