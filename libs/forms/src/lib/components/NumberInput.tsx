/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Grid,
  NumberInput as MNumberInput,
  NumberInputProps as MNumberInputProps,
} from '@mantine/core';
import { useEffect } from 'react';
import { useController } from 'react-hook-form';
import { z } from 'zod';
import { BaseItem } from '../types';
import { useRenderItemLogic } from './useRenderItemLogic';

export type NumberInputProps<Schema extends z.ZodType<any, any>> =
  BaseItem<Schema> &
    Omit<MNumberInputProps, 'name' | 'label' | 'description' | 'type'> & {
      type: 'number';
    };

export function NumberInput<Schema extends z.ZodType<any, any>>({
  name,
  label,
  description,
  type,
  renderLogic,
  colProps = {
    span: 12,
  },
  required,
  hideControls = true,
  ...rest
}: NumberInputProps<Schema>) {
  const {
    field: { value, name: givenName, onChange },
    fieldState: { error },
    formState: { isSubmitting, isSubmitSuccessful },
  } = useController({
    name,
  });

  const { render } = useRenderItemLogic<Schema>(renderLogic);

  useEffect(() => {
    if (!render) {
      onChange(undefined);
    }
  }, [onChange, render]);

  useEffect(() => {
    if (value === '' || value === null || value === undefined) {
      onChange('');
    }
  }, [value, onChange]);

  if (render) {
    return (
      <Grid.Col {...colProps}>
        <MNumberInput
          id={givenName}
          name={givenName}
          onChange={onChange}
          disabled={isSubmitting || rest.disabled}
          value={value}
          size="sm"
          error={error?.message}
          label={label}
          description={description ? description(value) : undefined}
          hideControls={hideControls}
          inputWrapperOrder={['label', 'input', 'description', 'error']}
          {...rest}
        />
      </Grid.Col>
    );
  }

  return null;
}
