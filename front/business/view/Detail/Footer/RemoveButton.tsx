import { Button } from '@mui/material';
import React from 'react';

export interface RemoveButtonProps {
  onClick: () => void;
}

export default function BusinessRemoveButton(props: RemoveButtonProps) {
  return (
    <Button
      color="secondary"
      children="삭제"
      onClick={props.onClick}
    />
  );
}
