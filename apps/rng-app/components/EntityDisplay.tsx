import {
  ActionIcon,
  Card,
  Grid,
  Group,
  Notification,
  Stack,
  Title,
  Tooltip,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  APIErrorNotification,
  Entity,
  useEntityAPI,
  useLedgerDataByOwnerID,
} from '@rng-associates/accounts';
import { IconTrash } from '@tabler/icons';
import { LedgerCard } from './LedgerCard';

const LedgerDetails: React.FC<{ id: string }> = ({ id }) => {
  const ledgers = useLedgerDataByOwnerID(id);

  return (
    <>
      {ledgers !== undefined && ledgers.length > 0 ? (
        <Grid gutter="md">
          {ledgers.map((acc) => (
            <Grid.Col xs={12} md={6} lg={4} xl={3} key={id + acc.id}>
              <LedgerCard {...acc} />
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <Notification title="No Ledgers to display" withCloseButton={false} />
      )}
    </>
  );
};

export const EntityDisplay: React.FC<Entity> = ({ id, name }) => {
  const { remove } = useEntityAPI();

  return (
    <Card key={`entity-` + id}>
      <Stack spacing={'md'}>
        <Group position="apart">
          <Title order={4} ml="md">
            {name}
          </Title>
          <Tooltip label="Delete Entity">
            <ActionIcon
              onClick={async () => {
                await APIErrorNotification(async () => {
                  await remove(id);
                  notifications.show({
                    color: 'teal',
                    title: 'Success',
                    message: `Deleted Entity: ${name}`,
                  });
                });
              }}
            >
              <IconTrash />
            </ActionIcon>
          </Tooltip>
        </Group>
        {id && <LedgerDetails id={id} />}
      </Stack>
    </Card>
  );
};
