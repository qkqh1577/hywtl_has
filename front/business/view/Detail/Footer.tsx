import React, { useContext } from 'react';
import { FormikContext } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import Button from 'layouts/Button';
import { DefaultFunction } from 'type/Function';

function ListButton() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/business-management');
  };
  return (
    <Button
      shape="basic3"
      children="목록"
      onClick={onClick}
      sx={{
        marginRight: '10px'
      }}
    />
  );
}

function EditButton() {
  const formik = useContext(FormikContext);
  const onClick = () => {
    formik.setFieldValue('edit', true);
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
  onDelete: DefaultFunction;
}

export default function (props: Props) {
  const formik = useContext(FormikContext);

  if (formik.values.id && !formik.values.edit) {
    return (
      <Box sx={{
        width:          '100%',
        margin:         '10px 0',
        display:        'flex',
        justifyContent: 'space-between',
        alignItems:     'center'
      }}>
        <Box sx={{
          width: '40%'
        }}>
          <ListButton />
          <Button shape="basic3" onClick={props.onDelete}>
            삭제
          </Button>
        </Box>
        <Box sx={{
          width:          '40%',
          display:        'flex',
          justifyContent: 'flex-end',
        }}>
          <EditButton />
        </Box>
      </Box>
    );
  }
  return (
    <Box sx={{
      width:          '100%',
      margin:         '20px 0',
      display:        'flex',
      justifyContent: 'center',
      alignItems:     'center'
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
      <Button shape="basic2" onClick={props.onCancel}>
        취소
      </Button>
    </Box>
  );
};
