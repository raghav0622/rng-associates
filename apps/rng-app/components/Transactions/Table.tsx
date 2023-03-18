import { Table } from '@mantine/core';
import {
  AccountTransaction,
  firstoreTimestampToDateString,
  numberToCurrency,
  useTransactionParse,
} from '@rng-associates/accounts';

export type TransactionTableProps = {
  viewer: string;
  transactions: AccountTransaction[];
};

export const TransactionTable: React.FC<TransactionTableProps> = ({
  viewer,
  transactions,
}) => {
  const { parseDefaultNarration } = useTransactionParse();
  const ths = (
    <tr>
      <th>#</th>
      <th>Date</th>
      <th>Narration</th>
      <th>Amount</th>
      <th>Balance</th>
    </tr>
  );
  const rows = transactions.map((trans) => (
    <tr key={trans.id}>
      <td>{trans.order}</td>
      <td>{firstoreTimestampToDateString(trans.date)}</td>
      <td>
        {parseDefaultNarration(viewer, trans)} {trans.particular}
      </td>
      <td>
        {numberToCurrency(trans.amount)} {trans.type}
      </td>
      <td>{numberToCurrency(trans.nextBalance, true)}</td>
    </tr>
  ));

  if (transactions.length === 0) {
    return <>No Transactions To Show</>;
  }

  return (
    <Table striped highlightOnHover withBorder withColumnBorders>
      <thead>{ths}</thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};
