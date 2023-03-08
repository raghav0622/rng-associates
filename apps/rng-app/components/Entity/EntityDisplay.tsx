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
import { IconTrash } from '@tabler/icons';
import {
  APIErrorNotification,
  Entity,
  useAccountByOwnerID,
  useEntityAPI,
} from '../../resources';
import AccountCard from '../Account/AccountCard';

const EntityDisplay: React.FC<Entity> = ({ id, name }) => {
  const { remove } = useEntityAPI();
  const accounts = useAccountByOwnerID(id);

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
        {accounts.length > 0 ? (
          <Grid gutter="md">
            {accounts.map((acc) => (
              <Grid.Col xs={12} md={4} key={id + acc.accountNumber}>
                <AccountCard {...acc} />
              </Grid.Col>
            ))}
          </Grid>
        ) : (
          <Notification title="No Accounts exist" withCloseButton={false} />
        )}
      </Stack>
    </Card>
  );
};

export default EntityDisplay;
