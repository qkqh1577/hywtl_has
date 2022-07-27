import React, {
  useEffect,
  useState
} from 'react';
import {
  UserShort,
  userApi
} from 'services/user';
import SelectField, { SelectFieldProps } from 'components/SelectField';

const UserSelector = <Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined>(props: Omit<SelectFieldProps<Multiple, DisableClearable, FreeSolo>, | 'options'>) => {
  const [list, setList] = useState<UserShort[] | null>(null);
  useEffect(() => {
    userApi.getAll()
           .then(setList)
           .catch(() => setList(null));
  }, []);

  return (
    <SelectField
      options={list?.map((item) => ({
        key:  item.id,
        text: item.name,
      })) ?? null}
      {...props}
    />
  );
};

export default UserSelector;
