import React, {
  useCallback,
  useEffect
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import ProjectBasicBusinessSection from 'project_basic/view/BusinessSection';
import { RootState } from 'services/reducer';
import { projectBasicAction } from 'project_basic/action';
import {
  initialProjectBasicBusinessParameter,
  ProjectBasicBusinessParameter
} from 'project_basic/parameter';
import { ProjectBasicBusiness } from 'project_basic/domain';
import useDialog from 'dialog/hook';

export default function ProjectBasicBusinessRoute() {
  const dispatch = useDispatch();
  const { alert, error } = useDialog();
  const { id, businessList, requestAddBusiness, requestChangeBusiness, requestDeleteBusiness } = useSelector((root: RootState) => root.projectBasic);

  const openAddModal = useCallback(() => dispatch(projectBasicAction.setBusiness(initialProjectBasicBusinessParameter)), [dispatch]);
  const openChangeModal = useCallback((item: ProjectBasicBusiness) => dispatch(projectBasicAction.setBusiness({
    id:                item.id,
    business:          item.business,
    businessManager:   item.businessManager,
    businessId:        item.business?.id,
    businessManagerId: item.businessManager?.id,
    involvedType:      item.involvedType,
    edit:              false,
  } as ProjectBasicBusinessParameter)), [dispatch]);


  useEffect(() => {
    if (requestAddBusiness === 'done') {
      alert('등록하였습니다.');
      dispatch(projectBasicAction.getBusinessList(id));
      dispatch(projectBasicAction.requestAddBusiness('idle'));
      dispatch(projectBasicAction.setBusiness(undefined));
    }
    else if (requestAddBusiness === message) {
      error('등록에 실패하였습니다.');
      dispatch(projectBasicAction.requestAddBusiness('idle'));

    }
  }, [requestAddBusiness]);


  useEffect(() => {
    if (requestChangeBusiness === 'done') {
      alert('변경하였습니다.');
      dispatch(projectBasicAction.getBusinessList(id));
      dispatch(projectBasicAction.requestChangeBusiness('idle'));
      dispatch(projectBasicAction.setBusiness(undefined));
    }
    else if (requestChangeBusiness === message) {
      error('변경에 실패하였습니다.');
      dispatch(projectBasicAction.requestChangeBusiness('idle'));

    }
  }, [requestChangeBusiness]);

  useEffect(() => {
    if (requestDeleteBusiness === 'done') {
      alert('삭제하였습니다.');
      dispatch(projectBasicAction.getBusinessList(id));
      dispatch(projectBasicAction.requestDeleteBusiness('idle'));
      dispatch(projectBasicAction.setBusiness(undefined));
    }
    else if (requestDeleteBusiness === message) {
      error('삭제에 실패하였습니다.');
      dispatch(projectBasicAction.requestDeleteBusiness('idle'));

    }
  }, [requestDeleteBusiness]);

  return (
    <ProjectBasicBusinessSection
      businessList={businessList || []}
      openAddModal={openAddModal}
      openChangeModal={openChangeModal}
    />
  );
}
