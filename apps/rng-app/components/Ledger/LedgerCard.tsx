import {
  ActionIcon,
  Card,
  Chip,
  createStyles,
  Group,
  rem,
  Text,
  Tooltip,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconTrash } from '@tabler/icons';
import {
  APIErrorNotification,
  Ledger,
  numberToCurrency,
  useEntityDataById,
  useLedgerAPI,
} from '../../resources';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    padding: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

function AccountCard({
  balance,
  category,
  id,
  name,
  owner,
  type,
  displayOwner,
}: Ledger & { displayOwner?: boolean }) {
  const { remove } = useLedgerAPI();
  const ownerData = useEntityDataById(owner);
  const { classes } = useStyles();

  return (
    <Card withBorder radius="md" p="lg" className={classes.card}>
      <Card.Section className={classes.section} mt="lg">
        <Group position="apart" align={'center'}>
          <Text fz="lg" fw={500}>
            {name}
          </Text>
          {displayOwner && (
            <Chip size={'xs'} fw={600} checked={false}>
              {ownerData.name}
            </Chip>
          )}
        </Group>
        {/* <Text fz="sm" mt="xs">
          {bankName}
        </Text> */}
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group>
          <Text size="sm" color="dimmed">
            Balance
          </Text>
          <Text weight={500} size="md">
            {numberToCurrency(balance)}
          </Text>
        </Group>
      </Card.Section>

      <Group mt="xs">
        {/* <Link href={`/ledger/edit/${id}`}>
          <Button size="xs">Edit</Button>
        </Link>
        <CopyButton
          value={`A/c Name: ${ownerData.name}, Bank Name: ${bankName}, A/c No.: ${accountNumber}, IFSC: ${ifscCode}`}
        >
          {({ copied, copy }) => (
            <Tooltip label={copied ? 'Copied A/c Details' : 'Copy A/c Details'}>
              <ActionIcon
                color={copied ? 'teal' : 'blue'}
                onClick={copy}
                size="md"
                variant="filled"
              >
                <IconCopy />
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton> */}
        <Tooltip label="Delete Ledger">
          <ActionIcon
            color="red"
            variant="filled"
            onClick={async () => {
              await APIErrorNotification(async () => {
                await remove(id);
                notifications.show({
                  color: 'teal',
                  title: 'Success',
                  message: `Deleted Ledger: ${name}`,
                });
              });
            }}
          >
            <IconTrash />
          </ActionIcon>
        </Tooltip>
      </Group>
    </Card>
  );
}

export default AccountCard;
