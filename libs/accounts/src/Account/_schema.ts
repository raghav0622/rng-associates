import { z } from 'zod';

export const AccountType = ['Cash', 'Bank Account', 'Fixed Deposit'] as const;

export const AccountSchema = z.object({
  id: z.string().min(1),
  updatedAt: z.date(),
  owner: z.string().min(1),
  type: z.enum(AccountType),
  nickName: z.string().min(1),
  // accountNumber: z.string().min(1),
  // ifsc: z.string().min(1),
  // bankName: z.string().min(1),
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
