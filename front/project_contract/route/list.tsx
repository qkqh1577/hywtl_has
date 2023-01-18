import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { projectContractAction } from 'project_contract/action';
import ProjectContractListSection from 'project_contract/view/ContractList';
import { ProjectContractId } from 'project_contract/domain';
import { RootState } from 'services/reducer';
import { ProjectFinalContractParameter } from 'project_contract/parameter';
import { closeStatus } from 'components/DataFieldProps';

export default function ProjectContractListRoute() {

  const dispatch = useDispatch();
  const { list, finalContract, requestFinalContractUpdate, projectId } = useSelector((root: RootState) => root.projectContract);
  const openAddModal = useCallback(() => dispatch(projectContractAction.setModal(null)), [dispatch]);
  const openDetailModal = useCallback((id: ProjectContractId) => dispatch(projectContractAction.setModal(id)), [dispatch]);
  const openFinalModal = useCallback(() => dispatch(projectContractAction.setFinalModal(true)), [dispatch]);
  const onUpdate = useCallback((params: ProjectFinalContractParameter) => dispatch(projectContractAction.update(params)), [dispatch]);
  const [contractCodeList, setContractCode] = useState<string[]>(list?.map((item) => item.code) || []);
  const [estimateCodeList, setEstimateCodeList] = useState<string[]>(list?.map((item) => item.estimateCode) || []);

  useEffect(() => {
    closeStatus(requestFinalContractUpdate, () => {
      if (projectId) {
        dispatch(projectContractAction.getFinalContract(projectId));
      }
    }, () => {
      dispatch(projectContractAction.requestFinalContractUpdate('idle'));
    });
  }, [requestFinalContractUpdate]);

  useEffect(() => {
    if (projectId) {
      dispatch(projectContractAction.getFinalContract(projectId));
    }
  }, [projectId]);

  useEffect(() => {
    setContractCode(list?.map((item) => item.code) || []);
    setEstimateCodeList(list?.map((item) => item.estimateCode) || []);
  }, [list]);


  return (
    <ProjectContractListSection
      list={list}
      finalContract={finalContract}
      contractCodeList={contractCodeList}
      estimateCodeList={estimateCodeList}
      onUpdate={onUpdate}
      openAddModal={openAddModal}
      openDetailModal={openDetailModal}
      openFinalModal={openFinalModal}
    />
  );
}
