import React, {
  useEffect,
  useState
} from 'react';
import {
  departmentApi
} from 'department/repository/api';
import SelectField, { SelectFieldProps } from 'components/SelectField';
import { DepartmentVO } from 'department/domain/department';

const DepartmentSelector = <Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined>(props: Omit<SelectFieldProps<Multiple, DisableClearable, FreeSolo>, | 'options'>) => {
  const [list, setList] = useState<DepartmentVO[]>([]);
  useEffect(() => {
    departmentApi.getList()
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

export default DepartmentSelector;
