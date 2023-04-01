/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useController } from 'react-hook-form';
import { z } from 'zod';
import { BaseItem } from '../types';
import { useRenderItemLogic } from './useRenderItemLogic';

export type HiddenInputProps<Schema extends z.ZodType<any, any>> = Pick<
  BaseItem<Schema>,
  'name' | 'renderLogic'
> & {
  type: 'hidden';
};

export function HiddenInput<Schema extends z.ZodType<any, any>>({
  name,
  type,
  renderLogic,
}: HiddenInputProps<Schema>) {
  const {
    field: { value, name: givenName, onChange },
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({
    name,
  });

  const { render } = useRenderItemLogic<Schema>(renderLogic);

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
        onChange={onChange}
        disabled={isSubmitting}
        value={value}
      />
    );
  }

  return null;
}
