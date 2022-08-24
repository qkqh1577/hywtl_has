import {
  Box,
  Button
} from '@mui/material';
import React from 'react';

export interface ProjectMemoFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function ProjectMemoForm({
                                          open,
                                          setOpen
                                        }: ProjectMemoFormProps) {
  return (
    <Box sx={{
      display:  'flex',
      flexWrap: 'wrap',
      width:    '100%'
    }}>

      <Button onClick={() => {
        setOpen(false);
      }}>
        close
      </Button>
    </Box>
  );
}