import {
  Badge,
  Card,
  createStyles,
  Divider,
  Group,
  rem,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from '@mantine/core';
import { Account, numberToCurrency } from '@rng-associates/accounts';
import dayjs from 'dayjs';
import Link from 'next/link';

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

export function AccountInfoCard(acc: Account) {
  const { classes } = useStyles();
  return (
    <Card withBorder radius="md" p="lg" className={classes.card}>
      <Stack spacing="md">
        <Group position="apart" align={'center'}>
          <Link href={`/account/${acc.id}`} legacyBehavior>
            <UnstyledButton>
              <Title order={6}>{acc.nickName}</Title>
            </UnstyledButton>
          </Link>
        </Group>
        <Divider />

        <Group position="apart" align="flex-start">
          <Stack spacing="none">
            <Text size="sm">Balance</Text>
            <Text size="xs" color="dimmed">
              <>As on {dayjs(acc.updatedAt).format('DD-MM-YYYY (ddd)')}</>
            </Text>
          </Stack>
          <Title order={6}>{numberToCurrency(acc.balance, true)}</Title>
        </Group>
        <Divider />
        <Group>
          <Badge color="gray" variant={'outline'}>
            {acc.type}
          </Badge>
        </Group>
      </Stack>
    </Card>
  );
}
