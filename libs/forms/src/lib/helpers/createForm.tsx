/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import { RNGFormProps } from '../types';

export function useCreateRNGForm<Schema extends z.ZodType<any, any>>(
  schema: Schema,
  props: Partial<Omit<RNGFormProps<Schema>, 'schema'>>
) {
  return { schema, ...props } as RNGFormProps<Schema>;
}
