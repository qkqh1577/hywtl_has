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
  ProjectContractCollectionVO,
  ProjectContractId,
  ProjectContractShortVO,
  ProjectFinalContractVO
} from 'project_contract/domain';
import { RootState } from 'services/reducer';
import { ProjectFinalContractParameter } from 'project_contract/parameter';
import useId from 'services/useId';
import { ProjectId } from 'project/domain';

export default function ProjectContractListRoute() {
  const dispatch = useDispatch();
  const id = useId();
  const { list, loading, finalContract } = useSelector((root: RootState) => root.projectContract);
  const openAddModal = useCallback(() => dispatch(projectContractAction.setModal(null)), [dispatch]);
  const openDetailModal = useCallback((id: ProjectContractId) => dispatch(projectContractAction.setModal(id)), [dispatch]);
  const openFinalModal = useCallback(() => dispatch(projectContractAction.setFinalModal(true)), [dispatch]);
  const openFinalContractCollectionModal = useCallback((finalContract: ProjectFinalContractVO) => dispatch(projectContractAction.setFinalContractCollectionModal(finalContract)), [dispatch]);
  const openContractCollectionModal = useCallback((contractCollectionModal: ProjectContractCollectionVO) => dispatch(projectContractAction.setContractCollectionModal(contractCollectionModal)), [dispatch]);
  const onUpdate = useCallback((params: ProjectFinalContractParameter) => dispatch(projectContractAction.update(params)), [dispatch]);
  const [contractCodeList, setContractCode] = useState<string[]>(list?.map((item) => item.code).sort() || []);
  const [estimateCodeList, setEstimateCodeList] = useState<string[]>(list?.map((item) => item.estimateCode).sort() || []);
  const onValidateFile = useCallback((contract: ProjectContractShortVO) => dispatch(projectContractAction.validateFile(contract)), [dispatch]);

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
      loading={loading}
      finalContract={finalContract}
      contractCodeList={contractCodeList}
      estimateCodeList={estimateCodeList}
      onUpdate={onUpdate}
      openAddModal={openAddModal}
      openDetailModal={openDetailModal}
      openFinalModal={openFinalModal}
      openFinalContractCollectionModal={openFinalContractCollectionModal}
      openContractCollectionModal={openContractCollectionModal}
      onValidateFile={onValidateFile}
    />
  );
}
