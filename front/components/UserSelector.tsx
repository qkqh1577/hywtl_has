import React, { useEffect, useState } from 'react';
import { DataField, SelectProps } from 'components';
import { UserShort, userApi } from 'services/user';

const UserSelector = (props: Omit<SelectProps, 'type' | 'options'>) => {
  const [list, setList] = useState<UserShort[] | null>(null);
  useEffect(() => {
    userApi.getAll().then(setList).catch(() => setList(null));
  }, []);

  return (
    <DataField
      type="select"
      options={list?.map((item) => ({
        key: item.id,
        text: item.name,
      })) ?? null}
      {...props}
    />
  );
};

export default UserSelector;
