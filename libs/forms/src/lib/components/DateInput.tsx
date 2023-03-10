// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Grid } from '@mantine/core';
// import {
//   DateInput as MDateInput,
//   DateInputProps as MDateInputProps,
// } from '@mantine/dates';
// import { useEffect } from 'react';
// import { useController } from 'react-hook-form';
// import { z } from 'zod';
// import { BaseItem } from '../types';
// import { useRenderItemLogic } from './_useRenderItemLogic';

// export type DateInputProps<Schema extends z.ZodType<any, any>> =
//   BaseItem<Schema> &
//     Omit<
//       MDateInputProps,
//       'name' | 'label' | 'description' | 'type' | 'valueFormat'
//     > & {
//       type: 'date';
//     };

// export function DateInput<Schema extends z.ZodType<any, any>>({
//   name,
//   label,
//   description,
//   type,
//   renderLogic,
//   colProps = {
//     span: 12,
//   },
//   required,
//   ...rest
// }: DateInputProps<Schema>) {
//   const {
//     field: { value, name: givenName, onChange },
//     fieldState: { error },
//     formState: { isSubmitting },
//   } = useController({
//     name,
//   });

//   const { render } = useRenderItemLogic<Schema>(renderLogic);

//   useEffect(() => {
//     if (!render) {
//       onChange(undefined);
//     }
//   }, [onChange, render]);

//   useEffect(() => {
//     if (value === '' || value === null || value === undefined) {
//       onChange(null);
//     }
//   }, [value, onChange]);

//   if (render) {
//     return (
//       <Grid.Col {...colProps}>
//         <MDateInput
//           id={givenName}
//           name={givenName}
//           type="date"
//           onChange={onChange}
//           disabled={isSubmitting || rest.disabled}
//           value={value}
//           size="sm"
//           error={error?.message}
//           label={label}
//           description={description}
//           locale="en-in"
//           valueFormat="DD-MM-YYYY"
//           sx={{ width: '100%' }}
//           {...rest}
//         />
//       </Grid.Col>
//     );
//   }

//   return null;
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, TextInput, TextInputProps } from '@mantine/core';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useController } from 'react-hook-form';
import { z } from 'zod';
import { BaseItem } from '../types';
import { useRenderItemLogic } from './_useRenderItemLogic';

export type DateInputProps<Schema extends z.ZodType<any, any>> =
  BaseItem<Schema> &
    Omit<TextInputProps, 'name' | 'label' | 'description' | 'type'> & {
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

  useEffect(() => {
    if (value === '' || value === null || value === undefined) {
      onChange('');
    } else {
      onChange(dayjs(value).format('YYYY-MM-DD'));
    }
  }, [value, onChange]);
  if (render) {
    return (
      <Grid.Col {...colProps}>
        <TextInput
          id={givenName}
          name={givenName}
          onChange={onChange}
          type="date"
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
