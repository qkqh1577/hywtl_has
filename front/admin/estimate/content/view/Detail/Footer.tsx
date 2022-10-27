import React, { useContext } from 'react';
import { Box, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FormikContext } from 'formik';
import { DefaultFunction } from 'type/Function';
import useId from 'services/useId';
import useDialog from 'dialog/hook';
import Button from 'layouts/Button';

interface Props {
  onDelete: DefaultFunction;
  onCancel: DefaultFunction;
}

export default function (props: Props) {
  const navigate = useNavigate();
  const formik = useContext(FormikContext);
  const id = useId();
  const { rollback } = useDialog();
  const edit = formik.values.edit;
  const onToList = () => {
    navigate('/admin/estimate-content-management');
  };
  return (
    <Box sx={{
      display:        'flex',
      width:          '100%',
      justifyContent: edit ? 'center' : 'space-between',
      alignItems:     'center',
      marginTop:      '20px',
      marginBottom:   '10px',
      flexWrap:       'nowrap',
    }}>
      <Box sx={{
        display:        'flex',
        justifyContent: 'flex-start',
        alignItems:     'center',
        flexWrap:       'nowrap',
      }}>
        {!edit && (
          <Button
            shape="basic3"
            children="목록"
            onClick={onToList}
          />
        )}
        {edit && (
          <Button
            children="저장"
            disabled={formik.isSubmitting}
            onClick={() => {
              formik.handleSubmit();
            }}
            sx={{
              marginRight: '10px',
            }}
          />
        )}
        {edit && id && (
          <Button
            shape="basic2"
            children="취소"
            onClick={() => {
              rollback(props.onCancel);
            }}
          />
        )}
        {edit && !id && (<Button
          shape="basic2"
          children="취소"
          onClick={() => {
            rollback(() => {
              onToList();
            });
          }}
        />)}
      </Box>
      {!edit && id && (
        <Box sx={{
          display:        'flex',
          justifyContent: 'flex-end',
          alignItems:     'center',
          flexWrap:       'nowrap',
        }}>
          <Button
            shape="basic3"
            children="삭제"
            onClick={props.onDelete}
            sx={{
              marginRight: '10px',
            }}
          />
          <Button
            children="수정"
            onClick={() => {
              formik.setFieldValue('edit', true);
            }}
          />
        </Box>
      )}
    </Box>
  );
}
