import React from 'react';
import ModalLayout from 'layouts/ModalLayout';
import { Box } from '@mui/material';
import { SeqModalListProps } from 'admin/estimate/content/view/List/SeqModal/List';
import { SeqModalButtonBlockProps } from 'admin/estimate/content/view/List/SeqModal/ButtonBlock';
import List from 'admin/estimate/content/view/List/SeqModal/List';
import ButtonBlock from 'admin/estimate/content/view/List/SeqModal/ButtonBlock';

export interface EstimateContentSeqModalProps extends SeqModalListProps, SeqModalButtonBlockProps{
  open: boolean;
}

export default function EstimateContentSeqModal({
                                                  open,
                                                  onSubmit,
                                                  onClose,
                                                  list,
                                                  setList
                                                }: EstimateContentSeqModalProps) {
  return (
    <ModalLayout
      title="견적서 내용 관리 순서 설정"
      open={open}
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
};
