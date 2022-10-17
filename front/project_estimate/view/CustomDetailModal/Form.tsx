import {
  Box,
  MenuItem
} from '@mui/material';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';
import { projectEstimateTypeName } from 'project_estimate/domain';
import Select from 'layouts/Select';
import BusinessSelector from 'components/BusinessSelector';
import UploadField from 'components/UploadField';
import React, { useContext } from 'react';
import { FormikContext } from 'formik';
import { fileToView } from 'file-item';

export default function () {

  const formik = useContext(FormikContext);
  const edit = formik.values.edit;

  return (
    <Box sx={{
      width:          '100%',
      display:        'flex',
      flexWrap:       'wrap',
      justifyContent: 'space-between',
      '& > div':      {
        display:      'flex',
        flexWrap:     'nowrap',
        marginBottom: '15px',
      }
    }}>
      <Box sx={{ width: '45%' }}>
        <DataFieldWithLabel label="견적 구분" labelPosition="top">
          <Input
            disabled={edit}
            value={formik.values.type ? projectEstimateTypeName(formik.values.type) : ''}
          />
        </DataFieldWithLabel>
      </Box>
      <Box sx={{ width: '45%' }}>
        <DataFieldWithLabel label="견적 번호" labelPosition="top">
          <Input
            disabled={edit}
            value={formik.values.code ?? ''}
          />
        </DataFieldWithLabel>
      </Box>
      <Box sx={{ width: '45%' }}>
        <DataFieldWithLabel required={edit} label="송부 여부" labelPosition="top">
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
            }}>
            <MenuItem value="Y">Y</MenuItem>
            <MenuItem value="N">N</MenuItem>
          </Select>
        </DataFieldWithLabel>
      </Box>
      <Box sx={{ width: '45%' }}>
        <DataFieldWithLabel label="최종 여부" labelPosition="top">
          <Input
            disabled={edit}
            value={formik.values.isFinal ? 'Y' : 'N'}
          />
        </DataFieldWithLabel>
      </Box>
      <Box sx={{ width: '45%' }}>
        <DataFieldWithLabel required={edit} label="송신처" labelPosition="top">
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
      <Box sx={{ width: '45%' }}>
        <DataFieldWithLabel required={edit} label="견적 업체" labelPosition="top">
          <BusinessSelector
            allowMyBusiness
            disabled={!edit}
            value={formik.values.businessId ?? formik.values.business?.id}
            onChange={(id) => {
              formik.setFieldValue('businessId', id);
            }}
          />
        </DataFieldWithLabel>
      </Box>
      <Box sx={{ width: '90%' }}>
        <DataFieldWithLabel label="비고" labelPosition="top">
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
      <Box sx={{ width: '90%' }}>
        <DataFieldWithLabel required={edit} label="파일" labelPosition="top">
          <UploadField
            disableSelect
            disableDownload={edit}
            value={formik.values.file}
            onChange={(e) => {
              if (!e.target || !e.target.files || e.target.files.length === 0) {
                formik.setFieldValue('file', undefined);
                return;
              }
              formik.setFieldValue('file', fileToView(e.target.files![0]));
            }}
          />
        </DataFieldWithLabel>
      </Box>
    </Box>
  );
}