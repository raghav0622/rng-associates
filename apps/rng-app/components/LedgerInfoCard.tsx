import {
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
import {
  currency,
  fireDateString,
  Ledger,
  useCompanyCtx,
  useLedgerCtx,
} from '@rng-associates/accounts';
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

export function LedgerInfoCard(ledger: Ledger) {
  const { classes } = useStyles();
  const { appPath } = useCompanyCtx();
  const { getTransactionData } = useLedgerCtx();

  const data = getTransactionData(ledger.id);

  if (!data) return null;

  const { currentBook } = data;

  return (
    <Card withBorder radius="md" p="lg" className={classes.card}>
      <Stack spacing="md">
        <Group position="apart" align={'center'}>
          <Link href={`${appPath}/ledger/${ledger.id}`} legacyBehavior>
            <UnstyledButton>
              <Title order={6}>{ledger.name}</Title>
            </UnstyledButton>
          </Link>
        </Group>
        <Divider />

        <Group position="apart" align="flex-start">
          <Stack spacing="none">
            <Text size="sm">Balance</Text>
            <Text size="xs" color="dimmed">
              <>
                {currentBook?.transactions[
                  currentBook?.transactions.length - 1
                ] === undefined
                  ? 'No Tranasction'
                  : 'As on ' +
                    fireDateString(
                      currentBook.transactions[
                        currentBook.transactions.length - 1
                      ].date
                    )}
              </>
            </Text>
          </Stack>
          <Title order={6}>
            {currency(
              currentBook?.transactions[currentBook.transactions.length - 1]
                ?.nextBalance || 0,
              true
            )}
          </Title>
        </Group>
        {/* <Divider /> */}
        {/* <Group>
          <Badge color="gray" variant={'outline'}>
            {acc.type}
          </Badge>
        </Group> */}
      </Stack>
    </Card>
  );
}
