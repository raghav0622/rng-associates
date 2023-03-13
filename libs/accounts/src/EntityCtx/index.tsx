import React, { useContext } from 'react';
import { useEntityDataById } from '../Entity/api';
import { Entity } from '../Entity/schema';
import { Account, useAccountDataByOwner } from '../_Account';

export const EntityContext = React.createContext<
  { entity: Entity; accounts: Account[] } | undefined
>(undefined);

export const EntityProvider: React.FC<
  React.PropsWithChildren<{ id: string }>
> = ({ children, id }) => {
  const entity = useEntityDataById(id);
  const accounts = useAccountDataByOwner(id);
  return (
    <EntityContext.Provider value={{ entity, accounts }}>
      {children}
    </EntityContext.Provider>
  );
};

export const useEntityCtx = () => {
  const val = useContext(EntityContext);

  if (val === undefined) {
    throw new Error('Not valid entity / company');
  }

  return val;
};
