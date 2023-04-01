/* eslint-disable @typescript-eslint/no-unused-vars */
import { addDoc, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { useFirestoreCollectionData } from 'reactfire';
import { useCompanyResource } from '../resource';
import { Company, CreateCompany } from '../schema';
import { APIError } from '../useCreateResource';

export const useCreateCompanyAPI = () => {
  const { ref, getRefByID } = useCompanyResource();

  const data = useCompanyDataByUser('super-user');

  const mutate = async ({ name, startYear }: CreateCompany) => {
    if (name === 'undefined') {
      throw new APIError('Please provide valid name for Company!', 'name');
    }

    if (data.length > 0) {
      const isDuplicateName =
        data.find((val) => val.name === name) !== undefined;

      if (isDuplicateName) {
        throw new APIError('Please provide unique name for Company!', 'name');
      }
    }

    const { id: uid } = await addDoc(ref, {
      id: 'auto',
      owner: 'super-user',
      name,
      fy: [
        {
          name: `FY ${startYear}-${startYear + 1}`,
          start: new Date(startYear, 3, 1),
          end: new Date(startYear + 1, 2, 31),
          locked: false,
        },
      ],
    } as Company);

    await updateDoc(getRefByID(uid), {
      id: uid,
    });
  };

  return { mutate };
};

export const useCompanyDataByUser = (user: string) => {
  const { ref } = useCompanyResource();

  const q = query(ref, where('owner', '==', user), orderBy('name', 'asc'));

  const { data } = useFirestoreCollectionData(q, { suspense: true });

  if (data.length === 0) {
    return [] as Company[];
  }

  return data as Company[];
};

export const useCompanyDataID = (id: string) => {
  const { ref } = useCompanyResource();

  const q = query(ref, where('id', '==', id));

  const { data } = useFirestoreCollectionData(q, { suspense: true });

  if (data.length === 0) {
    return undefined;
  }

  return data[0] as Company;
};
