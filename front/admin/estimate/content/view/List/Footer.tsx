import {
  Box,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function AddButton() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/admin/estimate-content-management/add');
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
      <AddButton />
    </Box>
  );
};
