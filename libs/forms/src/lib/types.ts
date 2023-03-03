/* eslint-disable @typescript-eslint/no-explicit-any */
import { BoxProps, ColProps } from '@mantine/core';
import type { Path, UseFormProps as RHUseFormProps } from 'react-hook-form';
import { z } from 'zod';
import { StringInputProps } from './Components';

export type RNGFormItem<Schema extends z.ZodType<any, any>> =
  StringInputProps<Schema>;

export type RNGFormUISchema<Schema extends z.ZodType<any, any>> = Array<
  RNGFormItem<Schema>
>;

export type BaseItem<Schema extends z.ZodType<any, any>> = {
  name: Path<z.infer<Schema>>;
  label: string;
  description?: string;
  renderLogic?: (formData: z.infer<Schema>) => Promise<boolean>;
} & { colProps?: ColProps };

export type OnSubmitResult<Schema extends z.ZodType<any, any>> = {
  errors:
    | false
    | Array<{
        message: string;
        path?: Path<z.infer<Schema>>;
      }>;
};

export interface RNGFormProps<Schema extends z.ZodType<any, any>>
  extends Pick<BoxProps, 'sx'> {
  schema: Schema;
  initialValues: RHUseFormProps<z.infer<Schema>>['defaultValues'];

  meta: {
    name: string;
    formTitle: string;
    formDescription: string;
  };

  resetOnSuccess?: boolean;

  ui: {
    submitText?: string;
    resetText?: string;
    schema: RNGFormUISchema<Schema>;
  };

  functions?: {
    onSubmit?: (values: z.infer<Schema>) => Promise<OnSubmitResult<Schema>>;
    onChange?: (values: z.infer<Schema>) => Promise<unknown | void>;
  };
}
