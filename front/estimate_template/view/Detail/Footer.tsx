import React, { useContext } from 'react';
import DetailFormFooter from 'layouts/DetailFormFooter';
import { FormikContext } from 'formik';
import {
  Box,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ListButton() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/estimate/template');
  };

  return (
    <Button
      children="목록"
      onClick={onClick}
    />
  );
}

function RemoveButton() {
  const onClick = () => {
    console.log('remove!');
  };
  return (
    <Button
      color="secondary"
      children="삭제"
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

export default function () {

  const formikContext = useContext(FormikContext);
  const edit: boolean = formikContext?.values.edit ?? true;

  return (
    <DetailFormFooter
      children={!edit
        ? (
          <Box sx={{
            display:        'flex',
            width:          '100%',
            justifyContent: 'space-between'
          }}>
            <Box sx={{
              width: '50%',
            }}>
              <ListButton />
              <RemoveButton />
            </Box>
            <EditButton />
          </Box>
        )
        : undefined
      }
    />
  );
}