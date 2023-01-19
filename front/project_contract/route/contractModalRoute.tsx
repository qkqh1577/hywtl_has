import React, { useCallback } from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectContractAction } from 'project_contract/action';
import CollectionModal from 'project_contract/view/ProjectCollectionModal';

export default function ContractModalRoute(props) {
  const dispatch = useDispatch();
  const { contractCollectionModal } = useSelector((root: RootState) => root.projectContract);
  const onClose = useCallback(() => dispatch(projectContractAction.setContractCollectionModal(undefined)), [dispatch]);

  return (
    <CollectionModal
      open={!!contractCollectionModal}
      onClose={onClose}
      collection={contractCollectionModal}
    />
  );
}

