import { notifications } from '@mantine/notifications';
import { RNGForm } from '@rng-associates/forms';
import {
  APIFormErrorHandler,
  useAccountAPI,
  useAccountByID,
  useAccountForms,
} from '../../resources';

const EditAccountForm: React.FC<{ id: string }> = ({ id }) => {
  const { editAccount } = useAccountForms();
  const { update } = useAccountAPI();
  const data = useAccountByID(id);
  return (
    <RNGForm
      {...editAccount}
      initialValues={data}
      onSubmit={async (values) => {
        const result = await APIFormErrorHandler(async () => {
          await update(id, values);

          notifications.show({
            autoClose: 3000,
            title: `Success!`,
            message: `Account Updated: ${data.nickName}`,
            color: 'teal',
          });

          return {
            errors: false,
          };
        });

        return result;
      }}
    />
  );
};

export default EditAccountForm;
