import { z } from 'zod';
import { optionalNumber, optionalString, string } from '../utils';
import { AccountBookSchema } from './_account';

export const LedgerSchema = z.object({
  id: string, // ledger-id
  company: string, // company id
  name: string,
  category: string,
  books: z.array(AccountBookSchema),
});

export type Ledger = z.infer<typeof LedgerSchema>;

export const CreateLedgerSchema = LedgerSchema.pick({
  name: true,
  company: true,
  category: true,
}).extend({
  prevBalance: optionalNumber,
  particular: optionalString,
});

export type CreateLedger = z.infer<typeof CreateLedgerSchema>;
