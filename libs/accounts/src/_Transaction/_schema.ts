import dayjs from 'dayjs';
import { z } from 'zod';

export const TransactionType = ['CR', 'DR'] as const;

export const LinkType = ['account', 'ledger'] as const;

export const TransactionSchema = z
  .object({
    id: z.string(),
    date: z.string().transform((string) => dayjs(string).toDate()),
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

    amount: z.number(),

    ref: z.string().min(1),
    refOrder: z.number(),
    refPreviousBalance: z.number(),
    refNextBalance: z.number(),

    link: z.string().min(1),
    linkType: z.enum(LinkType),
    linkOrder: z.number(),
    linkPreviousBalance: z.number(),
    linkNextBalance: z.number(),
  })
  .strict();

export type Transaction = z.infer<typeof TransactionSchema>;

export const CreateTransactionSchema = TransactionSchema.omit({
  id: true,
  refNextBalance: true,
  linkOrder: true,
  linkPreviousBalance: true,
  linkNextBalance: true,
});

export type CreateTransaction = z.infer<typeof CreateTransactionSchema>;
