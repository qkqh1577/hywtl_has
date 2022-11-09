import React, { useContext } from 'react';

import ContractorForm from 'admin/contract/basic/view/Form/ContractorForm';
import BasicContractForm from 'admin/contract/basic/view/Form/BasicContractForm';
import { Box } from '@mui/material';
import Input from 'layouts/Input';
import { FormikContext } from 'formik';
import { ColorPalette } from 'assets/theme';

export default function () {
  const formik = useContext(FormikContext);

  return (
    <Box sx={{
      width:    '100%',
      display:  'flex',
      flexWrap: 'wrap',
    }}>
      <BasicContractForm />
      <Box sx={{
        display: 'flex',
        width:   '100%',
        padding: '10px 0',
        border:  `1px solid ${ColorPalette._e4e9f2}`,
        mt:      1,
        mb:      1
      }}>
        <Input
          multiline
          key={formik.values.description}
          variant="outlined"
          defaultValue={formik.values.description ?? ''}
          onBlur={(e) => {
            const value = e.target.value || undefined;
            if (formik.values.description !== value) {
              formik.setFieldValue('description', value);
            }
          }}
        />
      </Box>
      <ContractorForm />
    </Box>
  );
};
