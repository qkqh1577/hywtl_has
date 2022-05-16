import React, { useEffect, useState } from 'react';
import DataSelector from 'components/DataSelector';
import { DataFieldProps } from 'components/DataField';
import { ListDepartment } from 'services/department/entity';
import departmentApi from 'services/department/api';

const DepartmentSelector = (props: Omit<DataFieldProps, 'type' | 'options'>) => {

  const [list, setList] = useState<ListDepartment[] | null>(null);

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
