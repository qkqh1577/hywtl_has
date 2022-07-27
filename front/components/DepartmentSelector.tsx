import React, {
  useEffect,
  useState
} from 'react';
import {
  DepartmentShort,
  departmentApi
} from 'services/department';
import SelectField, { SelectFieldProps } from 'components/SelectField';

const DepartmentSelector = <Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined>(props: Omit<SelectFieldProps<Multiple, DisableClearable, FreeSolo>, | 'options'>) => {
  const [list, setList] = useState<DepartmentShort[] | null>();

  useEffect(() => {
    departmentApi.getAll('as-item')
                 .then(setList);
  }, []);

  return (
    <SelectField
      options={list?.map(item => ({
        key: item.id,
        text: item.name,
      })) ?? null}
      {...props}
    />
  );
};
export default DepartmentSelector;
