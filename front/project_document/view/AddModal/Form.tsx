import React, { useContext } from 'react';
import {
  Box,
  Typography
} from '@mui/material';
import { ColorPalette } from 'app/view/App/theme';
import Input from 'layouts/Input';
import FieldLabel from 'layouts/FieldLabel';
import { FormikContext } from 'formik';
import FileInput from 'layouts/FileInput';
import FieldBox from 'project_document/view/FieldBox';


export default function Form() {
  const formik = useContext(FormikContext);
  return (
    <Box sx={{
      width:        '100%',
      display:      'flex',
      flexWrap:     'wrap',
      alignContent: 'flex-start',
    }}>
      <FieldBox
        label={
          <FieldLabel required>
            수신처
          </FieldLabel>
        }
        children={
          <Input
            required
            onBlur={(e) => {
              formik.setFieldValue('recipient', e.target.value || undefined);
            }}
            onKeyDown={(e) => {
              if (e.key.toLowerCase() === 'enter') {
                const value = (e.target as HTMLInputElement).value || undefined;
                formik.setFieldValue('recipient', value);
              }
            }}
          />
        }
      />
      <FieldBox
        label={
          <FieldLabel required>
            파일
          </FieldLabel>
        }
        children={
          <FileInput
            mode="edit"
            accept="image/*,.zip"
            value={formik.values.file}
            onChange={(file) => {
              formik.setFieldValue('file', file);
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
          &#183; 등록 가능한 파일양식: jpg, jpeg, webp, png, gif, bmp, pdf, zip
        </Typography>
      </Box>
      <FieldBox
        label={
          <FieldLabel>
            메일 자료
          </FieldLabel>
        }
        children={
          <FileInput
            mode="edit"
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
            onBlur={(e) => {
              formik.setFieldValue('note', e.target.value || undefined);
            }}
            onKeyDown={(e) => {
              if (e.key.toLowerCase() === 'enter') {
                const value = (e.target as HTMLInputElement).value || undefined;
                formik.setFieldValue('note', value);
              }
            }}
          />
        }
      />
    </Box>
  );
};
