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
import {
  ProjectContractId,
  ProjectFinalContractVO
} from 'project_contract/domain';
import { RootState } from 'services/reducer';
import { ProjectFinalContractParameter } from 'project_contract/parameter';
import { closeStatus } from 'components/DataFieldProps';
import useId from 'services/useId';
import { ProjectId } from 'project/domain';

export default function ProjectContractListRoute() {
  const dispatch = useDispatch();
  const id = useId();
  const { list, finalContract, requestFinalContractUpdate } = useSelector((root: RootState) => root.projectContract);
  const openAddModal = useCallback(() => dispatch(projectContractAction.setModal(null)), [dispatch]);
  const openDetailModal = useCallback((id: ProjectContractId) => dispatch(projectContractAction.setModal(id)), [dispatch]);
  const openFinalModal = useCallback(() => dispatch(projectContractAction.setFinalModal(true)), [dispatch]);
  const openFinalContractCollectionModal = useCallback((finalContract: ProjectFinalContractVO) => dispatch(projectContractAction.setFinalContractCollectionModal(finalContract)), [dispatch]);
  const onUpdate = useCallback((params: ProjectFinalContractParameter) => dispatch(projectContractAction.update(params)), [dispatch]);
  const [contractCodeList, setContractCode] = useState<string[]>(list?.map((item) => item.code).sort() || []);
  const [estimateCodeList, setEstimateCodeList] = useState<string[]>(list?.map((item) => item.estimateCode).sort() || []);

  useEffect(() => {
    closeStatus(requestFinalContractUpdate, () => {
      if (id) {
        dispatch(projectContractAction.getFinalContract(ProjectId(id)));
      }
    }, () => {
      dispatch(projectContractAction.requestFinalContractUpdate('idle'));
    });
  }, [requestFinalContractUpdate]);

  useEffect(() => {
    if (id) {
      dispatch(projectContractAction.getFinalContract(ProjectId(id)));
    }
  }, [id]);

  useEffect(() => {
    setContractCode(list?.map((item) => item.code).sort() || []);
    setEstimateCodeList(list?.map((item) => item.estimateCode).sort() || []);
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
      openFinalContractCollectionModal={openFinalContractCollectionModal}
    />
  );
}
