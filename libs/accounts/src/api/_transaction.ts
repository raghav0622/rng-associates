/* eslint-disable @typescript-eslint/no-unused-vars */
import { addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { useTransactionEntryResource } from '../resource';
import { CreateTransaction, Transaction, TransactionEtry } from '../schema';
import { cleanEmpty } from '../utils';
import {
  useAddTransactionInAccountAPI,
  useRemoveTransactionInAccountAPI,
} from './_account';

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
  const { mutate: addTransactionInAccount } = useAddTransactionInAccountAPI();
  const { create } = useTransactionEntryAPI();
  const mutate = async (payload: CreateTransaction) => {
    const sanitizedPayload = cleanEmpty({
      ...payload,
      particular: payload.particular || '',
      bankNarration: payload.bankNarration || '',
      linkType: payload.linkType || 'no-link',
      linkBook: payload.linkType !== 'no-link' && payload.book,
      linkRef: payload.linkType !== 'no-link' && payload.linkRef,
    }) as CreateTransaction;

    const { id } = await create(sanitizedPayload);

    await addTransactionInAccount({ ...payload, id });

    if (
      sanitizedPayload.linkType === 'account-to-account' &&
      sanitizedPayload.linkRef
    ) {
      await addTransactionInAccount({
        ...payload,
        id,
        account: sanitizedPayload.linkRef,
        linkRef: sanitizedPayload.account,
        type: sanitizedPayload.type === 'CR' ? 'DR' : 'CR',
      });
    }
  };

  return { mutate };
};

export const useRemoveTransactionAPI = () => {
  const { mutate: removeTransactionInAccount } =
    useRemoveTransactionInAccountAPI();
  const { remove } = useTransactionEntryAPI();

  const mutate = async (payload: Transaction) => {
    await remove(payload);

    await removeTransactionInAccount(payload.account, payload.id);
    if (payload.linkType === 'account-to-account' && payload.linkRef) {
      await removeTransactionInAccount(payload.linkRef, payload.id);
    }
  };

  return { mutate };
};
