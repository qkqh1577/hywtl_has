import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { ListDepartment } from 'services/department/entity';
import departmentApi from 'services/department/api';
import { ErrorMessage } from 'formik';

type Props = {
  name: string;
  label: string;
  value: ListDepartment | null;
  required?: boolean;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
}
const DepartmentSelector = (props: Props) => {
  const {
    name,
    value,
    label,
    required,
    setFieldValue
  } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [list, setList] = useState<ListDepartment[]>([]);

  useEffect(() => {
    departmentApi.getAll().then(setList).then(() => {
      setLoading(false);
    }).catch(() => {
      setList([]);
    });
  }, []);

  return (
    <Autocomplete
      id={`params-${name}`}
      options={list}
      loading={loading}
      loadingText="불러오는 중"
      noOptionsText="검색 결과가 없습니다."
      value={loading ? null : value}
      isOptionEqualToValue={(option, value) => value && option.id === value.id}
      onChange={(e, value) => {
        setFieldValue(name, value ?? undefined);
      }}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label={label}
            variant="standard"
            required={required === true}
            helperText={<ErrorMessage name={name} />}
            fullWidth
          />
        );
      }}
    />
  );
};
export default DepartmentSelector;
