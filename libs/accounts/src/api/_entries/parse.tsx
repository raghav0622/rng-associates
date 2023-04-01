import { Stack, Text } from '@mantine/core';
import { Account, Transaction } from '../../schema';
import { useAccountCtx } from '../_account';
import { useLedgerCtx } from '../_ledger';
export const useEntryUtils = () => {
  const { getTransactionData: getAccountData } = useAccountCtx();
  const { getTransactionData: getLedgerData } = useLedgerCtx();

  const parseAccountEntryToString = (entry: Transaction, viewer: Account) => {
    let prefix = '';
    let content = '';

    if (entry.linkType !== 'no-link' && entry.linkRef) {
      if (viewer.type === 'Cash') {
        if (entry.linkType === 'account-to-ledger') {
          if (entry.type === 'CR') {
            prefix = 'Payment From ';
          } else {
            prefix = 'Payment To ';
          }
        } else {
          if (entry.type === 'CR') {
            prefix = 'Withdrawl From ';
          } else {
            prefix = 'Deposit To ';
          }
        }
      } else {
        const isSecondaryAccountCash =
          getAccountData(entry.linkRef)?.data.type === 'Cash';

        if (entry.linkType === 'account-to-account' && isSecondaryAccountCash) {
          if (entry.type === 'CR') {
            prefix = 'Cash Deposit From ';
          } else {
            prefix = 'Cash Withdrawl To ';
          }
        } else {
          if (entry.type === 'CR') {
            prefix = 'Credit From ';
          } else {
            prefix = 'Debit To ';
          }
        }
      }
    }

    if (entry.linkType === 'account-to-account' && entry.linkRef) {
      const secondary = getAccountData(entry.linkRef);

      if (secondary) {
        content = secondary.data.nickName;
      }
    } else if (entry.linkType === 'account-to-ledger' && entry.linkRef) {
      const secondary = getLedgerData(entry.linkRef);

      if (secondary) {
        content = secondary.data.name;
      }
    }

    return (
      <Stack spacing="none">
        {prefix !== '' && content !== '' ? (
          <Text size="sm">
            {prefix} <b>{content}</b>
          </Text>
        ) : null}
        {entry.particular ? (
          <Text italic size={'xs'}>
            {entry.particular}
          </Text>
        ) : null}
        {entry.bankNarration ? (
          <Text italic size={'xs'}>
            {entry.bankNarration}
          </Text>
        ) : null}
      </Stack>
    );
  };

  return { parseEntryToString: parseAccountEntryToString };
};
