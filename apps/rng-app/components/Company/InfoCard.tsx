import {
  Card,
  createStyles,
  Group,
  rem,
  Title,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { Company } from '@rng-associates/accounts';
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

export function CompanyInfoCard(company: Company) {
  const { classes } = useStyles();
  return (
    <Link href={`company/${company.id}`} legacyBehavior>
      <Tooltip label="View Company">
        <Card
          withBorder
          radius="md"
          p="lg"
          className={classes.card}
          component={UnstyledButton}
          sx={{ width: '100%' }}
        >
          <Group position="center">
            <Title order={6}>{company.name}</Title>
          </Group>
        </Card>
      </Tooltip>
    </Link>
  );
}
