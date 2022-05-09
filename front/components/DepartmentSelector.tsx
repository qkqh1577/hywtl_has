import React, { useEffect, useState } from 'react';
import { ListDepartment } from 'services/department/entity';
import departmentApi from 'services/department/api';
import DataSelector from 'components/DataSelector';
import { DataFieldProps } from 'components/DataField';

const DepartmentSelector = (props: Omit<DataFieldProps, 'type' | 'options'>) => {
  const [list, setList] = useState<ListDepartment[] | null>(null);

  useEffect(() => {
    departmentApi.getAll().then(setList).catch(() => setList(null));
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
