import React, { useEffect } from 'react';
import { MenuItem, Select } from '@mui/material';
import useDepartment from 'services/department/hook';
import { departmentCategoryName } from 'services/department/data';

type Props = {
  labelId?: string;
  id: string;
  name: string;
  label: string;
  value: number | '';
  required?: boolean;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
  };
}
const DepartmentSelector = (props: Props) => {
  const {
    labelId,
    id,
    name,
    label,
    value,
    required,
    handleChange
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
      label={label}
      value={value}
      onChange={handleChange}
      required={required === true}
    >
      {departmentList.map((item) => (
        <MenuItem key={item.id} value={item.id}>{
          `${item.name}${departmentCategoryName(item.category)}`
        }</MenuItem>
      ))}
    </Select>
  );
};
export default DepartmentSelector;
