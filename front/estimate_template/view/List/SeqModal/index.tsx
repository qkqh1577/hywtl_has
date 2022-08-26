import React from 'react';
import ModalLayout from 'layouts/ModalLayout';
import List, { SeqModalListProps } from './List';
import ButtonBlock, { SeqModalButtonBlockProps } from './ButtonBlock';
import { Box } from '@mui/material';

export interface EstimateTemplateSeqModalProps
  extends SeqModalListProps,
          SeqModalButtonBlockProps {
  open: boolean;
}

export default function EstimateTemplateSeqModal({
                                                   open,
                                                   onSubmit,
                                                   onClose,
                                                   list,
                                                   setList,
                                                 }: EstimateTemplateSeqModalProps) {

  return (
    <ModalLayout
      open={open}
      title="용역 항목 순서 설정"
      onClose={onClose}
      children={
        <Box sx={{
          display:  'flex',
          flexWrap: 'wrap',
          width:    '100%',
        }}>
          <List list={list} setList={setList} />
          <ButtonBlock
            onSubmit={onSubmit}
            onClose={onClose}
          />
        </Box>
      }
    />
  );
}