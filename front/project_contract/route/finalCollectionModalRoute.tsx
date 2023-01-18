import React, {
  useCallback,
  useEffect
} from 'react';
import {
  FormikProvider,
  useFormik
} from 'formik';
import {
  initialProjectFinalContractCollectionParameter,
  ProjectFinalContractCollectionParameter
} from 'project_contract/parameter';
import ProjectFinalContractCollectionModal from 'project_contract/view/CollectionModal';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectContractAction } from 'project_contract/action';

export default function FinalCollectionModalRoute(props) {
  const dispatch = useDispatch();
  const { finalContractCollectionModal, finalContract, projectId } = useSelector((root: RootState) => root.projectContract);
  const onClose = useCallback(() => dispatch(projectContractAction.setFinalContractCollectionModal(undefined)), [dispatch]);
  const onUpdate = useCallback((parameter: ProjectFinalContractCollectionParameter) => dispatch(projectContractAction.updateFinalContractCollection(parameter)), [dispatch]);
  const formik = useFormik<ProjectFinalContractCollectionParameter>(
    {
      initialValues: initialProjectFinalContractCollectionParameter,
      onSubmit:      (values) => {
        onUpdate({...values, totalAmount: finalContractCollectionModal?.totalAmount!});
      }
    }
  );
  useEffect(() => {
    if (projectId) {
      dispatch(projectContractAction.getFinalContract(projectId));
    }
  }, [finalContractCollectionModal, projectId]);
  console.log('finalContract : ', finalContract?.collection);
  return (
    <FormikProvider value={formik}>
      <ProjectFinalContractCollectionModal
        open={!!finalContractCollectionModal}
        onClose={onClose}
        finalContract={finalContractCollectionModal}
        collection = {finalContract?.collection}
      />
    </FormikProvider>
  );
}

