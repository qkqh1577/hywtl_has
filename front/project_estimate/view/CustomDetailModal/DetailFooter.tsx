import React, { useContext } from 'react';
import { Box } from '@mui/material';
import Button from 'layouts/Button';
import { FormikContext } from 'formik';
import { DefaultFunction } from 'type/Function';
import { ProjectEstimateId } from 'project_estimate/domain';

interface Props {
  onClose: DefaultFunction;
  onChangeCancel: DefaultFunction<ProjectEstimateId>;
}

export default function (props: Props) {

  const formik = useContext(FormikContext);
  const edit = formik.values.edit === true;
  const onChange = () => {
    formik.setFieldValue('edit', true);
  };

  return (
    <Box sx={{
      width:          '100%',
      display:        'flex',
      justifyContent: 'center',
      '& > button':   {
        margin: '0 5px'
      }
    }}>
      {edit && (
        <>
          <Button shape="basic1" onClick={() => {
            formik.handleSubmit();
          }}>저장</Button>
          <Button shape="basic3" onClick={() => {
            props.onChangeCancel(formik.values.id);
          }}>취소</Button>
        </>
      )}
      {!edit && (
        <>
          <Button shape="basic2">삭제</Button>
          <Button shape="basic1" onClick={onChange}>수정</Button>
          <Button shape="basic3" onClick={props.onClose}>닫기</Button>
          <Button shape="basic2">실험정보 입력</Button>
          <Button shape="basic1">계약서 등록</Button>
        </>
      )}
    </Box>
  );
}