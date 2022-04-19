import React, { useEffect } from 'react';
import { MenuItem, Select } from '@mui/material';
import useDepartment from 'services/department/hook';

type Props = {
  labelId?: string;
  id: string;
  name: string;
  value: number | '';
  required?: boolean;
  onChange: (departmentId: number | '') => void;
}
const DepartmentSelector = (props: Props) => {
  const {
    labelId,
    id,
    name,
    value,
    required,
    onChange
  } = props;
  const {
    departmentState: {
      list: departmentList
    }, getAll: getAllDepartments
  } = useDepartment();

  useEffect(() => {
    getAllDepartments();
  }, []);

  return (
    <Select
      labelId={labelId}
      id={id}
      name={name}
      value={value}
      onChange={(e) => {
        const { value } = e.target;
        if (typeof value === 'number') {
          onChange(value as number);
        } else {
          onChange('');
        }
      }}
      required={required === true}
    >
      {departmentList.map((item) => (
        <MenuItem key={item.id} value={item.id}>
          {item.name}
        </MenuItem>
      ))}
    </Select>
  );
};
export default DepartmentSelector;
