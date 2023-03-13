import {
  ActionIcon,
  Card,
  Flex,
  Grid,
  Group,
  Stack,
  Title,
  Tooltip,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  APIErrorNotification,
  useAutoKeyAPI,
  useAutoKeyDataGrouped,
} from '@rng-associates/accounts';
import { IconTrash } from '@tabler/icons';
import { sortBy } from 'lodash';

export function AutoCompleteData() {
  const data = useAutoKeyDataGrouped();

  const { remove } = useAutoKeyAPI();

  return (
    <Grid>
      {Object.keys(data).length > 0 ? (
        Object.keys(data).map((item) => {
          return (
            <Grid.Col key={item} xs={12}>
              <Card p="lg">
                <Stack>
                  <Title order={4} pl="md">
                    Key: {item}
                  </Title>
                  <Group spacing="md">
                    {sortBy(data[item], 'value').map((i) => (
                      <Flex
                        align="center"
                        gap="sm"
                        key={item + i}
                        p="sm"
                        sx={(theme) => ({
                          border: '1px solid grey',
                          borderColor: theme.colors.gray[3],
                          borderRadius: '0.5rem',
                        })}
                      >
                        {i.value}

                        <Tooltip label={'Delete ' + i.value}>
                          <ActionIcon
                            onClick={async () => {
                              await APIErrorNotification(async () => {
                                await remove(i.id);

                                notifications.show({
                                  autoClose: 3000,
                                  title: `Success!`,
                                  message: `Autocomplete value: ${i.value} Deleted from ${item}`,
                                  color: 'teal',
                                });
                              });
                            }}
                          >
                            <IconTrash size="xs" />
                          </ActionIcon>
                        </Tooltip>
                      </Flex>
                    ))}
                  </Group>
                </Stack>
              </Card>
            </Grid.Col>
          );
        })
      ) : (
        <>No Data to show!</>
      )}
    </Grid>
  );
}
