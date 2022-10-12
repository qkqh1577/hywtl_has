import React, { useContext } from 'react';
import { DefaultFunction } from 'type/Function';
import { useNavigate } from 'react-router-dom';
import Button from 'layouts/Button';
import { FormikContext } from 'formik';
import { Box } from '@mui/material';

function ListButton() {
  const navigate = useNavigate();
  return (
    <Button
      shape="basic3"
      onClick={() => {
        navigate('/admin/department-management');
      }}
      sx={{
        marginRight: '10px'
      }}>
      목록
    </Button>
  );
}

interface Props {
  onCancel: DefaultFunction;
  onPasswordChange: DefaultFunction;
}

export default function (props: Props) {

  const formik = useContext(FormikContext);
  const edit = formik.values.edit;

  if (edit) {
    return (
      <Box sx={{
        width:          '100%',
        margin:         '20px 0',
        display:        'flex',
        justifyContent: 'center',
        alignItems:     'center',
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
  }

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
        <Button
          shape="basic2"
          children="비밀번호 변경"
          onClick={props.onPasswordChange}
        />
      </Box>
      <Box sx={{
        width:          '40%',
        display:        'flex',
        justifyContent: 'flex-end',
      }}>
        <Button onClick={() => {
          formik.setFieldValue('edit', true);
        }}>
          수정
        </Button>
      </Box>
    </Box>
  );
}
