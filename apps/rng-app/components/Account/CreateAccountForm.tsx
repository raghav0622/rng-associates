import { RNGForm } from '@rng-associates/forms';
import { useAccountForms } from '../../resources';

function CreateAccountForm() {
  const { createAccount } = useAccountForms();

  return <RNGForm {...createAccount} />;
}

export default CreateAccountForm;
