import { Stack } from '@mantine/core';
import { useEntityData } from '../../resources';
import EntityDisplay from './EntityDisplay';

function ViewEntity() {
  const data = useEntityData();

  return (
    <>
      {data.length > 0 ? (
        <Stack spacing={'md'}>
          {data.map((entity) => {
            return <EntityDisplay key={'entity' + entity.id} {...entity} />;
          })}
        </Stack>
      ) : (
        <>No data to show</>
      )}
    </>
  );
}

export default ViewEntity;
