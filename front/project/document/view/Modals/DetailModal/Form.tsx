import React from 'react';
import {
  Button,
  Grid,
  Typography
} from '@mui/material';
import TextField from 'components/TextField';
import { ProjectDocumentVO } from 'project/document/domain';
import { FormikPartial } from 'type/Form';

export interface ProjectDocumentFormProps {
  detail: FormikPartial<ProjectDocumentVO>;
}

function DownloadButton() {
  return (
    <Button onClick={() => console.log('download')}>
      다운로드
    </Button>
  );
}

export default function ({detail}: ProjectDocumentFormProps) {
  console.log(detail);
  return (
    <Grid container spacing={2}>
      <Grid item sm={6}>
        {/*<TextField name="code" label="자료번호" />*/}
        <Typography>{detail ? detail.code : ''}</Typography>
      </Grid>
      <Grid item sm={6}>
        {/*<TextField name="createdBy" label="등록자" />*/}
        <Typography>{detail ? detail.createdBy.name : ''}</Typography>
      </Grid>
      <Grid item sm={12}>
        {/*<TextField name="recipient" label="수신처" />*/}
        <Typography>{detail ? detail.recipient: ''}</Typography>
      </Grid>
      <Grid item sm={12}>
        {/*<TextField*/}
        {/*  name="file"*/}
        {/*  label="파일"*/}
        {/*  endAdornment={<DownloadButton />}*/}
        {/*/>*/}
        <Typography>{detail ? detail.file.filename: ''}</Typography>
      </Grid>
      <Grid item sm={12}>
        {/*<TextField*/}
        {/*  name="mailFile"*/}
        {/*  label="메일파일"*/}
        {/*  endAdornment={<DownloadButton />}*/}
        {/*/>*/}
        <Typography>{detail ? detail.mailFile?.name: ''}</Typography>
      </Grid>
      <Grid item sm={12}>
        {/*<TextField name="note" label="비고" />*/}
        <Typography>{detail ? detail.note: ''}</Typography>
      </Grid>
    </Grid>
  );
};
