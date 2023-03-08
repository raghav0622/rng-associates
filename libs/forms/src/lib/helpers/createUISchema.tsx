import { z } from 'zod';
import { RNGFormUISchema } from '../types';

export function useCreateUISchema<Schema extends z.ZodType<any, any>>(
  schema: Schema,
  form: RNGFormUISchema<Schema>
) {
  return form;
}
