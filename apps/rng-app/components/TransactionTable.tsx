/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Center,
  createStyles,
  Group,
  rem,
  ScrollArea,
  Table,
  Text,
  UnstyledButton,
} from '@mantine/core';
import {
  numberToCurrency,
  Transaction as BaseTransaction,
} from '@rng-associates/accounts';
import {
  IconChevronDown,
  IconChevronUp,
  IconSelector,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
  th: {
    padding: '0 !important',
  },

  control: {
    width: '100%',
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: rem(21),
    height: rem(21),
    borderRadius: rem(21),
  },
}));

type Transaction = Omit<BaseTransaction, 'date'> & { date: Date };

interface TableSortProps {
  data: Transaction[];
}

interface ThProps {
  children: React.ReactNode;
  reversed?: boolean;
  sorted?: boolean;
  onSort?: () => void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size="0.9rem" stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function sortData(
  data: Transaction[],
  payload: {
    sortBy: keyof Transaction | null;
    reversed: boolean;
  }
) {
  const { sortBy } = payload;

  const sorted = [...data].sort((a, b) => {
    if (sortBy !== null) {
      const field1 = a[sortBy];
      const field2 = b[sortBy];

      if (typeof field1 === 'string' && typeof field2 === 'string') {
        if (payload.reversed) {
          return field2.localeCompare(field1);
        }

        return field1.localeCompare(field2);
      }

      if (typeof field1 === 'number' && typeof field2 === 'number') {
        if (payload.reversed) {
          return field2 - field1;
        }

        return field1 - field2;
      }

      if (field1 instanceof Date && field2 instanceof Date) {
        const comparision = dayjs(field2).isAfter(field1);

        if (payload.reversed) {
          return comparision ? 1 : -1;
        }

        return comparision ? -1 : 1;
      }

      if (payload.reversed) {
        return -1;
      }
    }
    return 1;
  });

  return sorted;
}

export function TransactionTable({ data }: TableSortProps) {
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof Transaction | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof Transaction): void => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed }));
  };

  const rows = sortedData.map((row) => (
    <tr key={row.id}>
      <td>{dayjs(row.date).format('DD-MM-YYYY')}</td>
      <td>{numberToCurrency(row.amount)}</td>
      <td>
        {row.type === 'CR' ? 'Credit in' : 'Debit from'} {row.primaryLedger}
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        sx={{ tableLayout: 'fixed' }}
      >
        <thead>
          <tr>
            <Th
              sorted={sortBy === 'date'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('date')}
            >
              Date
            </Th>
            <Th
              sorted={sortBy === 'amount'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('amount')}
            >
              Amount
            </Th>
            <Th
              sorted={sortBy === 'primaryLedger'}
              reversed={reverseSortDirection}
              onSort={() => setSorting('primaryLedger')}
            >
              Details
            </Th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td colSpan={Object.keys(data[0]).length}>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
