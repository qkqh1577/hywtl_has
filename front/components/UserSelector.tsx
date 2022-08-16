import React, {
  useEffect,
  useState
} from 'react';
import {
  userApi
} from 'user/api';
import SelectField, { SelectFieldProps } from 'components/SelectField';
import { UserVO } from 'user/domain';

const UserSelector = <Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined>(props: Omit<SelectFieldProps<Multiple, DisableClearable, FreeSolo>, | 'options'>) => {
  const [list, setList] = useState<UserVO[]>([]);
  useEffect(() => {
    userApi.getList()
           .then(setList)
           .catch(() => setList([]));
  }, []);

  return (
    <SelectField
      options={list.map((item) => ({
        key:  item.id as number,
        text: item.name,
      }))}
      {...props}
    />
  );
};

export default UserSelector;
