import { z } from 'zod';
import { DateInput } from './dateInput';
import { DependentField } from './dependentField';
import { HiddenInput } from './hidden';
import { NumberInput } from './numberInput';
import { Select } from './select';
import { StringInput } from './stringInput';
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
  if (item.type === 'dependent') {
    return <DependentField key={key} {...item} />;
  }

  return null;
}
