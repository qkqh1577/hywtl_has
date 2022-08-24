import {
  Box,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';

export interface FooterProps {
  onSeqModalOpen: () => void;
}

function OrderModalButton({
                            onSeqModalOpen: onClick
                          }: FooterProps) {
  return (
    <Button
      children="순서 설정"
      onClick={onClick}
    />
  );
}

function AddButton() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('admin/estimate/content/add');
  };
  return (
    <Button
      onClick={onClick}
      children="등록"
    />
  );
}

export default function (props: FooterProps) {
  return (
    <Box sx={{
      display:        'flex',
      width:          '100%',
      justifyContent: 'flex-end',
      mt:             '40px',
    }}>
      <OrderModalButton onSeqModalOpen={props.onSeqModalOpen} />
      <AddButton />
    </Box>
  );
};
