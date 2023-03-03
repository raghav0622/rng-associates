import { z } from 'zod';

export type Resource<Schema extends z.ZodType<any, any>> = {
  name: string;
  firestoreCollectionName: string;
  schema: Schema;
};
