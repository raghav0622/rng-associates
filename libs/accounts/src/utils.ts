import { notifications } from '@mantine/notifications';
import { APIError } from '@rng-associates/firesource';
import { OnSubmitResult } from '@rng-associates/forms';

export const successNotification = (message: string) =>
  notifications.show({
    autoClose: 2000,
    title: `Success!`,
    message,
    color: 'teal',
  });

export async function APIFormErrorHandler(fn: () => Promise<OnSubmitResult>) {
  try {
    const result = await fn();

    return result;
  } catch (err) {
    if (err instanceof APIError) {
      return {
        errors: [
          {
            message: err.message,
            path: err.name || undefined,
          },
        ],
      };
    } else {
      console.error(err);
      return {
        errors: [
          {
            // @ts-expect-error error unknown
            message: err.message || 'please check console',
          },
        ],
      };
    }
  }
}

export async function APIErrorNotification(fn: () => Promise<void>) {
  try {
    await fn();
  } catch (err) {
    if (err instanceof APIError) {
      notifications.show({
        autoClose: 3000,
        title: `Error!`,
        message: err.message,
        color: 'red',
      });
    } else {
      console.error(err);

      notifications.show({
        autoClose: 3000,
        title: `Error!`,
        //@ts-expect-error unknow
        message: err?.message || 'please check console',
        color: 'red',
      });
    }
  }
}
