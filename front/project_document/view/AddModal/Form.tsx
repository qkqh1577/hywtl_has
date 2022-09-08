import React from 'react';
import {
  Box,
  Typography
} from '@mui/material';
import TextField from 'components/TextField';
import { ColorPalette } from 'app/view/App/theme';
import UploadField from 'components/UploadField';

function FieldBox(props: { children: React.ReactNode }) {
  return (
    <Box
      children={props.children}
      sx={{
        width:        '100%',
        display:      'flex',
        marginBottom: '15px',
      }}
    />
  );
}

function TextBox(props: {
  text: string[];
}) {
  return (
    <Box sx={{
      backgroundColor: ColorPalette._f1f5fc,
      border:          `1px solid ${ColorPalette._e4e9f2}`,
      padding:         '10px',
      marginBottom:    '15px',
      width:           '100%',
    }}>
      {props.text.map((t) => (
        <Typography
          key={t}
          sx={{
            fontSize: '11px',
            color:    ColorPalette._252627,
          }}>
          &#183; {t}
        </Typography>
      ))}
    </Box>
  );
}

export default function Form() {
  return (
    <Box sx={{
      width:        '100%',
      display:      'flex',
      flexWrap:     'wrap',
      alignContent: 'flex-start',
    }}>
      <FieldBox>
        <TextField
          required
          labelPosition="top"
          name="recipient"
          label="수신처"
        />
      </FieldBox>
      <FieldBox>
        <UploadField
          name="file"
          label="파일"
          accept="image/*,.zip"
        />
      </FieldBox>
      <TextBox text={[
        '파일 크기는 각 10MB를 초과 할 수 없습니다.',
        '등록 가능한 파일양식:jpg, jpeg, webp, png, gif, bmp, pdf, zip'
      ]}
      />
      <FieldBox>
        <UploadField
          name="mailFile"
          label="메일 자료"
          accept=".eml"
        />
      </FieldBox>
      <TextBox
        text={[
          '파일 크기는 각 10MB를 초과 할 수 없습니다.',
          '등록 가능한 파일양식: eml'
        ]}
      />
      <FieldBox>
        <TextField
          labelPosition="top"
          name="note"
          label="비고"
        />
      </FieldBox>
    </Box>
  );
};
