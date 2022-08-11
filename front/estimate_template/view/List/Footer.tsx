import React from 'react';
import {
  Box,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function OrderModalButton() {

  return (
    <Button
      children="순서 설정"
    />
  );
}

function AddButton() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/estimate/template/add');
  };
  return (
    <Button
      onClick={onClick}
      children="등록"
    />
  );
}

export default function () {

  return (
    <Box sx={{
      display:        'flex',
      width:          '100%',
      justifyContent: 'flex-end',
      mt:             '40px',
    }}>
      <OrderModalButton />
      <AddButton />
    </Box>
  );
}