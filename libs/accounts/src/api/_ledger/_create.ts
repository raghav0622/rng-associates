/* eslint-disable @typescript-eslint/no-unused-vars */
import { addDoc, updateDoc } from 'firebase/firestore';
import { useCompanyCtx } from '../../context';
import { useLedgerResource } from '../../resource';
import { CreateLedger, Ledger } from '../../schema';

export const useCreateLedger = () => {
  const { ref, getRefByID } = useLedgerResource();
  const { viewFY } = useCompanyCtx();

  const mutate = async (payload: CreateLedger) => {
    const { company, category, name, particular, prevBalance } = payload;

    const { id: uid } = await addDoc(ref, {
      id: 'auto',
      company,
      name,
      category,
      books: [
        {
          deposits: 0,
          withdrawls: 0,
          id: viewFY.name,
          transactions: [],
        },
      ],
    } as Ledger);

    await updateDoc(getRefByID(uid), {
      id: uid,
    });
  };

  return { mutate };
};
