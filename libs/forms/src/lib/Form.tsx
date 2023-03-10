/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Button,
  Divider,
  Flex,
  Grid,
  LoadingOverlay,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons';
import { memo, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { renderFormItem } from './components';
import { OnSubmitResult, RNGFormProps } from './types';

export function RNGForm<Schema extends z.ZodType<any, any>>({
  schema,
  initialValues,
  name,
  meta,
  ui,
  uiSchema,
  onChange,
  onSubmit,
  sx,
  resetOnSuccess = true,
}: RNGFormProps<Schema>) {
  const ctx = useForm<z.infer<Schema>>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: initialValues,
    shouldUnregister: true,
  });

  const {
    clearErrors,
    setError,
    formState: { errors },
    reset,
  } = ctx;

  const formValues = ctx.watch() || null;

  useEffect(() => {
    (async function () {
      if (onChange && formValues) {
        await onChange(formValues);
      }
    })();
  }, [formValues, onChange]);

  useEffect(() => {
    if (ctx.formState.isSubmitSuccessful && resetOnSuccess) {
      clearErrors();
      reset(initialValues);
    }
  }, [resetOnSuccess, ctx.formState.isSubmitSuccessful]);

  return (
    <FormProvider {...ctx}>
      <Paper
        sx={sx}
        component={'form'}
        noValidate
        autoComplete="off"
        shadow="sm"
        p="md"
        onSubmit={ctx.handleSubmit(async (values) => {
          clearErrors();

          if (onSubmit) {
            const result: OnSubmitResult = await onSubmit(values);

            if (result.errors !== false) {
              result.errors.map((item, index) => {
                //@ts-expect-error safasd
                return setError(item.path || `custom-${index}`, {
                  type: 'string',
                  message: item.message,
                });
              });
            }
          }
        })}
      >
        <Stack spacing={0}>
          <Title order={meta.titleOrder ?? 5}>{meta.formTitle}</Title>
          {meta?.formDescription && <Text fz="md">{meta.formDescription}</Text>}
        </Stack>
        <Stack spacing="md" sx={{ position: 'relative' }}>
          <LoadingOverlay visible={ctx.formState.isSubmitting} />
          <Divider />
          {/* error handling */}
          {Object.keys(errors).filter((item) => item.startsWith('custom'))
            .length > 0 && (
            <Alert
              icon={<IconAlertCircle size="1rem" />}
              color="red"
              variant="outline"
            >
              <Stack>
                {Object.keys(errors)
                  .filter((item) => item.startsWith('custom'))
                  .map((item, i) => (
                    <Text fz="md" key={name + 'error' + item}>
                      {/**
                      @ts-expect-error asfdsafsa*/}
                      {errors[item].message}
                    </Text>
                  ))}
              </Stack>
            </Alert>
          )}

          {/* render actual form */}
          <Grid gutter="lg" m={0}>
            {uiSchema.map((formItem, index) => {
              return renderFormItem<Schema>(
                formItem,
                `${meta.formTitle}.${formItem.name}`
              );
            })}
            <Grid.Col span={12}>
              <Flex justify={'flex-end'} gap="sm">
                <Button
                  type="reset"
                  onClick={() => reset(initialValues)}
                  size={meta.buttonSize || 'sm'}
                  color="red"
                  variant="subtle"
                >
                  {ui?.resetText || 'Reset'}
                </Button>
                <Button
                  type="submit"
                  size={meta.buttonSize || 'sm'}
                  color="blue"
                  variant="outline"
                >
                  {ui?.submitText || 'Submit'}
                </Button>
              </Flex>
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper>
    </FormProvider>
  );
}

export default memo(RNGForm);
