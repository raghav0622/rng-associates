import { z } from 'zod';
import { FinancialYearSchema, string } from '../utils';

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
