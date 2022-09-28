import CheckboxField, { CheckboxFieldProps } from 'components/CheckboxField';
import { Option } from 'components/DataFieldProps';
import React, {
  useEffect,
  useState
} from 'react';
import { departmentApi } from 'department/api';

export default function DepartmentCheckboxField(props: Omit<CheckboxFieldProps, |'options'>) {

  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    departmentApi.getList()
                 .then((list) => list.map((item) => ({
                   key:  item.id,
                   text: item.name
                 }) as Option))
                 .then(setOptions);
  }, []);

  return (
    <CheckboxField
      {...props}
      options={options}
    />
  );
}