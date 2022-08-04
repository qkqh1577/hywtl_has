import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TestServiceListAddButton() {

  const navigate = useNavigate();
  const clickHandler = () => {
    navigate('/test-service/add');
  };
  return (
    <Button
      onClick={clickHandler}
      children="등록"
    />
  );
}