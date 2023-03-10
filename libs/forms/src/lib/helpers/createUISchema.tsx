import { z } from 'zod';
import { RNGFormUISchema } from '../Components';

export function useCreateUISchema<Schema extends z.ZodType<any, any>>(
  schema: Schema,
  form: RNGFormUISchema<Schema>
) {
  return { schema, form };
}

export function createUISchema<Schema extends z.ZodType<any, any>>(
  schema: Schema,
  form: RNGFormUISchema<Schema>
) {
  return { schema, form };
}
