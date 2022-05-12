import React, { useEffect, useState } from 'react';
import { ListUser } from 'services/user/entity';
import userApi from 'services/user/api';
import { DataFieldProps } from 'components/index';
import DataSelector from 'components/DataSelector';

const UserSelector = (props: Omit<DataFieldProps, 'type' | 'options'>) => {
  const [list, setList] = useState<ListUser[] | null>(null);
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
