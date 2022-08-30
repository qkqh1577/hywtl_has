import React from 'react';
import {
  Box,
  Button,
  Typography
} from '@mui/material';

export interface HeaderProps {
  title?: string;
  modifiedAt?: Date;
  onModalOpen: () => void
}

function AddModalButton({
                          onModalOpen: onClick
                        }: HeaderProps) {
  return (
    <Button onClick={onClick}>+등록</Button>
  )
}

export default function Header({title, modifiedAt, onModalOpen}: HeaderProps) {
  return (
    <Box sx={{
      width:          '100%',
      display:        'flex',
      justifyContent: 'space-between',
    }}>
      <Box>
        <Typography>{title}</Typography>
      </Box>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
      }}>
        <AddModalButton  onModalOpen={onModalOpen}/>
        <Typography>{modifiedAt}</Typography>
      </Box>
    </Box>
  );
};
