/* eslint-disable @typescript-eslint/no-unused-vars */
import { addDoc, updateDoc } from 'firebase/firestore';
import { useCompanyCtx } from '../../context';
import { useAccountResource } from '../../resource';
import { Account, CreateAccount } from '../../schema';

export const useCreateAccountAPI = () => {
  const { ref, getRefByID } = useAccountResource();
  const { viewFY } = useCompanyCtx();

  const mutate = async (payload: CreateAccount) => {
    const { company, nickName, type, accountNumber, bankName, ifsc } = payload;

    const { id: uid } = await addDoc(ref, {
      id: 'auto',
      company,
      nickName,
      type,
      accountNumber: accountNumber || '',
      bankName: bankName || '',
      ifsc: ifsc || '',
      books: [
        {
          deposits: 0,
          withdrawls: 0,
          fy: viewFY,
          id: viewFY.name,
          order: 0,
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
