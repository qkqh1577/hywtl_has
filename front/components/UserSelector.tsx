import React, { useEffect, useState } from 'react';
import { DataFieldProps, DataSelector } from 'components';
import { UserShort, userApi } from 'services/user';

const UserSelector = (props: Omit<DataFieldProps, 'type' | 'options'>) => {
  const [list, setList] = useState<UserShort[] | null>(null);
  useEffect(() => {
    userApi.getAll().then(setList).catch(() => setList(null));
  }, []);

  return (
    <DataSelector
      options={list?.map((item) => ({
        key: item.id,
        text: item.name,
      })) ?? null}
      {...props}
    />
  );
};

export default UserSelector;
