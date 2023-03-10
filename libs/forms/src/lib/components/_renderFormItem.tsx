import { z } from 'zod';
import { DateInput } from './DateInput';
import { HiddenInput } from './Hidden';
import { NumberInput } from './NumberInput';
import { Select } from './Select';
import { StringInput } from './StringInput';
import { RNGFormItem } from './types';

export function renderFormItem<Schema extends z.ZodType<any, any>>(
  item: RNGFormItem<Schema>,
  key: string
) {
  if (item.type === 'text') {
    return <StringInput key={key} {...item} />;
  }
  if (item.type === 'select') {
    return <Select key={key} {...item} />;
  }
  if (item.type === 'number') {
    return <NumberInput key={key} {...item} />;
  }
  if (item.type === 'date') {
    return <DateInput key={key} {...item} />;
  }
  if (item.type === 'hidden') {
    return <HiddenInput key={key} {...item} />;
  }

  return null;
}
