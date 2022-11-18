import React from 'react';
import {
  Box,
  Typography
} from '@mui/material';
import { ColorPalette } from 'assets/theme';

function FileUploadText(props) {
  return (
    <Box sx={{
      display:         'flex',
      flexDirection:   'column',
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
  );
}

export default FileUploadText;
