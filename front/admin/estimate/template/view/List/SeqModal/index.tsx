import React, {
  useEffect,
  useState
} from 'react';
import ModalLayout from 'layouts/ModalLayout';
import List from 'admin/estimate/template/view/List/SeqModal/List';
import { Box, } from '@mui/material';
import { DefaultFunction } from 'type/Function';
import {
  EstimateTemplateId,
  EstimateTemplateShortVO
} from 'admin/estimate/template/domain';
import Button from 'layouts/Button';

export interface EstimateTemplateSeqModalProps {
  open: boolean;
  list?: EstimateTemplateShortVO[];
  onSubmit: DefaultFunction<EstimateTemplateId[]>;
  onClose: DefaultFunction;
}

export default function EstimateTemplateSeqModal({
                                                   open,
                                                   onSubmit,
                                                   onClose,
                                                   list: propsList,
                                                 }: EstimateTemplateSeqModalProps) {

  const [list, setList] = useState<EstimateTemplateShortVO[]>(propsList ?? []);

  useEffect(() => {
    if (open) {
      setList(propsList ?? []);
    }
  }, [open, propsList]);

  return (
    <ModalLayout
      open={open}
      width="35vw"
      title="용역 항목 순서 설정"
      onClose={onClose}
      children={
        <Box sx={{
          display:  'flex',
          flexWrap: 'wrap',
          width:    '100%',
        }}>
          <List list={list} setList={setList} />
        </Box>
      }
      footer={
        <Box sx={{
          display:        'flex',
          width:          '100%',
          justifyContent: 'center',
        }}>
          <Button
            sx={{
              marginRight: '10px',
            }}
            onClick={() => {
              onSubmit(list.map(item => item.id));
            }}>
            저장
          </Button>
          <Button shape="basic2" onClick={onClose}>취소</Button>
        </Box>
      }
    />
  );
}