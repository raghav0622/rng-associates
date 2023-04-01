/* eslint-disable @typescript-eslint/no-unused-vars */
import { addDoc, updateDoc } from 'firebase/firestore';
import { useCompanyCtx } from '../../context';
import { useAccountResource } from '../../resource';
import { Account, CreateAccount } from '../../schema';
import { cleanEmpty } from '../../utils';

export const useCreateAccount = () => {
  const { ref, getRefByID } = useAccountResource();
  const { viewFY } = useCompanyCtx();

  const mutate = async (payload: CreateAccount) => {
    console.log(payload);
    const { id: uid } = await addDoc(ref, {
      id: 'auto',
      ...cleanEmpty(payload),
      books: [
        {
          deposits: 0,
          withdrawls: 0,
          id: viewFY.name,
          transactions: [],
        },
      ],
    } as Account);

    await updateDoc(getRefByID(uid), {
      id: uid,
    });
  };

  return { mutate };
};
