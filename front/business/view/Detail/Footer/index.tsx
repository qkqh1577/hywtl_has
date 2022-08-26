import React, { useContext } from 'react';
import DetailFormFooter from 'layouts/DetailFormFooter';
import { FormikContext } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button
} from '@mui/material';

function ListButton() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/business-management');
  };
  return (
    <Button
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

export interface FooterProps {
  removeButton: React.ReactNode;
}

export default function (props: FooterProps) {
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
              width: '50%'
            }}>
              <ListButton />
              {props.removeButton}
            </Box>
            <EditButton />
          </Box>
        )
        : undefined}
    />
  );
};
