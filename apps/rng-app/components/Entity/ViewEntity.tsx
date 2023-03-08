import { Stack } from '@mantine/core';
import { lazy } from 'react';
import { useEntityData } from '../../resources';

const EntityDisplay = lazy(() => import('./EntityDisplay'));

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
