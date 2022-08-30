import React, { useContext } from 'react';
import {
  Box,
  Grid
} from '@mui/material';
import TextField from 'components/TextField';
import {
  EstimateContentVO,
  testTypeList,
  testTypeName
} from 'admin/estimate/content/domain';
import DetailList, { DetailListProps } from 'admin/estimate/content/view/Detail/DetailList';
import CheckboxField from 'components/CheckboxField';
import {
  FormikContext,
  FormikContextType
} from 'formik';
import { FormikEditable } from 'type/Form';
import VariableList, { VariableListProps } from 'admin/estimate/content/view/Detail/VariableList';

interface Props
  extends DetailListProps, VariableListProps {
}

export default function Form(props: Props) {
  const formikContext: FormikContextType<FormikEditable<EstimateContentVO>> = useContext(FormikContext);
  const edit = formikContext?.values.edit ?? true;

  return (
    <Box sx={{
      display:  'flex',
      flexWrap: 'wrap',
      width:    '100%',
    }}>
      <Grid container spacing={2}>
        <Grid container item sm={8}>
          <Grid item sm={12}>
            <h2>실험 정보</h2>
          </Grid>
          <Grid container item sm={6}>
            <Grid item sm={12}>
              <TextField
                required
                name="name"
                label="이름"
              />
            </Grid>
            {edit && (
              <Grid item sm={12}>
                <CheckboxField
                  required
                  name="testType"
                  label="실험 타입"
                  options={testTypeList.map((item) => ({
                    key:  item as string,
                    text: testTypeName(item)
                  }))}
                />
              </Grid>)}
            {!edit && (
              <Grid item sm={12}>
                {formikContext.values.testTypeList.map(testTypeName)
                              .join(', ')}
              </Grid>
            )}
          </Grid>
          <Grid container item spacing={2}>
            <Grid item sm={12}>
              <h2>내용</h2>
            </Grid>
            <Grid item sm={12}>
              <DetailList {...props} />
            </Grid>
          </Grid>
        </Grid>
        {edit && (<VariableList {...props}/>)}
      </Grid>
    </Box>
  );
};