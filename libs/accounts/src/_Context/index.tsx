import dayjs from 'dayjs';
import React, { useContext, useMemo, useState } from 'react';
import { firstoreTimestampToDate } from '..';
import { useEntityDataById } from '../Entity/api';
import { Entity, FinancialYear } from '../Entity/schema';
import { Account, useAccountDataByOwner } from '../_Account';
import { Ledger } from '../_Ledger';
import { useLedgerDataByCompany } from '../_Ledger/_api';

export const CompanyContext = React.createContext<
  | {
      company: Entity;
      accounts: Account[];
      ledgers: Ledger[];
      appPath: string;
      fy: FinancialYear;
      changeFy: (name: string) => void;
    }
  | undefined
>(undefined);

export const CompanyProvider: React.FC<
  React.PropsWithChildren<{ id: string; appPath: string }>
> = ({ children, id, appPath }) => {
  const company = useEntityDataById(id);
  const [fy, setFy] = useState<FinancialYear | undefined>(company?.fy[0]);
  const accounts = useAccountDataByOwner(id);

  const ledgers = useLedgerDataByCompany(id);

  const accountsByFY = useMemo(() => {
    return accounts.map((acc) => {
      const transactionsInViewerFY = fy
        ? acc.transactions.filter((t) => {
            const date = dayjs(firstoreTimestampToDate(t.date));

            const isValid =
              date.isSame(fy.start) ||
              date.isSame(fy.end) ||
              (date.isAfter(fy.start) && date.isBefore(fy.end));

            return isValid;
          })
        : acc.transactions;
      return {
        ...acc,
        transactions: transactionsInViewerFY,
      };
    });
  }, [accounts, fy]);

  if (company === undefined) {
    return <>No Entity</>;
  }

  const changeFy = (name: string) => {
    const fy = company.fy.find((i) => i.name === name);
    if (fy) {
      setFy(fy);
    }
    return;
  };

  return (
    <CompanyContext.Provider
      value={{
        company,
        accounts: accountsByFY,
        appPath,
        ledgers,
        //@ts-expect-error yolo
        fy,
        changeFy,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompanyCtx = () => {
  const val = useContext(CompanyContext);

  if (val === undefined) {
    throw new Error('Not valid entity / company');
  }

  return val;
};
