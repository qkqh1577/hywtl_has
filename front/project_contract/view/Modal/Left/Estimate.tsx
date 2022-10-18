import { Box } from '@mui/material';
import React, { useContext } from 'react';
import { ColorPalette } from 'app/view/App/theme';
import TextBox from 'layouts/Text';
import Button from 'layouts/Button';
import { FormikContext } from 'formik';

export default function ProjectContractModalLeftEstimateForm() {

  const formik = useContext(FormikContext);
  const edit = formik.values.edit;

  return (
    <Box sx={{
      display:      'flex',
      flexWrap:     'wrap',
      width:        '100%',
      border:       `1px solid ${ColorPalette._e4e9f2}`,
      borderRadius: '5px',
      height:       '200px',
      margin:       '10px 0px',
      padding:      '10px',
    }}>
      <Box sx={{
        display:        'flex',
        flexWrap:       'nowrap',
        width:          '100%',
        justifyContent: 'space-between',
      }}>
        <Box sx={{ width: '80%' }}>
          {formik.values.estimate && (
            <TextBox variant="body4">
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

      <Box>
        견적 일자
      </Box>
      <Box>
        합계
      </Box>
      <Box>
        test
      </Box>
    </Box>
  );
}