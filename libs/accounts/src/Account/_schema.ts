import dayjs from 'dayjs';
import { z } from 'zod';

export const AccountType = ['Bank Account', 'Fixed Deposit'] as const;

export const AccountSchema = z.object({
  id: z.string().min(1),
  updatedAt: z.date(),
  owner: z.string().min(1),
  type: z.enum(AccountType),
  nickName: z.string().min(1),
  accountNumber: z.string().min(1),
  ifsc: z.string().min(1),
  bankName: z.string().min(1),
  balance: z.number(),
  transactions: z.array(z.string()),
});

export type Account = z.infer<typeof AccountSchema>;

export const CreateAccountSchema = AccountSchema.omit({
  id: true,
  updatedAt: true,
  balance: true,
  transactions: true,
});

export type CreateAccount = z.infer<typeof CreateAccountSchema>;

export const AccToLedgerEntrySchema = z
  .object({
    id: z.string(),
    date: z.string().transform((string) => dayjs(string).toDate()),
    amount: z
      .number()
      .refine(
        (val) => val !== 0 || val > 0,
        'Please enter valid positive integer'
      ),
    type: z.enum(['CR', 'DR']),
    accountRef: z.string().min(1),
    accountOrder: z.number(),
    accountPreviousBalance: z.number(),
    accountNextBalance: z.number(),
    particular: z
      .string()
      .min(1)
      .optional()
      .or(z.literal('').transform((t) => undefined)),
    narration: z
      .string()
      .min(1)
      .optional()
      .or(z.literal('').transform((t) => undefined)),
  })
  .strict();
