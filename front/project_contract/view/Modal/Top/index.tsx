import React, { useContext } from 'react';
import { FormikContext } from 'formik';
import { Box } from '@mui/material';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';
import UploadField from 'components/UploadField';
import { fileToView } from 'file-item';
import Button from 'layouts/Button';
import { DefaultFunction } from 'type/Function';

interface Props {
  onCancel: DefaultFunction;
  onDelete: DefaultFunction;
}

export default function ProjectContractModalTopForm(props: Props) {

  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  const id = formik.values.id;

  return (
    <Box sx={{
      width:          '100%',
      display:        'flex',
      flexWrap:       'nowrap',
      justifyContent: id ? 'space-between' : 'flex-end',
      alignItems:     'center',
      marginBottom:   '10px',
    }}>
      {id && (
        <Box sx={{
          width:          '40%',
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
        }}>
          <Box sx={{ width: '23%' }}>
            <DataFieldWithLabel label="계약 번호">
              <Input
                readOnly
                key={formik.values.code}
                defaultValue={formik.values.code ?? ''}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{ width: '17%' }}>
            <DataFieldWithLabel label="최종 여부">
              <Input
                readOnly
                key={formik.values.confirmed}
                defaultValue={formik.values.confirmed ? 'Y' : 'N'}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{ width: '60%' }}>
            <DataFieldWithLabel label="날인본 PDF">
              <UploadField
                disableSelect={!edit}
                readOnly={!edit}
                disableDownload={edit}
                accept=".pdf"
                value={formik.values.pdfFile}
                onChange={(e) => {
                  if (!edit) {
                    return;
                  }
                  if (!e.target || !e.target.files || e.target.files.length === 0) {
                    formik.setFieldValue('pdfFile', undefined);
                    return;
                  }
                  formik.setFieldValue('pdfFile', fileToView(e.target.files![0]));
                }}
              />
            </DataFieldWithLabel>
          </Box>
        </Box>
      )}
      <Box sx={{
        width:          '40%',
        display:        'flex',
        justifyContent: 'flex-end',
        alignItems:     'center',
      }}>
        {!formik.values.confirmed && !edit && (
          <Button
            shape="basic2"
            onClick={props.onDelete}
            sx={{
              marginRight: '10px',
            }}>
            삭제
          </Button>
        )}
        {!formik.values.confirmed && !edit && (
          <Button
            onClick={() => {
              formik.setFieldValue('edit', true);
            }}
            sx={{
              marginRight: '10px',
            }}>
            수정
          </Button>
        )}
        {!edit && (
          <Button shape="basic3"
            sx={{
              marginRight: '10px',
            }}
            onClick={() => {window.open(`/file-item?projectContractId=${id}&type=word`, '_blank');}}
          >
            Word 다운로드
          </Button>
        )}
        {!edit && (
          <Button
            shape="basic3"
            onClick={() => {window.open(`/file-item?projectContractId=${id}&type=pdf`, '_blank');}}
          >
            PDF 다운로드
          </Button>
        )}
        {edit && (
          <Button
            sx={{
              marginRight: '10px',
            }}
            onClick={() => {
              formik.handleSubmit();
            }}>
            저장
          </Button>
        )}
        {edit && (
          <Button shape="basic3" onClick={props.onCancel}>취소</Button>
        )}
      </Box>
    </Box>
  );
}
