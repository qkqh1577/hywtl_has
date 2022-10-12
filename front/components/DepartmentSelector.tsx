import React, {
  useEffect,
  useState
} from 'react';
import { departmentApi } from 'department/api';
import { DepartmentVO } from 'department/domain';
import Select, { SelectProps } from 'layouts/Select';
import { MenuItem } from '@mui/material';

interface Props
  extends Omit<SelectProps, |'children'> {
}

export default function DepartmentSelector(props: Props) {

  const [list, setList] = useState<DepartmentVO[]>([]);
  useEffect(() => {
    departmentApi.getList()
                 .then(setList)
                 .catch(() => setList([]));
  }, []);

  return (
    <Select
      {...props}
    >
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
