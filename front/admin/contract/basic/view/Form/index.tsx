import React, { useContext } from 'react';

import ContractorForm from 'admin/contract/basic/view/Form/ContractorForm';
import BasicContractForm from 'admin/contract/basic/view/Form/BasicContractForm';
import { Box } from '@mui/material';
import Input from 'layouts/Input';
import { FormikContext } from 'formik';

export interface Props {
}

export default function (props: Props) {
  const formik = useContext(FormikContext);

  return (
    <Box sx={{
      width:    '100%',
      display:  'flex',
      flexWrap: 'wrap',
    }}>
      <BasicContractForm {...props} />
      <Box sx={{
        display: 'flex',
        width:   '100%',
        padding: '20px 0',
      }}>
        <Input
          multiline
          variant="outlined"
          value={formik.values.description ?? ''}
          onChange={(e) => {
            const value = e.target.value || undefined;
            if (formik.values.description !== value) {
              formik.setFieldValue('description', value);
            }
          }}
        />
      </Box>
      <ContractorForm {...props} />
    </Box>
  );
};
