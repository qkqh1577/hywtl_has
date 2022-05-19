import React, { useEffect, useState } from 'react';
import {
  DataFieldProps,
  DataSelector,
} from 'components';
import { ListDepartment, departmentApi } from 'services/department';

const DepartmentSelector = (props: Omit<DataFieldProps, 'type' | 'options'>) => {

  const [list, setList] = useState<ListDepartment[] | null>();

  useEffect(() => {
    departmentApi.getAll('as-item')
    .then(setList);
  }, []);

  return (
    <DataSelector
      options={list?.map(item => ({
        key: item.id,
        text: item.name,
      })) ?? null}
      {...props}
    />
  );
};
export default DepartmentSelector;
