/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, TextInput, TextInputProps } from '@mantine/core';
import { useEffect } from 'react';
import { useController } from 'react-hook-form';
import { z } from 'zod';
import { useRenderItemLogic } from '../helpers';
import { BaseItem } from '../types';

export type StringInputProps<Schema extends z.ZodType<any, any>> =
  BaseItem<Schema> &
    Omit<TextInputProps, 'name' | 'label' | 'description' | 'type'> & {
      type: 'text';
    };

export function StringInput<Schema extends z.ZodType<any, any>>({
  name,
  label,
  description,
  type,
  renderLogic,
  colProps = {
    span: 12,
  },
  required,
  ...rest
}: StringInputProps<Schema>) {
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
        <TextInput
          id={givenName}
          name={givenName}
          onChange={onChange}
          disabled={isSubmitting || rest.disabled}
          value={value}
          size="sm"
          error={error?.message}
          label={label}
          description={description}
          {...rest}
        />
      </Grid.Col>
    );
  }

  return null;
}
