import { APIError } from '@rng-associates/firesource';
import { addDoc, updateDoc } from 'firebase/firestore';
import { useAddTransactionInAccountAPI } from '../_Account';
import { useCompanyCtx } from '../_Context';
import { useTransaction } from './_resource';
import { CreateTransactionLink, TransactionLink } from './_schema';

export const useCreateTransactionAPI = () => {
  const { getRefByID, refWithConverter } = useTransaction();
  const { accounts } = useCompanyCtx();
  const { mutate: addTranInAc } = useAddTransactionInAccountAPI();

  const mutate = async (payload: CreateTransactionLink) => {
    const { amount, date, link, linkType, ref, type, narration, particular } =
      payload;

    if (linkType === 'none' && particular === undefined) {
      throw new APIError(
        'Provide a particular if not linking account / ledger',
        'particular'
      );
    }

    let newTransaction: TransactionLink;

    const refAccount = accounts.find((e) => e.id === ref);
    const linkAccount = link ? accounts.find((e) => e.id === link) : undefined;

    const refOrder = (refAccount?.transactions.length || 0) + 1;
    const refPreviousBalance = refAccount?.balance || 0;
    const refNextBalance =
      type === 'CR' ? refPreviousBalance + amount : refPreviousBalance - amount;

    newTransaction = {
      amount,
      date,
      link: link || '',
      linkType,
      ref,
      type,
      narration: narration || '',
      particular: particular || '',
      id: 'auto',
    };

    const { id: uid } = await addDoc(refWithConverter, newTransaction);

    await updateDoc(getRefByID(uid), {
      id: uid,
    });

    newTransaction = { ...newTransaction, id: uid };

    await addTranInAc(ref, {
      ...newTransaction,
      order: refOrder,
      prevBalance: refPreviousBalance,
      nextBalance: refNextBalance,
    });

    if (
      linkType === 'account' &&
      link !== undefined &&
      linkAccount !== undefined &&
      refAccount !== undefined
    ) {
      const linkOrder = linkAccount.transactions.length + 1;
      const linkPreviousBalance = linkAccount.balance;
      const linkTransactionType = type === 'CR' ? 'DR' : 'CR';
      const linkNextBalance =
        type === 'CR'
          ? linkPreviousBalance - amount
          : linkPreviousBalance + amount;

      await addTranInAc(link, {
        ...newTransaction,
        ref: link,
        link: ref,
        type: linkTransactionType,
        order: linkOrder,
        prevBalance: linkPreviousBalance,
        nextBalance: linkNextBalance,
      });
    }
  };

  return { mutate };
};
