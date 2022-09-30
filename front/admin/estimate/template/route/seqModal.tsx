import React, { useCallback } from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import EstimateTemplateSeqModal from 'admin/estimate/template/view/List/SeqModal';
import { estimateTemplateAction } from 'admin/estimate/template/action';
import { EstimateTemplateId } from 'admin/estimate/template/domain';

export default function EstimateTemplateSeqModalRoute() {

  const dispatch = useDispatch();
  const { list, seqModal } = useSelector((root: RootState) => root.estimateTemplate);
  const onClose = useCallback(() => dispatch(estimateTemplateAction.seqModal(false)), [dispatch]);
  const onSubmit = useCallback((list: EstimateTemplateId[]) => dispatch(estimateTemplateAction.changeSeq(list)), [dispatch]);

  return (
    <EstimateTemplateSeqModal
      open={seqModal}
      list={list}
      onSubmit={onSubmit}
      onClose={onClose}
    />
  );
}