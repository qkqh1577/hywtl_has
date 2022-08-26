import React from 'react';
import {
  Box,
  Button
} from '@mui/material';

export interface SeqModalButtonBlockProps {
  onSubmit: () => void;
  onClose: () => void;
}

export default function EstimateTemplateSeqModalButtonBlock({
                                                              onSubmit,
                                                              onClose
                                                            }: SeqModalButtonBlockProps) {
  return (
    <Box sx={{
      display:        'flex',
      height:         '30px',
      width:          '100%',
      justifyContent: 'center',
    }}>
      <Button onClick={onSubmit}>저장</Button>
      <Button onClick={onClose}>취소</Button>
    </Box>
  );

}