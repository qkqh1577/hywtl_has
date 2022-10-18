import { Box } from '@mui/material';
import React, { useContext } from 'react';
import TextBox from 'layouts/Text';
import Button from 'layouts/Button';
import { FormikContext } from 'formik';
import Plan from './Plan';
import Amount from './Amount';
import Test from './Test';

export default function ProjectContractModalLeftEstimateForm() {

  const formik = useContext(FormikContext);
  const edit = formik.values.edit;

  return (
    <Box sx={{
      display:  'flex',
      flexWrap: 'wrap',
      width:    '100%',
    }}>
      <Box sx={{
        display:        'flex',
        flexWrap:       'nowrap',
        width:          '100%',
        justifyContent: 'space-between',
        margin:         '10px 0px',
      }}>
        <Box sx={{ width: '80%' }}>
          {formik.values.estimate && (
            <TextBox variant="body1">
              [{formik.values.estimate.code}]
            </TextBox>
          )}
        </Box>
        <Box sx={{ width: '14%' }}>
          {edit && (
            <Button
              shape="small"
              onClick={() => {
                formik.setFieldValue('openEstimateModal', true);
              }}>
              견적서 선택
            </Button>
          )}
        </Box>
      </Box>
      <Plan />
      <Amount />
      <Test />
    </Box>
  );
}