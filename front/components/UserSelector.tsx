import React, { useEffect, useState } from 'react';
import { ListUser } from 'services/user/entity';
import userApi from 'services/user/api';
import { DataField } from 'components/index';

type Props = {
  name: string;
  label: string;
  value: string | number;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  required?: boolean;
  disabled?: boolean;
  helperText?: string | React.ReactNode;
};
const UserSelector = (props: Props) => {
  const [userList, setUserList] = useState<ListUser[]>([]);
  useEffect(() => {
    userApi.getAll().then(setUserList);
  }, []);

  return (
    <DataField
      type="select"
      options={userList.map((item) => ({
        key: item.id,
        value: item.name,
      }))}
      {...props}
    />
  );
};

export default UserSelector;
