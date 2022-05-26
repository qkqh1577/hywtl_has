import React, { useEffect, useState } from 'react';
import { DataField, SelectProps } from 'components';
import { DepartmentShort, departmentApi } from 'services/department';

const DepartmentSelector = (props: Omit<SelectProps, 'type' | 'options'>) => {

  const [list, setList] = useState<DepartmentShort[] | null>();

  useEffect(() => {
    departmentApi.getAll('as-item')
    .then(setList);
  }, []);

  return (
    <DataField
      type="select"
      options={list?.map(item => ({
        key: item.id,
        text: item.name,
      })) ?? null}
      {...props}
    />
  );
};
export default DepartmentSelector;
