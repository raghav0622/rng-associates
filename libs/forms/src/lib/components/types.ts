/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import { DependentFieldProps } from './DependentField';
import { DateInputProps } from './dateInput';
import { HiddenInputProps } from './hidden';
import { NumberInputProps } from './numberInput';
import { SelectProps } from './select';
import { StringInputProps } from './stringInput';

export type RNGFormItem<Schema extends z.ZodType<any, any>> =
  | SelectProps<Schema>
  | StringInputProps<Schema>
  | NumberInputProps<Schema>
  | DateInputProps<Schema>
  | HiddenInputProps<Schema>
  | DependentFieldProps<Schema>;

export type RNGFormUISchema<Schema extends z.ZodType<any, any>> = Array<
  RNGFormItem<Schema>
>;
