import React from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import ProjectBasicBusinessSection from 'project/basic/view/BusinessSection';
import { RootState } from 'services/reducer';

export default function ProjectBasicBusinessRoute() {

  const dispatch = useDispatch();
  const { businessList } = useSelector((root: RootState) => root.projectBasic);


  return (
    <ProjectBasicBusinessSection list={businessList} />
  );
}