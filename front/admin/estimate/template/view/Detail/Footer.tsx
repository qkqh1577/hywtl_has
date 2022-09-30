import React, { useContext, } from 'react';
import { FormikContext } from 'formik';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Button from 'layouts/Button';
import { DefaultFunction } from 'type/Function';
import useId from 'services/useId';
import useDialog from 'components/Dialog';

interface Props {
  onDelete: DefaultFunction;
}

export default function (props: Props) {

  const navigate = useNavigate();
  const formik = useContext(FormikContext);
  const id = useId();
  const { rollback } = useDialog();
  const edit = formik.values.edit;
  const onToList = () => {
    navigate('/admin/estimate-template-management');
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
              rollback(() => {
                navigate(`/admin/estimate-template-management/${id}`);
              });
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
            shape="basic2"
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