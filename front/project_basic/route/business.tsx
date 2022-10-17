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
import { ApiStatus } from 'components/DataFieldProps';
import useDialog from 'components/Dialog';

export default function ProjectBasicBusinessRoute() {
  const dispatch = useDispatch();
  const { alert, error } = useDialog();
  const { id, businessList, requestAddBusiness, requestChangeBusiness, requestDeleteBusiness } = useSelector((root: RootState) => root.projectBasic);

  const openAddModal = useCallback(() => dispatch(projectBasicAction.setBusinessModal(initialProjectBasicBusinessParameter)), [dispatch]);
  const openChangeModal = useCallback((item: ProjectBasicBusiness) => dispatch(projectBasicAction.setBusinessModal({
    id:                item.id,
    business:          item.business,
    businessManager:   item.businessManager,
    businessId:        item.business?.id,
    businessManagerId: item.businessManager?.id,
    involvedType:      item.involvedType,
    edit:              false,
  } as ProjectBasicBusinessParameter)), [dispatch]);


  useEffect(() => {
    if (requestAddBusiness === ApiStatus.DONE) {
      alert('등록하였습니다.');
      dispatch(projectBasicAction.getBusinessList(id));
      dispatch(projectBasicAction.requestAddBusiness(ApiStatus.IDLE));
      dispatch(projectBasicAction.setBusinessModal(undefined));
    }
    else if (requestAddBusiness === ApiStatus.FAIL) {
      error('등록에 실패하였습니다.');
      dispatch(projectBasicAction.requestAddBusiness(ApiStatus.IDLE));

    }
  }, [requestAddBusiness]);


  useEffect(() => {
    if (requestChangeBusiness === ApiStatus.DONE) {
      alert('변경하였습니다.');
      dispatch(projectBasicAction.getBusinessList(id));
      dispatch(projectBasicAction.requestChangeBusiness(ApiStatus.IDLE));
      dispatch(projectBasicAction.setBusinessModal(undefined));
    }
    else if (requestChangeBusiness === ApiStatus.FAIL) {
      error('변경에 실패하였습니다.');
      dispatch(projectBasicAction.requestChangeBusiness(ApiStatus.IDLE));

    }
  }, [requestChangeBusiness]);

  useEffect(() => {
    if (requestDeleteBusiness === ApiStatus.DONE) {
      alert('삭제하였습니다.');
      dispatch(projectBasicAction.getBusinessList(id));
      dispatch(projectBasicAction.requestDeleteBusiness(ApiStatus.IDLE));
      dispatch(projectBasicAction.setBusinessModal(undefined));
    }
    else if (requestDeleteBusiness === ApiStatus.FAIL) {
      error('삭제에 실패하였습니다.');
      dispatch(projectBasicAction.requestDeleteBusiness(ApiStatus.IDLE));

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
