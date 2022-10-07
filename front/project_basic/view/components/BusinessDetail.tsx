import React from 'react';
import {
  BusinessInvolvedType,
  businessInvolvedTypeName,
  BusinessVO
} from 'business/domain';
import {
  Box,
  Grid
} from '@mui/material';
import TextField from 'components/TextField';
import { Formik } from 'formik';
import { FieldStatus } from 'components/DataFieldProps';

interface Props {
  involvedType: BusinessInvolvedType;
  business: BusinessVO;
}

export default function ProjectBasicBusinessDetailComponent({ involvedType, business }: Props) {
  return (
    <Formik
      initialValues={{
        involvedType:    businessInvolvedTypeName(involvedType),
        businessName:    business.name,
        businessAddress: business.address
      }}
      onSubmit={() => {}}
    >
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <TextField
              status={FieldStatus.Disabled}
              name="involvedType"
              label="관계사 구분"
            />
          </Grid>
          <Grid item sm={6}>
            <TextField
              status={FieldStatus.Disabled}
              name="businessName"
              label="업체"
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              status={FieldStatus.Disabled}
              name="businessAddress"
              label="업체 주소"
            />
          </Grid>
        </Grid>
      </Box>
    </Formik>
  );
}
