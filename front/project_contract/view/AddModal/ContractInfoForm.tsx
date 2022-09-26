import React from 'react';
import { FormikLayoutProps } from 'layouts/PageLayout';
import { difficultyList } from 'project_complex/domain';
import SelectField from 'components/SelectField';
import TextField from 'components/TextField';
import { ColorPalette } from 'app/view/App/theme';
import { Box } from '@mui/material';

export default function (props: FormikLayoutProps<any>) {
  const { formik } = props;
  return <Box sx={{
    border:       `1px solid ${ColorPalette._e4e9f2}`,
    padding:      '10px',
    marginBottom: '15px',
    width:        '100%',
  }}>
    <SelectField
      name="isSent"
      label="송부여부"
      defaultValue={'N'}
      options={['N', 'Y']}
    />
    <TextField
      name="recipient"
      label="송신처"
    />
    <TextField
      name="note"
      label="비고"
    />
  </Box>;
};
