import { z } from 'zod';
import { StringInput } from '../Components';
import { RNGFormItem } from '../types';

export function renderFormItem<Schema extends z.ZodType<any, any>>(
  item: RNGFormItem<Schema>,
  key: string
) {
  if (item.type === 'text') {
    return <StringInput key={key} {...item} />;
  }

  return null;
}
