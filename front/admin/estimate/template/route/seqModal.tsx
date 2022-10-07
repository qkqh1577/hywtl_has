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
import { ApiStatus } from 'components/DataFieldProps';
import useDialog from 'components/Dialog';
import { initialEstimateTemplateQuery } from 'admin/estimate/template/query';

export default function EstimateTemplateSeqModalRoute() {

  const dispatch = useDispatch();
  const { alert, error, rollback } = useDialog();
  const { list, seqModal, requestChangeSeq } = useSelector((root: RootState) => root.estimateTemplate);
  const onClose = useCallback(() => dispatch(estimateTemplateAction.seqModal(false)), [dispatch]);
  const onSubmit = useCallback((list: EstimateTemplateId[]) => dispatch(estimateTemplateAction.changeSeq(list)), [dispatch]);

  useEffect(() => {
    if (requestChangeSeq === ApiStatus.DONE) {
      alert('변경하였습니다.');
      dispatch(estimateTemplateAction.requestChangeSeq(ApiStatus.IDLE));
      dispatch(estimateTemplateAction.seqModal(false));
      dispatch(estimateTemplateAction.setFilter(initialEstimateTemplateQuery));
    }
    else if (requestChangeSeq === ApiStatus.FAIL) {
      error('변경에 실패하였습니다.');
      dispatch(estimateTemplateAction.requestChangeSeq(ApiStatus.IDLE));
    }

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