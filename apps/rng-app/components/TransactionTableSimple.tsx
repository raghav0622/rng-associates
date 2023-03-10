import { Box, BoxProps, Button, Table } from '@mantine/core';
import {
  numberToCurrency,
  Transaction,
  useLedgerAPI,
} from '@rng-associates/accounts';
import dayjs from 'dayjs';
import React from 'react';

const RNGTD: React.FC<BoxProps> = ({ children, ...rest }) => (
  <Box component="td" {...rest}>
    {children}
  </Box>
);
export const TransactionTableSimple: React.FC<{ data: Transaction[] }> = ({
  data,
}) => {
  const { removeLedgerTransaction } = useLedgerAPI();
  return (
    <Table
      striped
      highlightOnHover
      withBorder
      withColumnBorders
      fontSize={'lg'}
    >
      <>
        <thead>
          <th>#</th>
          <th>Date</th>
          <th>Particular</th>
          <th>Amount</th>
          <th>Type</th>
          <th>Balance</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {data.map((transaction) => {
            return (
              <tr key={transaction.id}>
                <RNGTD sx={{ textAlign: 'center' }}>
                  {transaction.primaryOrder}
                </RNGTD>
                <RNGTD sx={{ textAlign: 'center' }}>
                  {dayjs(transaction.date).format('DD-MM-YYYY')}
                </RNGTD>
                <RNGTD sx={{ textAlign: 'left' }}>
                  {transaction.particular || ''}
                </RNGTD>
                <RNGTD sx={{ textAlign: 'right' }}>
                  {numberToCurrency(transaction.amount)}
                </RNGTD>
                <RNGTD sx={{ textAlign: 'center' }}>{transaction.type}</RNGTD>
                <RNGTD sx={{ textAlign: 'right' }}>
                  {numberToCurrency(transaction.primaryNextBalance, true)}
                </RNGTD>
                <RNGTD>
                  <Button
                    onClick={async () =>
                      await removeLedgerTransaction(transaction)
                    }
                  >
                    Delete
                  </Button>
                </RNGTD>
              </tr>
            );
          })}
        </tbody>
      </>
    </Table>
  );
};
