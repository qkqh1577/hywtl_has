import { Button } from '@mui/material';
import React from 'react';
import { useTestServiceTemplate } from 'services/standard_data/test_service_template';

export default function TestServiceListSeqModalButton() {

  const { setSeqModal } = useTestServiceTemplate();

  const clickHandler = () => {
    setSeqModal(true);
  };
  return (
    <Button onClick={clickHandler}>
      순서 설정
    </Button>
  );
}