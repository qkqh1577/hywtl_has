import { Box } from '@mui/material';
import { ColorPalette } from 'assets/theme';
import TextBox from 'layouts/Text';
import { toAmountKor } from 'util/NumberUtil';
import React, { useContext } from 'react';
import { FormikContext } from 'formik';

export default function () {
  const formik = useContext(FormikContext);
  const plan = formik.values.estimate?.plan ?? {};
  return (
    <Box sx={{
      width:          '100%',
      display:        'flex',
      flexWrap:       'nowrap',
      border:         `1px solid ${ColorPalette._e4e9f2}`,
      borderRadius:   '5px',
      margin:         '10px 0px',
      padding:        '10px',
      justifyContent: 'center',
      alignItems:     'center',
    }}>
      <TextBox variant="body2" sx={{ marginRight: '4px' }}>합계(부가세 별도):</TextBox>
      <TextBox variant="body1" sx={{ marginRight: '4px' }}>{toAmountKor(plan.totalAmount ?? 0)}</TextBox>
      <TextBox variant="body1">{`(￦${(plan.totalAmount ?? 0).toLocaleString()})`}</TextBox>
    </Box>
  );
}