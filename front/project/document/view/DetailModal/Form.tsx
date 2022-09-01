import React, {
  ChangeEvent,
  useContext
} from 'react';
import {
  Box,
  Button,
  Grid,
  Input,
  InputProps,
  Typography,
} from '@mui/material';
import TextField from 'components/TextField';
import {
  FormikContext,
  FormikContextType
} from 'formik';
import { DetailModalFormik } from 'project/document/route/detailModal';
import { FieldStatus } from 'components/DataFieldProps';
import { ButtonType } from 'project/document/domain';
import { UploadFieldProps } from 'project/document/view/AddModal/Form';
import { fileToView } from 'file-item';

interface ButtonProps {
  type: string;
}

function DownloadButton({ type }: ButtonProps) {
  const formikContext: FormikContextType<DetailModalFormik> = useContext(FormikContext);
  const onClick = () => {
    if (formikContext) {
      const fileId = formikContext.values.file ? formikContext.values.file.id : undefined;
      const mailFileId = formikContext.values.mailFile ? formikContext.values.mailFile.id : undefined;
      if (type === ButtonType.FILE_BUTTON) {
        if (fileId) {
          window.open(`/file-items/${fileId}`, '_blank');
        }
      }
      else {
        if (mailFileId) {
          window.open(`/file-items/${mailFileId}`, '_blank');
        }
      }
    }
  };

  return (
    <Button onClick={onClick}>
      다운로드
    </Button>
  );
}

function isFileInput(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>): e is ChangeEvent<HTMLInputElement> {
  const files = (e.target as any).files;
  return typeof files !== 'undefined';
}

function UploadField({ accept, name }: UploadFieldProps) {
  const formikContext = useContext(FormikContext);
  const onChange: InputProps['onChange'] = (e) => {
    if (formikContext && isFileInput(e)) {
      formikContext.setFieldValue(name, fileToView(e.target.files![0]));
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


interface Props {
  edit: boolean;
}

export default function ProjectDocumentDetailModalForm({ edit }: Props) {
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
        {edit && (
          <TextField
            status={FieldStatus.ReadOnly}
            name="file.filename"
            label="파일"
            endAdornment={!edit && <DownloadButton type={ButtonType.FILE_BUTTON} />}
          />
        )}
        {!edit && (
          <TextField
            name="file.filename"
            label="파일"
            endAdornment={!edit && <DownloadButton type={ButtonType.FILE_BUTTON} />}
          />
        )}
      </Grid>
      <Grid item sm={12}>
        {edit && (
          // <TextField
          //   status={FieldStatus.ReadOnly}
          //   name="mailFile.filename"
          //   label="메일파일"
          //   endAdornment={<Button>파일선택</Button>}
          // />
          <UploadField name="mailFile" accept="image/*,.zip" />
        )}
        {!edit && (
          <TextField
            name="mailFile.filename"
            label="메일파일"
            endAdornment={<DownloadButton type={ButtonType.MAIL_FILE_BUTTON} />}
          />
        )}
      </Grid>
      {edit && (
        <Grid item>
          <Typography>
            * 파일 크기는 각 10MB를 초과 할 수 없습니다.
          </Typography>
          <Typography>
            * 등록 가능한 파일양식: eml
          </Typography>
        </Grid>
      )}
      <Grid item sm={12}>
        <TextField name="note" label="비고" />
      </Grid>
    </Grid>
  );
};
