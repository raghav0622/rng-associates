/* eslint-disable @typescript-eslint/no-explicit-any */
import { BoxProps, ColProps } from '@mantine/core';
import type { Path, UseFormProps as RHUseFormProps } from 'react-hook-form';
import { z } from 'zod';
import { RNGFormUISchema } from './Components';

export type BaseItem<Schema extends z.ZodType<any, any>> = {
  name: Path<z.infer<Schema>>;
  label: string;
  description?: string;
  renderLogic?: (formData: z.infer<Schema>) => Promise<boolean>;
} & { colProps?: ColProps };

export type OnSubmitResult = {
  errors:
    | false
    | Array<{
        message: string;
        path?: string;
      }>;
};

export interface RNGFormProps<Schema extends z.ZodType<any, any>>
  extends Pick<BoxProps, 'sx'> {
  name: string;
  schema: Schema;
  initialValues?: RHUseFormProps<z.infer<Schema>>['defaultValues'];
  uiSchema: RNGFormUISchema<Schema>;
  meta: {
    formTitle: string;
    titleOrder?: 1 | 2 | 3 | 4 | 5 | 6;
    formDescription?: string;
    buttonSize?: 'sm' | 'md' | 'lg';
  };
  onSubmit?: (values: z.infer<Schema>) => Promise<OnSubmitResult>;
  onChange?: (values: z.infer<Schema>) => Promise<unknown | void>;
  resetOnSuccess?: boolean;
  ui?: {
    submitText?: string;
    resetText?: string;
  };
}
