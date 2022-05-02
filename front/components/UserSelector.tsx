import React, { useEffect, useState } from 'react';
import { ListUser } from 'services/user/entity';
import userApi from 'services/user/api';
import { DataField, DataFieldProps } from 'components/index';

const UserSelector = (props: Omit<DataFieldProps, 'type' | 'options'>) => {
  const [userList, setUserList] = useState<ListUser[]>([]);
  useEffect(() => {
    userApi.getAll().then(setUserList);
  }, []);

  return (
    <DataField
      type="select"
      options={userList.map((item) => ({
        key: item.id,
        text: item.name,
      }))}
      {...props}
    />
  );
};

export default UserSelector;
