import React, { useContext } from 'react';
import {
  Button,
  Grid,
} from '@mui/material';
import TextField from 'components/TextField';
import {
  FormikContext,
  FormikContextType
} from 'formik';
import { DetailModalFormik } from 'project/document/route/detailModal';
import { FieldStatus } from 'components/DataFieldProps';


function DownloadButton() {
  const formikContext: FormikContextType<DetailModalFormik> = useContext(FormikContext);
  const onClick = () => {
    if (formikContext) {
      const fileId = formikContext.values.file ? formikContext.values.file.id : undefined;
      if (fileId) {
        window.open(`/file-items/${fileId}`, '_blank');
      }
    }
  };

  return (
    <Button onClick={onClick}>
      다운로드
    </Button>
  );
}

interface Props {
  edit: boolean;
}

export default function ProjectDocumentDetailModalForm({edit} :Props) {
  return (
    <Grid container spacing={2}>
      {!edit && (
        <Grid item sm={6}>
          <TextField
            name="code"
            label="자료번호"
            status={FieldStatus.ReadOnly}
          />
        </Grid>
      )}
      {!edit && (
        <Grid item sm={6}>
          <TextField
            name="createdBy.name"
            label="등록자"
            status={FieldStatus.ReadOnly}
          />
        </Grid>
      )}
      <Grid item sm={12}>
        <TextField name="recipient" label="수신처" />
      </Grid>
      <Grid item sm={12}>
        <TextField
          name="file.filename"
          label="파일"
          endAdornment={!edit && <DownloadButton />}
        />
      </Grid>
      <Grid item sm={12}>
        <TextField
          name="mailFile.filename"
          label="메일파일"
          endAdornment={edit ? <Button>파일선택</Button> : <DownloadButton />}
        />
      </Grid>
      <Grid item sm={12}>
        <TextField name="note" label="비고" />
      </Grid>
    </Grid>
  );
};
