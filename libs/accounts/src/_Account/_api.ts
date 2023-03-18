/* eslint-disable @typescript-eslint/no-unused-vars */
import { SelectItem } from '@mantine/core';
import {
  addDoc,
  arrayUnion,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useFirestoreCollectionData } from 'reactfire';
import { useCompanyCtx } from '../_Context';
import { AccountTransaction } from '../_Transaction';
import { useAccount } from './_resource';
import { Account, CreateAccount } from './_schema';

export const useCreateAccountAPI = () => {
  const { refWithConverter, getRefByID } = useAccount();

  const mutate = async (payload: CreateAccount) => {
    const { nickName, owner, type } = payload;
    // if (data.length > 0) {
    //   const isDuplicateName =
    //     data.filter((existing) => existing.name === name).length > 0;

    //   if (isDuplicateName) {
    //     throw new APIError('Please provide unique name for entity!', 'name');
    //   }
    // }

    const { id: uid } = await addDoc(refWithConverter, {
      ...payload,
      transactions: [],
      id: '',
    });

    updateDoc(getRefByID(uid), {
      id: uid,
    });

    return { id: uid, ...payload } as Account;
  };
  return { mutate };
};

export const useAccountDataByOwner = (owner: string) => {
  const { ref } = useAccount();

  const q = query(ref, where('owner', '==', owner), orderBy('nickName', 'asc'));
  const { data } = useFirestoreCollectionData(q, { suspense: true });

  if (data.length === 0) {
    return [] as Account[];
  }

  const accs = (data as Account[]).map((acc) => {
    return {
      ...acc,
    };
  });

  return accs;
};

export const useAccountDataByID = () => {
  const { accounts } = useCompanyCtx();
  const getData = (id: string) => {
    const accDetails = accounts.find((e) => e.id === id);
    if (accDetails === undefined) {
      throw new Error('bai bai');
    }
    return accDetails;
  };

  return { getData };
};

export const useAddTransactionInAccountAPI = () => {
  const { getRefByID } = useAccount();

  const mutate = async (ref: string, transaction: AccountTransaction) => {
    await updateDoc(getRefByID(ref), {
      transactions: arrayUnion(transaction),
    });
  };

  return { mutate };
};

export const useAccountOptions = () => {
  const { accounts } = useCompanyCtx();

  const options = accounts.map((acc) => {
    return {
      value: acc.id,
      label: acc.nickName,
      group: 'Accounts',
    } as SelectItem;
  });

  return options;
};

export const useTransactionParse = () => {
  const { getData } = useAccountDataByID();
  const { accounts } = useCompanyCtx();
  const isCashAccount = (id: string) =>
    accounts.find((a) => a.type === 'Cash' && a.id === id);

  const parseDefaultNarration = (viewer: string, trans: AccountTransaction) => {
    if (trans.link && trans.linkType === 'account' && viewer === trans.ref) {
      const linkAcName = getData(trans.link).nickName;

      if (isCashAccount(trans.ref)) {
        return trans.type === 'CR'
          ? `Cash Withdrawl from ${linkAcName}`
          : `Cash Deposit to ${linkAcName}`;
      }
      if (isCashAccount(trans.link)) {
        return trans.type === 'CR'
          ? `Cash Deposit (${linkAcName})`
          : `Cash Withdrawl (${linkAcName})`;
      }

      return trans.type === 'CR'
        ? `Transfer from ${linkAcName}`
        : `Transfer to ${linkAcName}`;
    }

    return '';
  };

  // const parseTransactionType = (viewer: string, trans: AccountTransaction) => {
  //   if (trans.linkType === 'account') {
  //     if (viewer === trans.ref) {
  //       return trans.type;
  //     } else if (viewer === trans.link) {
  //       return trans.type === 'CR' ? `DR` : `CR`;
  //     }
  //   }
  // };

  return { parseDefaultNarration };
};
