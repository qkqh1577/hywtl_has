import React, {
  useCallback,
  useEffect
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import EstimateTemplateSeqModal from 'admin/estimate/template/view/List/SeqModal';
import { estimateTemplateAction } from 'admin/estimate/template/action';
import { EstimateTemplateId } from 'admin/estimate/template/domain';
import useDialog from 'dialog/hook';
import { initialEstimateTemplateQuery } from 'admin/estimate/template/query';
import { closeStatus } from 'components/DataFieldProps';

export default function EstimateTemplateSeqModalRoute() {

  const dispatch = useDispatch();
  const { rollback } = useDialog();
  const { list, seqModal, requestChangeSeq } = useSelector((root: RootState) => root.estimateTemplate);
  const onClose = useCallback(() => dispatch(estimateTemplateAction.seqModal(false)), [dispatch]);
  const onSubmit = useCallback((list: EstimateTemplateId[]) => dispatch(estimateTemplateAction.changeSeq(list)), [dispatch]);

  useEffect(() => {
    closeStatus(requestChangeSeq, () => {
      dispatch(estimateTemplateAction.seqModal(false));
      dispatch(estimateTemplateAction.setFilter(initialEstimateTemplateQuery));
    }, () => {
      dispatch(estimateTemplateAction.requestChangeSeq('idle'));
    });
  }, [requestChangeSeq]);
  return (
    <EstimateTemplateSeqModal
      open={seqModal}
      list={list}
      onSubmit={onSubmit}
      onClose={() => {
        rollback(onClose);
      }}
    />
  );
}