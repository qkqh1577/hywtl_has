import {
  useDispatch,
  useSelector
} from 'react-redux';
import useId from 'services/useId';
import RivalEstimateListSection from 'rival_estimate/view/Section';
import { RootState } from 'services/reducer';
import React, {
  useCallback,
  useEffect
} from 'react';
import { rivalEstimateAction } from 'rival_estimate/action';
import { ProjectId } from 'project/domain';

export default function RivalEstimateListRoute() {

  const dispatch = useDispatch();
  const id = useId();
  const { projectId, list } = useSelector((root: RootState) => root.rivalEstimate);
  const push = useCallback(() => dispatch(rivalEstimateAction.push()), [dispatch]);

  useEffect(() => {
    if (id && projectId !== id) {
      dispatch(rivalEstimateAction.setProjectId(ProjectId(id)));
    }
  }, [id]);

  return (
    <RivalEstimateListSection list={list} onAdd={push} />
  );
}