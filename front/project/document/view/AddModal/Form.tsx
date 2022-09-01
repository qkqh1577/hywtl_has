import React, {
  ChangeEvent,
  useContext
} from 'react';
import {
  Box,
  Grid,
  Input,
  InputProps,
  Typography
} from '@mui/material';
import TextField from 'components/TextField';
import { FormikContext } from 'formik';

export interface UploadFieldProps {
  accept: string;
  name: string;
  label?: string;
}

function isFileInput(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): e is ChangeEvent<HTMLInputElement> {
  const files = (e.target as any).files;
  return typeof files !== 'undefined';
}

function UploadField({ accept, name }: UploadFieldProps) {
  const formikContext = useContext(FormikContext);
  const onChange: InputProps['onChange'] = (e) => {
    if (formikContext && isFileInput(e)) {
      formikContext.setFieldValue(name, e.target.files![0]);
    }
  };
  return (
    <Box>
      <Input
        inputProps={{
          accept,
        }}
        name={name}
        type="file"
        onChange={onChange}
      />
    </Box>
  );
}

export default function Form() {
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
        <UploadField name="file" accept="image/*,.zip" />
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
        <UploadField name="mailFile" accept=".eml" />
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
