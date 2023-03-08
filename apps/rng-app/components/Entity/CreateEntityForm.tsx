import { RNGForm } from '@rng-associates/forms';
import { useEntityForms } from '../../resources/Entity/forms';

function CreateEntityForm() {
  const { createEntity } = useEntityForms();

  return <RNGForm {...createEntity} />;
}

export default CreateEntityForm;
