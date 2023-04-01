/* eslint-disable @typescript-eslint/no-unused-vars */
import { addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useTransactionEntryResource } from '../resource';
import { CreateTransaction, Transaction, TransactionEtry } from '../schema';
import { cleanEmpty } from '../utils';
import { useRemoveEntryInAccount } from './_account';
import { useAddEntry } from './_entries';
import { useRemoveEntryInLedger } from './_ledger';

export const useTransactionEntryAPI = () => {
  const { ref, refWithConverter, getRefByID } = useTransactionEntryResource();

  const create = async (payload: Omit<TransactionEtry, 'id'>) => {
    const data = cleanEmpty({ ...payload, id: 'auto' }) as TransactionEtry;
    const { id } = await addDoc(refWithConverter, data);
    await updateDoc(getRefByID(id), {
      id: id,
    });
    return { ...data, id } as TransactionEtry;
  };

  const remove = async (payload: Transaction) => {
    const docRef = getRefByID(payload.id);
    if (docRef.id) {
      await deleteDoc(docRef);
    }
  };

  return { create, remove };
};

export const useCreateTransactionAPI = () => {
  const { mutate: addTransactionInAccount } = useAddEntry('Account');
  const { mutate: addTransactionInLedger } = useAddEntry('Ledger');
  const { create } = useTransactionEntryAPI();
  const mutate = async (payload: CreateTransaction) => {
    const { id } = await create(cleanEmpty(payload));

    await addTransactionInAccount({ ...payload, id });

    if (payload.linkType === 'account-to-account' && payload.linkRef) {
      await addTransactionInAccount({
        ...payload,
        id,
        account: payload.linkRef,
        linkRef: payload.account,
        type: payload.type === 'CR' ? 'DR' : 'CR',
      });
    }
    if (payload.linkType === 'account-to-ledger' && payload.linkRef) {
      await addTransactionInLedger({ ...payload, id });
    }
  };

  return { mutate };
};

export const useRemoveTransactionAPI = () => {
  const { mutate: removeTransactionInAccount } = useRemoveEntryInAccount();
  const { mutate: removeTransactionInLedger } = useRemoveEntryInLedger();
  const { remove } = useTransactionEntryAPI();

  const mutate = async (payload: Transaction) => {
    await removeTransactionInAccount(payload.account, payload.id);

    if (payload.linkType === 'account-to-account' && payload.linkRef) {
      await removeTransactionInAccount(payload.linkRef, payload.id);
    }

    if (payload.linkType === 'account-to-ledger' && payload.linkRef) {
      await removeTransactionInLedger(payload.linkRef, payload.id);
    }

    await remove(payload);
  };

  return { mutate };
};
