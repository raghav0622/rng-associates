import React, { useContext } from 'react';
import { useAccountDataByCompany, useCompanyDataID } from '../api';
import { Account, Company } from '../schema';
import { FinancialYear } from '../utils';

export const CompanyContext = React.createContext<
  | {
      appPath: string;
      company: Company;
      accounts: Account[];
      // accountsByFY: Account[];
      // ledgers: Ledger[];
      viewFY: FinancialYear;
      // changeFy: (name: string) => void;
    }
  | undefined
>(undefined);

export const CompanyProvider: React.FC<
  React.PropsWithChildren<{ company: string }>
> = ({ children, company: id }) => {
  const companyData = useCompanyDataID(id);

  const accounts = useAccountDataByCompany(companyData?.id || '');
  if (companyData === undefined) {
    return <>Error 404!</>;
  }

  const defaultFY = companyData.fy;

  return (
    <CompanyContext.Provider
      value={{
        appPath: `/company/${id}`,
        company: companyData,
        accounts: accounts,
        viewFY: defaultFY[defaultFY.length - 1],
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
