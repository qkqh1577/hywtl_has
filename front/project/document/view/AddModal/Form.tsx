import React from 'react';
import {
  Box,
  Button,
  Grid,
  Typography
} from '@mui/material';
import TextField from 'components/TextField';

export interface UploadFieldProps {
  accept: string;
  name: string;
  label?: string;
}

function UploadField({ accept, name, label }: UploadFieldProps) {
  return (
    <Box>
      <input
        name= {name}
        accept={accept}
        multiple
        type="file"
      />
    </Box>
  );
}

interface Props {
}

export default function Form(props: Props) {
  return (
    <Grid container spacing={2}>
      <Grid item sm={12}>
        <TextField
          required
          name="recipient"
          label="수신처"
        />
      </Grid>
      <Grid item sm={12}>
        <UploadField name="file" accept="jpg/* | jpeg/* | webp/* | png/* | gif/* | bmp/* | pdf/* | zip/*" />
      </Grid>
      <Grid item>
        <Typography>
          * 파일 크기는 각 10MB를 초과 할 수 없습니다.
        </Typography>
        <Typography>
          * 등록 가능한 파일양식:jpg, jpeg, webp, png, gif, bmp, pdf, zip
        </Typography>
      </Grid>
      <Grid item sm={12}>
        <UploadField name="emailFile" accept="eml/*" />
      </Grid>
      <Grid item>
        <Typography>
          * 파일 크기는 각 10MB를 초과 할 수 없습니다.
        </Typography>
        <Typography>
          * 등록 가능한 파일양식: eml
        </Typography>
      </Grid>
      <Grid item sm={12}>
        <TextField
          name="note"
          label="비고"
        />
      </Grid>
    </Grid>
  );
};
