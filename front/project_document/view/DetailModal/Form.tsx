import React, { useContext } from 'react';
import {
  Box,
  Typography,
} from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';
import { FormikContext } from 'formik';
import FieldBox from 'project_document/view/FieldBox';
import Input from 'layouts/Input';
import FieldLabel from 'layouts/FieldLabel';
import FileInput from 'layouts/FileInput';

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
            <FieldBox
              label={
                <FieldLabel>
                  자료 번호
                </FieldLabel>
              }
              children={
                <Input
                  readOnly
                  defaultValue={formik.values.code ?? ''}
                />
              }
            />
          </Box>
          <Box sx={{
            width:    '45%',
            display:  'flex',
            flexWrap: 'nowrap',
          }}>
            <FieldBox
              label={
                <FieldLabel>
                  등록자
                </FieldLabel>
              }
              children={
                <Input
                  readOnly
                  defaultValue={formik.values.createdBy?.name ?? ''}
                />
              }
            />
          </Box>
        </Box>
      )}
      <FieldBox
        label={
          <FieldLabel required={edit}>
            수신처
          </FieldLabel>
        }
        children={
          <Input
            required
            value={formik.values.recipient ?? ''}
            readOnly={!edit}
            onChange={(e) => {
              formik.setFieldValue('recipient', e.target.value || undefined);
            }}
          />
        }
      />
      <FieldBox
        label={
          <FieldLabel>
            파일
          </FieldLabel>
        }
        children={
          <FileInput
            mode="view"
            disableDownload={edit}
            value={formik.values.file}
            onChange={(file) => {
              formik.setFieldValue('file', file);
            }}
          />
        }
      />
      <FieldBox
        label={
          <FieldLabel>
            메일 자료
          </FieldLabel>
        }
        children={
          <FileInput
            mode={edit ? 'edit' : 'view'}
            accept=".eml"
            value={formik.values.mailFile}
            onChange={(file) => {
              formik.setFieldValue('mailFile', file);
            }}
          />
        }
      />
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
      <FieldBox
        label={
          <FieldLabel>
            비고
          </FieldLabel>
        }
        children={
          <Input
            readOnly={!edit}
            value={formik.values.note ?? ''}
            onChange={(e) => {
              formik.setFieldValue('note', e.target.value || undefined);
            }}
          />
        }
      />
    </Box>
  );
}
