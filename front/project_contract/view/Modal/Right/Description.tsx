import { Box } from '@mui/material';
import React, { useContext } from 'react';
import { FormikContext } from 'formik';
import Input from 'layouts/Input';
import { ColorPalette } from 'assets/theme';

export default function () {

  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  const basic = formik.values.basic ?? {};

  return (
    <Box sx={{
      width:        '100%',
      display:      'flex',
      flexWrap:     'nowrap',
      border:       `1px solid ${ColorPalette._e4e9f2}`,
      borderRadius: '5px',
      margin:       '10px 0px',
      padding:      '10px',
    }}>
      <Input
        multiline
        variant="outlined"
        key={basic.description}
        readOnly={!edit}
        defaultValue={basic.description ?? ''}
        onBlur={(e) => {
          const value = e.target.value || undefined;
          if (basic.description !== value) {
            formik.setFieldValue('basic.description', value);
          }
        }}
      />
    </Box>
  );
}