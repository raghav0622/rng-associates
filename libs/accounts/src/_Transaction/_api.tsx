import { Transaction } from './_schema';

export const useCreateTransaction = () => {
  const mutate = async (payload: Transaction) => {
    return;
  };

  return { mutate };
};
