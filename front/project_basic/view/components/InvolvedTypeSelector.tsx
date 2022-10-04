import { Box } from '@mui/material';
import React from 'react';
import SelectField from 'components/SelectField';
import { Formik } from 'formik';
import {
  BusinessInvolvedType,
  businessInvolvedTypeList,
  businessInvolvedTypeName
} from 'business/domain';

interface Props {
  initInvolvedType?: BusinessInvolvedType;
  handleChangeInvolvedType?: (e) => void;
  hidden?: boolean;
}

export default function ProjectBasicInvolvedTypeSelectorComponent({ initInvolvedType, handleChangeInvolvedType, hidden }: Props) {
  return (
    <Box sx={{ width: '33%', visibility: hidden ? 'hidden' : '' }}>
      <Formik
        initialValues={{
          involvedType: initInvolvedType || '',
        }}
        onSubmit={() => {}}>
        <SelectField
          name="involvedType"
          label="관계사 구분"
          options={businessInvolvedTypeList.map((item) => ({
            key:  item as string,
            text: businessInvolvedTypeName(item),
          }))}
          onChange={handleChangeInvolvedType}
        />
      </Formik>
    </Box>
  );
}
