import { z } from 'zod';

export const LedgerSchema = z.object({
  id: z.string().min(1),
  company: z.string().min(1),
  name: z.string().min(1),
  type: z.literal('ledger'),
  category: z.string().min(1),
  balance: z.number(),
  updatedAt: z.date(),
  transactions: z.array(z.string()),
});

export type Ledger = z.infer<typeof LedgerSchema>;

export const CreateLedgerSchema = LedgerSchema.omit({
  id: true,
  type: true,
  updatedAt: true,
  balance: true,
  transactions: true,
});

export type CreateLedger = z.infer<typeof CreateLedgerSchema>;
