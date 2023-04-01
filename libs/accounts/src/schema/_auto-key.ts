import { z } from 'zod';

export const AutoKeySchema = z
  .object({
    id: z.string(),
    name: z.string().min(1),
    value: z.string().min(1),
  })
  .strict();

export type AutoKey = z.infer<typeof AutoKeySchema>;
