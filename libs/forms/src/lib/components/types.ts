/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import { DateInputProps } from './DateInput';
import { HiddenInputProps } from './Hidden';
import { NumberInputProps } from './NumberInput';
import { SelectProps } from './Select';
import { StringInputProps } from './StringInput';

export type RNGFormItem<Schema extends z.ZodType<any, any>> =
  | SelectProps<Schema>
  | StringInputProps<Schema>
  | NumberInputProps<Schema>
  | DateInputProps<Schema>
  | HiddenInputProps<Schema>;

export type RNGFormUISchema<Schema extends z.ZodType<any, any>> = Array<
  RNGFormItem<Schema>
>;
