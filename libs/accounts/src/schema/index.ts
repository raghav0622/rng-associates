import { useCreateResource } from '@rng-associates/firesource';
import { useFirestore } from 'reactfire';
import { z } from 'zod';
import { FinancialYearSchema, string } from '../utils';

export const AutoKeySchema = z
  .object({
    id: z.string(),
    name: z.string().min(1),
    value: z.string().min(1),
  })
  .strict();

export type AutoKey = z.infer<typeof AutoKeySchema>;

export const useAutoKeyResource = () => {
  const firestore = useFirestore();

  return useCreateResource({
    name: 'autoKey',
    schema: AutoKeySchema,
    firestore: firestore,
  });
};

export const UserSchema = z.object({
  id: string,
  name: string,
  email: string,
});

export const CompanySchema = z
  .object({
    id: string, // company id
    name: string, // company name
    owner: string, // user-id,
    fy: z.array(FinancialYearSchema),
  })
  .strict();

export type Company = z.infer<typeof CompanySchema>;

export const CreateCompanySchema = CompanySchema.pick({
  name: true,
}).extend({
  startYear: z
    .number()
    .refine((val) => val <= 2050 && val >= 2000, 'Enter b/w 2000 & 2050'),
});

export type CreateCompany = z.infer<typeof CreateCompanySchema>;

export * from './_account';
export * from './_transaction';
