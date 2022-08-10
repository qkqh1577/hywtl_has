import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import React from 'react';

export default function UserPageFooterAddButton () {

  const navigate = useNavigate();
  const onClick = () => {
    navigate('/user/add');
  };
  return (
    <Button
      onClick={onClick}
      children="등록"
    />
  );
}