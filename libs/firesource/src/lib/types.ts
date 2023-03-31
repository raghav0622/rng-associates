import { z } from 'zod';

export type Resource<Schema extends z.ZodType<any, any>> = {
  name: string;
  schema: Schema;
};
export class APIError extends Error {
  constructor(message: string, path?: string) {
    super(message);
    this.name = path ?? 'APIError';
  }
}
