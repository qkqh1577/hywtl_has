import React, { useContext } from 'react';
import { Box } from '@mui/material';
import Button from 'layouts/Button';
import { FormikContext } from 'formik';
import { DefaultFunction } from 'type/Function';
import { ProjectSystemEstimateVO } from 'project_estimate/domain';

interface Props {
  onClose: DefaultFunction;
  onCancel: DefaultFunction;
  onDelete: DefaultFunction;
  onExtend: DefaultFunction;
  onContract: (values: ProjectSystemEstimateVO) => void;
}

export default function (props: Props) {

  const formik = useContext(FormikContext);
  const edit = formik.values.edit;

  if (edit) {
    return (
      <Box sx={{
        width:          '100%',
        display:        'flex',
        justifyContent: 'center',
        flexWrap:       'nowrap',
      }}>
        <Button
          sx={{
            marginRight: '10px',
          }}
          onClick={() => {
            formik.handleSubmit();
          }}>
          저장
        </Button>
        <Button shape="basic2" onClick={props.onCancel}>취소</Button>
      </Box>
    );
  }

  return (
    <Box sx={{
      width:          '100%',
      display:        'flex',
      justifyContent: 'space-between',
    }}>
      <Button shape="basic3" onClick={props.onDelete}>삭제</Button>
      <Box>
        <Button sx={{ marginRight: '10px' }} onClick={() => {formik.setFieldValue('edit', true);}}>수정</Button>
        <Button shape="basic2" onClick={props.onClose}>닫기</Button>
      </Box>
      <Box>
        <Button onClick={props.onExtend} sx={{ marginRight: '10px' }}>실험정보 입력</Button>
        <Button shape="basic4" onClick={() => props.onContract(formik.values)}>계약서 등록</Button>
      </Box>
    </Box>
  );
}
