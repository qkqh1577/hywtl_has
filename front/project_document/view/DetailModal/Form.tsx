import React, { useContext } from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { ColorPalette } from 'assets/theme';
import { FormikContext } from 'formik';
import Input from 'layouts/Input';
import UploadField from 'components/UploadField';
import { fileToView } from 'file-item';
import DataFieldWithLabel from 'layouts/DataFieldLabel';

export default function ProjectDocumentDetailModalForm() {
  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  return (
    <Box sx={{
      width:        '100%',
      display:      'flex',
      flexWrap:     'wrap',
      alignContent: 'flex-start',
    }}>
      {!edit && (
        <Box sx={{
          width:          '100%',
          display:        'flex',
          flexWrap:       'nowrap',
          justifyContent: 'space-between',
        }}>
          <Box sx={{
            width:    '45%',
            display:  'flex',
            flexWrap: 'nowrap',
          }}>
            <Box sx={{
              width:        '100%',
              display:      'flex',
              flexWrap:     'wrap',
              marginBottom: '15px',
            }}>
              <DataFieldWithLabel label="자료 번호">
                <Input
                  readOnly
                  key={formik.values.code}
                  defaultValue={formik.values.code ?? ''}
                />
              </DataFieldWithLabel>
            </Box>
          </Box>
          <Box sx={{
            width:    '45%',
            display:  'flex',
            flexWrap: 'nowrap',
          }}>
            <Box sx={{
              width:        '100%',
              display:      'flex',
              flexWrap:     'wrap',
              marginBottom: '15px',
            }}>
              <DataFieldWithLabel label="등록자">
                <Input
                  readOnly
                  key={formik.values.createdBy?.name}
                  defaultValue={formik.values.createdBy?.name ?? ''}
                />
              </DataFieldWithLabel>
            </Box>
          </Box>
        </Box>
      )}
      <Box sx={{
        width:        '100%',
        display:      'flex',
        flexWrap:     'wrap',
        marginBottom: '15px',
      }}>
        <DataFieldWithLabel required={edit} label="수신처">
          <Input
            required
            key={formik.values.recipient}
            defaultValue={formik.values.recipient ?? ''}
            readOnly={!edit}
            onBlur={(e) => {
              formik.setFieldValue('recipient', e.target.value || undefined);
            }}
          />
        </DataFieldWithLabel>
      </Box>
      <Box sx={{
        width:        '100%',
        display:      'flex',
        flexWrap:     'wrap',
        marginBottom: '15px',
      }}>
        <DataFieldWithLabel label="파일">
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
      <Box sx={{
        width:        '100%',
        display:      'flex',
        flexWrap:     'wrap',
        marginBottom: '15px',
      }}>
        <DataFieldWithLabel label="메일 자료">
          <UploadField
            disableSelect={!edit}
            disableDownload={edit}
            accept=".eml"
            value={formik.values.mailFile}
            onChange={(e) => {
              if (!e.target || !e.target.files || e.target.files.length === 0) {
                formik.setFieldValue('mailFile', undefined);
                return;
              }
              formik.setFieldValue('mailFile', fileToView(e.target.files![0]));
            }}
          />
        </DataFieldWithLabel>
      </Box>
      <Box sx={{
        backgroundColor: ColorPalette._f1f5fc,
        border:          `1px solid ${ColorPalette._e4e9f2}`,
        padding:         '10px',
        marginBottom:    '15px',
        width:           '100%',
      }}>
        <Typography
          sx={{
            fontSize: '11px',
            color:    ColorPalette._252627,
          }}>
          &#183; 파일 크기는 각 10MB를 초과 할 수 없습니다.
        </Typography>
        <Typography
          sx={{
            fontSize: '11px',
            color:    ColorPalette._252627,
          }}>
          &#183; 등록 가능한 파일양식: eml
        </Typography>
      </Box>
      <Box sx={{
        width:        '100%',
        display:      'flex',
        flexWrap:     'wrap',
        marginBottom: '15px',
      }}>
        <DataFieldWithLabel label="비고">
          <Input
            key={formik.values.note}
            readOnly={!edit}
            defaultValue={formik.values.note ?? ''}
            onBlur={(e) => {
              formik.setFieldValue('note', e.target.value || undefined);
            }}
          />
        </DataFieldWithLabel>
      </Box>
    </Box>
  );
}
