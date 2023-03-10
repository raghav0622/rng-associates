/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Grid,
  Select as MSelect,
  SelectItem,
  SelectProps as MSelectProps,
} from '@mantine/core';
import { useEffect } from 'react';
import { useController } from 'react-hook-form';
import { z } from 'zod';
import { BaseItem } from '../types';
import { useRenderItemLogic } from './_useRenderItemLogic';

export type SelectProps<Schema extends z.ZodType<any, any>> = BaseItem<Schema> &
  Omit<MSelectProps, 'name' | 'label' | 'description' | 'type' | 'onCreate'> & {
    type: 'select';
    onCreate?: (query: string) => Promise<SelectItem>;
  };

export function Select<Schema extends z.ZodType<any, any>>({
  name,
  label,
  description,
  type,
  renderLogic,
  colProps = {
    span: 12,
  },
  onCreate,
  ...rest
}: SelectProps<Schema>) {
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

  useEffect(() => {
    if (value === '' || value === undefined) {
      onChange(null);
    }
  }, [value, onChange]);

  if (render) {
    return (
      <Grid.Col {...colProps}>
        <MSelect
          {...rest}
          id={givenName}
          name={givenName}
          onChange={(val) => onChange(val)}
          value={value}
          size="sm"
          error={error?.message}
          label={label}
          description={description}
          onCreate={
            rest.creatable && onCreate !== undefined
              ? (query) => {
                  let result: SelectItem | undefined = undefined;
                  onCreate(query).then((data) => {
                    result = data;
                    onChange(data.value);
                  });

                  return result;
                }
              : undefined
          }
          disabled={isSubmitting || rest.disabled}
        />
      </Grid.Col>
    );
  }

  return null;
}
