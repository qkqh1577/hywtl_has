import React, { useContext } from 'react';
import { FormikContext } from 'formik';
import { Box } from '@mui/material';
import Button from 'layouts/Button';
import { DefaultFunction } from 'type/Function';
import { useNavigate } from 'react-router-dom';

interface Props {
  onCancel: DefaultFunction;
  onDelete: DefaultFunction;
}

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

export default function (props: Props) {
  const formik = useContext(FormikContext);
  if (formik.values.edit) {
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
        <Button shape="basic3" onClick={props.onCancel}>
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
        {formik.values.id && (
          <Button shape="basic2" onClick={props.onDelete}>
            삭제
          </Button>
        )}
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