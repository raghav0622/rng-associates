import { z } from 'zod';
import { AccountTransactionSchema } from '../_Transaction';

export const AccountType = ['Cash', 'Bank Account', 'Fixed Deposit'] as const;

export const AccountSchema = z.object({
  id: z.string().min(1),
  owner: z.string().min(1),
  type: z.enum(AccountType),
  nickName: z.string().min(1),
  // accountNumber: z.string().min(1),
  // ifsc: z.string().min(1),
  // bankName: z.string().min(1),
  transactions: z.array(AccountTransactionSchema),
});

export type Account = z.infer<typeof AccountSchema>;

export const CreateAccountSchema = AccountSchema.omit({
  id: true,
  transactions: true,
});

export type CreateAccount = z.infer<typeof CreateAccountSchema>;
