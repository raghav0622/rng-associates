import { z } from 'zod';

export const TransactionType = ['CR', 'DR'] as const;

export const LinkType = ['account', 'ledger', 'none'] as const;

export const AccountTransactionSchema = z
  .object({
    id: z.string(),
    date: z.date(),
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

    type: z.enum(TransactionType),

    amount: z.number().refine((n) => n > 0, 'Please enter valid amount'),

    ref: z.string().min(1),
    link: z
      .string()
      .min(1)
      .optional()
      .or(z.literal('').transform((t) => undefined)),
    linkType: z.enum(LinkType),

    order: z.number(),
    prevBalance: z.number(),
    nextBalance: z.number(),
  })
  .strict();

export type AccountTransaction = z.infer<typeof AccountTransactionSchema>;

export const TransactionLinkSchema = AccountTransactionSchema.omit({
  order: true,
  prevBalance: true,
  nextBalance: true,
});

export type TransactionLink = z.infer<typeof TransactionLinkSchema>;

export const CreateTransactionLink = TransactionLinkSchema.omit({
  id: true,
});

export type CreateTransactionLink = z.infer<typeof CreateTransactionLink>;
