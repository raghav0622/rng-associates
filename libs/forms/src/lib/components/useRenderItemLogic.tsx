/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLayoutEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';

export function useRenderItemLogic<Schema extends z.ZodType<any, any>>(
  renderLogic?: (formValues: z.infer<Schema>) => Promise<boolean> | boolean
) {
  const { getValues } = useFormContext<Schema>();
  const [render, setRender] = useState(true);
  const allValues = getValues();
  useLayoutEffect(() => {
    if (renderLogic) {
      (async function () {
        try {
          const result = await renderLogic(allValues);
          setRender(result);
        } catch (e) {
          console.error(e);
        }
      })();
    }
  }, [renderLogic, allValues]);

  return { render } as const;
}
