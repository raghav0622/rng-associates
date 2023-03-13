/* eslint-disable @typescript-eslint/no-explicit-any */
import { TextInputProps } from '@mantine/core';
import { useEffect } from 'react';
import {
  Path,
  useController,
  useFormContext,
  UseFormGetValues,
} from 'react-hook-form';
import { z } from 'zod';
import { BaseItem } from '../types';
import { useRenderItemLogic } from './_useRenderItemLogic';

export type DependentFieldProps<Schema extends z.ZodType<any, any>> =
  BaseItem<Schema> &
    Omit<TextInputProps, 'name' | 'label' | 'description' | 'type'> & {
      type: 'dependent';
      dependentFields: Path<z.infer<Schema>>[];
      getVal: (
        value: (name: Path<z.infer<Schema>>) => UseFormGetValues<Schema>
      ) => unknown;
    };

export function DependentField<Schema extends z.ZodType<any, any>>({
  name,
  label,
  description,
  type,
  renderLogic,
  colProps = {
    span: 12,
  },
  required,
  dependentFields,
  getVal,
  ...rest
}: DependentFieldProps<Schema>) {
  const {
    field: { value, name: givenName, onChange },
  } = useController({
    name,
  });
  const { getValues } = useFormContext<Schema>();
  const dependentValues = getValues(dependentFields);
  const { render } = useRenderItemLogic<Schema>(renderLogic);

  useEffect(() => {
    if (value === '' || value === null || value === undefined) {
      onChange('');
    }
  }, [value, onChange]);

  useEffect(() => {
    const newVal = getVal(getValues);
    onChange(newVal);
  }, [...dependentValues]);

  useEffect(() => {
    if (!render) {
      onChange(undefined);
    }
  }, [onChange, render]);

  if (render) {
    return (
      <input
        type="hidden"
        id={givenName}
        name={givenName}
        disabled={true}
        value={value}
      />
    );
  }

  return null;
}
