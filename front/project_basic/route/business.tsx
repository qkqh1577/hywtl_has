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
import {projectBasicAction} from 'project_basic/action';
import {
  initialProjectBasicBusinessParameter
} from 'project_basic/parameter';
import { ProjectBasicBusiness } from 'project_basic/domain';
import { closeStatus } from 'components/DataFieldProps';

export default function ProjectBasicBusinessRoute() {
  const dispatch = useDispatch();
  const { id, businessList, requestAddBusiness, requestChangeBusiness, requestDeleteBusiness } = useSelector((root: RootState) => root.projectBasic);
  const openAddModal = useCallback(() => dispatch(projectBasicAction.setBusiness(initialProjectBasicBusinessParameter)), [dispatch]);
  const openChangeModal = useCallback((item: ProjectBasicBusiness) => {
    dispatch(projectBasicAction.getBusiness(item.id));
  }, [dispatch]);

  useEffect(() => {
    closeStatus(requestAddBusiness, () => {
      dispatch(projectBasicAction.getBusinessList(id));
      dispatch(projectBasicAction.setBusiness(undefined));
    }, () => {
      dispatch(projectBasicAction.requestAddBusiness('idle'));
    });
  }, [requestAddBusiness]);

  useEffect(() => {
    closeStatus(requestChangeBusiness, () => {
      dispatch(projectBasicAction.getBusinessList(id));
      dispatch(projectBasicAction.setBusiness(undefined));
    }, () => {
      dispatch(projectBasicAction.requestChangeBusiness('idle'));
    });
  }, [requestChangeBusiness]);

  useEffect(() => {
    closeStatus(requestDeleteBusiness, () => {
      dispatch(projectBasicAction.getBusinessList(id));
      dispatch(projectBasicAction.setBusiness(undefined));
    }, () => {
      dispatch(projectBasicAction.requestDeleteBusiness('idle'));
    });
  }, [requestDeleteBusiness]);

  return (
    <ProjectBasicBusinessSection
      businessList={businessList || []}
      openAddModal={openAddModal}
      openChangeModal={openChangeModal}
    />
  );
}
