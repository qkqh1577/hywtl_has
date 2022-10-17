import React, {
  useEffect,
  useState
} from 'react';
import { userApi } from 'user/api';
import { UserVO } from 'user/domain';
import Select, { SelectProps } from 'layouts/Select';
import { MenuItem } from '@mui/material';

const UserSelector = (props: Omit<SelectProps, | 'children'>) => {
  const [list, setList] = useState<UserVO[]>([]);
  useEffect(() => {
    userApi.getList()
           .then(setList)
           .catch(() => setList([]));
  }, []);

  return (
    <Select {...props} value={list.length > 0 ? props.value : ''}>
      {props.displayEmpty && (
        <MenuItem value="">선택</MenuItem>
      )}
      {list.map(item => (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default UserSelector;
