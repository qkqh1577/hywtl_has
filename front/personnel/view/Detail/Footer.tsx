import React, { useContext } from 'react';
import { FormikContext } from 'formik';
import { Box, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Button from 'layouts/Button';
import { DefaultFunction } from 'type/Function';

function ListButton() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/hr-card-management');
  };
  return (
    <Button
      shape="basic3"
      children="목록"
      onClick={onClick}
    />
  );
}

function EditButton() {
  const formikContext = useContext(FormikContext);
  const onClick = () => {
    formikContext?.setFieldValue('edit', true);
  };

  return (
    <Button
      children="수정"
      onClick={onClick}
    />
  );
}

interface Props {
  onCancel: DefaultFunction;
}

export default function Footer(props: Props) {
  const formik = useContext(FormikContext);
  const edit: boolean = formik.values.edit;

  if (edit) {
    return (
      <Box sx={{
        display:        'flex',
        width:          '100%',
        justifyContent: 'center',
        margin:         '20px 0',
      }}>
        <Button sx={{
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
      display:        'flex',
      width:          '100%',
      justifyContent: 'space-between',
      margin:         '20px 0',
    }}>
      <ListButton />
      <EditButton />
    </Box>
  );
};
