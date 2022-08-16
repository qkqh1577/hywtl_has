import React, {
  useEffect,
  useState
} from 'react';
import {
  departmentApi
} from 'department/api';
import SelectField, { SelectFieldProps } from 'components/SelectField';
import { DepartmentVO } from 'department/domain';

const DepartmentSelector = (props: Omit<SelectFieldProps, | 'options'>) => {
  const [list, setList] = useState<DepartmentVO[]>([]);
  useEffect(() => {
    departmentApi.getList()
                 .then(setList)
                 .catch(() => setList([]));
  }, []);

  // TODO: remove ancestor
  // options={[
  //   {
  //     key:  'root',
  //     text: '최상위'
  //   }, ...(
  //     detail ? list
  //     .filter((department) => department.id !== detail.id)
  //     .filter((department) => {
  //       if (!department.parentId) {
  //         return true;
  //       }
  //       const getAncestorIdList = (sourceId: number,
  //                                  temp: number[]
  //       ): number[] => {
  //         const target: DepartmentShort | undefined = list.find(item => item.id === sourceId);
  //         if (target) {
  //           if (target.parentId) {
  //             return [target.id, ...getAncestorIdList(target.parentId, temp)];
  //           }
  //           return [target.id, ...temp];
  //         }
  //         return temp;
  //       };
  //
  //       const ancestorIdList = getAncestorIdList(department.parentId, []);
  //       return !ancestorIdList.includes(detail.id);
  //     }) : list).map((department) => ({
  //     key:  department.id,
  //     text: department.name
  //   }))
  // ]}

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
