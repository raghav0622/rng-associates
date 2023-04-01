import { Button, Table } from '@mantine/core';
import {
  currency,
  fireDateString,
  useAccountCtx,
  useEntryUtils,
  useLedgerCtx,
  useRemoveTransactionAPI,
} from '@rng-associates/accounts';

export type TransactionTableProps = {
  refrence: string;
  type: 'Account' | 'Ledger';
};

export const TransactionTable: React.FC<TransactionTableProps> = ({
  refrence,
  type,
}) => {
  const { getTransactionData: getAccountData } = useAccountCtx();
  const { getTransactionData: getLedgerData } = useLedgerCtx();

  const { parseEntryToString } = useEntryUtils();
  const { mutate } = useRemoveTransactionAPI();
  const data =
    type === 'Account' ? getAccountData(refrence) : getLedgerData(refrence);

  if (!data) {
    return <></>;
  }

  const { currentBook } = data;

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
  const rows = currentBook.transactions.map((trans) => (
    <tr key={trans.id}>
      <td>{trans.order}</td>
      <td>{fireDateString(trans.date)}</td>
      <td>
        {type === 'Account'
          ? //@ts-expect-error yolo
            parseEntryToString(trans, data.data)
          : trans.particular}
      </td>
      <td>{trans.type === 'DR' ? currency(trans.amount) : '-'}</td>
      <td>{trans.type === 'CR' ? currency(trans.amount) : '-'}</td>
      <td>{currency(trans.nextBalance, true)}</td>
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

  if (currentBook.transactions.length === 0) {
    return <>No Transactions To Show</>;
  }

  return (
    <Table striped highlightOnHover withBorder withColumnBorders>
      <thead>{ths}</thead>
      <tbody>{rows}</tbody>
    </Table>
  );
};
