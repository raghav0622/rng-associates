import { Grid } from '@mantine/core';
import {
  DateInput as MDateInput,
  DateInputProps as MDateInputProps,
} from '@mantine/dates';
import { useEffect } from 'react';
import { useController } from 'react-hook-form';
import { z } from 'zod';
import { BaseItem } from '../types';
import { useRenderItemLogic } from './_useRenderItemLogic';

export type DateInputProps<Schema extends z.ZodType<any, any>> =
  BaseItem<Schema> &
    Omit<MDateInputProps, 'name' | 'label' | 'description' | 'type'> & {
      type: 'date';
    };

export function DateInput<Schema extends z.ZodType<any, any>>({
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
}: DateInputProps<Schema>) {
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
      <Grid.Col {...colProps}>
        <MDateInput
          id={givenName}
          name={givenName}
          onChange={onChange}
          disabled={isSubmitting || rest.disabled}
          value={value}
          placeholder="MM-DD-YYYY"
          valueFormat={'MM-DD-YYYY'}
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
