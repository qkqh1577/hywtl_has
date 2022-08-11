import React, {
  useContext,
  useEffect
} from 'react';
import { Grid } from '@mui/material';
import TextField from 'components/TextField';
import DepartmentSelector from 'components/DepartmentSelector';
import SelectField from 'components/SelectField';
import {
  departmentCategoryList,
  departmentCategoryName,
  DepartmentVO
} from 'department/domain';
import {
  FormikContext,
  FormikContextType
} from 'formik';
import { FieldStatus } from 'components/DataFieldProps';


function DepartmentParentSelector() {
  const formikContext: FormikContextType<DepartmentVO> = useContext(FormikContext);
  const status = formikContext?.values.category === 'COMPANY' ? FieldStatus.Disabled : undefined;
  const required = formikContext?.values.category !== 'COMPANY';
  const values = formikContext?.values ?? {};

  useEffect(() => {
    if (values.category === 'COMPANY') {
      formikContext.setFieldValue('parentId', '');
    }
  }, [values.category]);

  return (
    <DepartmentSelector
      name="parentId"
      label="상위 조직"
      status={status}
      required={required}
    />
  );
}

export default function () {

  return (
    <Grid container spacing={2}>
      <Grid item sm={12}>
        <TextField required
          name="name"
          label="조직명"
        />
      </Grid>
      <Grid item sm={12}>
        <SelectField
          required
          name="category"
          label="조직 유형"
          options={departmentCategoryList.map((category) => ({
            key:  category as string,
            text: departmentCategoryName(category)
          }))}
        />
      </Grid>
      <Grid item sm={12}>
        <DepartmentParentSelector />
      </Grid>
      <Grid item sm={12}>
        <TextField
          name="memo"
          label="설명"
        />
      </Grid>
    </Grid>
  );
}