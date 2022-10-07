import React from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import ProjectBasicBusinessSection from 'project_basic/view/BusinessSection';
import { RootState } from 'services/reducer';
import { projectBasicEvent } from 'project_basic/action';

export default function ProjectBasicBusinessRoute() {
  const dispatch = useDispatch();
  const { businessList } = useSelector((root: RootState) => root.projectBasic);

  return (
    <ProjectBasicBusinessSection
      projectBasicBusinessList={businessList || []}
      handleAddBusiness={() => {dispatch(projectBasicEvent.business.list.addClick());}}
      handleDetailBusiness={(id) => {dispatch(projectBasicEvent.business.list.tupleClick(id));}}
    />
  );
}
