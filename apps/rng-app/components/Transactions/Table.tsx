import { Button, Table } from '@mantine/core';
import {
  AccountBook,
  firstoreTimestampToDateString,
  numberToCurrency,
  useRemoveTransactionAPI,
} from '@rng-associates/accounts';

export type TransactionTableProps = {
  accountBook: AccountBook;
};

export const TransactionTable: React.FC<TransactionTableProps> = ({
  accountBook,
}) => {
  const { mutate } = useRemoveTransactionAPI();
  const ths = (
    <tr>
      <th>#</th>
      <th>Date</th>
      <th>Narration</th>
      <th>DR</th>
      <th>CR</th>
      <th>Balance</th>
      <th>Actions</th>
    </tr>
  );
  const rows = accountBook.transactions.map((trans) => (
    <tr key={trans.id}>
      <td>{trans.order}</td>
      <td>{firstoreTimestampToDateString(trans.date)}</td>
      <td>{trans.particular}</td>
      <td>{trans.type === 'DR' ? numberToCurrency(trans.amount) : '-'}</td>
      <td>{trans.type === 'CR' ? numberToCurrency(trans.amount) : '-'}</td>
      <td>{numberToCurrency(trans.nextBalance, true)}</td>
      <td>
        <Button
          size="xs"
          onClick={async () => {
            await mutate(trans);
          }}
        >
          Delete Entry
        </Button>
      </td>
    </tr>
  ));

  if (accountBook.transactions.length === 0) {
    return <>No Transactions To Show</>;
  }

  return (
    <Table striped highlightOnHover withBorder withColumnBorders>
      <thead>{ths}</thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};
