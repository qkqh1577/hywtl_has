import {
  Box,
  MenuItem
} from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';
import DataFieldWithLabel from 'components/DataFieldLabel';
import Select from 'layouts/Select';
import Input from 'layouts/Input';
import React, { useContext } from 'react';
import { FormikContext } from 'formik';

export default function () {

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
      <Box sx={{ width: '45%', marginRight: '55%', marginBottom: '15px' }}>
        <DataFieldWithLabel required={edit} labelWidth={60} label="송부 여부">
          <Select
            disabled={!edit}
            value={formik.values.isSent ? 'Y' : 'N'}
            onChange={(e) => {
              const value = e.target.value || undefined;
              if (value === 'Y') {
                formik.setFieldValue('isSent', true);
              }
              else if (value === 'N') {
                formik.setFieldValue('isSent', false);
              }
              else {
                formik.setFieldValue('isSent', undefined);
              }
            }}
          >
            <MenuItem value="Y">Y</MenuItem>
            <MenuItem value="N">N</MenuItem>
          </Select>
        </DataFieldWithLabel>
      </Box>
      <Box sx={{ width: '90%', marginBottom: '15px' }}>
        <DataFieldWithLabel required={edit} labelWidth={60} label="송신처">
          <Input
            disabled={!edit}
            value={formik.values.recipient ?? ''}
            onChange={(e) => {
              const value = e.target.value || undefined;
              if (formik.values.recipient !== value) {
                formik.setFieldValue('recipient', value);
              }
            }}
          />
        </DataFieldWithLabel>
      </Box>
      <Box sx={{ width: '90%', marginBottom: '15px' }}>
        <DataFieldWithLabel labelWidth={60} label="비고">
          <Input
            disabled={!edit}
            value={formik.values.note ?? ''}
            onChange={(e) => {
              const value = e.target.value || undefined;
              if (formik.values.note !== value) {
                formik.setFieldValue('note', value);
              }
            }}
          />
        </DataFieldWithLabel>
      </Box>
    </Box>
  );
}