import React, { useContext } from 'react';
import { FormikContext } from 'formik';
import DetailFormFooter from 'layouts/DetailFormFooter';
import { Box, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Button from 'layouts/Button';

function ListButton() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/user/hr-card-management');
  };
  return (
    <Button
      shape={'basic3'}
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
      shape={'basic1'}
      children="수정"
      onClick={onClick}
    />
  );
}

export default function Footer() {
  const formikContext = useContext(FormikContext);
  const edit: boolean = formikContext?.values.edit ?? true;
  return (
    <DetailFormFooter
      children={!edit && (
        <Box sx={{
          display:        'flex',
          width:          '100%',
          justifyContent: 'space-between'
        }}>
          <Box sx={{
            width: '50%'
          }}>
            <ListButton />
          </Box>
          <EditButton />
        </Box>
      )}
    />
  );
};
