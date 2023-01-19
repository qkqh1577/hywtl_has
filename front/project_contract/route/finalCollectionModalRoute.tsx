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
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectContractAction } from 'project_contract/action';
import { closeStatus } from 'components/DataFieldProps';
import ProjectFinalContractCollectionModal from 'project_contract/view/FinalCollectionModal';

export default function FinalCollectionModalRoute(props) {
  const dispatch = useDispatch();
  const { finalContractCollectionModal, requestFinalContractCollectionUpdate, projectId } = useSelector((root: RootState) => root.projectContract);
  const onClose = useCallback(() => dispatch(projectContractAction.setFinalContractCollectionModal(undefined)), [dispatch]);
  const onUpdate = useCallback((parameter: ProjectFinalContractCollectionParameter) => dispatch(projectContractAction.updateFinalContractCollection(parameter)), [dispatch]);
  const formik = useFormik<ProjectFinalContractCollectionParameter>(
    {
      initialValues: initialProjectFinalContractCollectionParameter,
      onSubmit:      (values) => {
        onUpdate({ ...values, totalAmount: finalContractCollectionModal?.totalAmount! });
      }
    }
  );

  useEffect(() => {
    formik.setValues(finalContractCollectionModal ? { ...finalContractCollectionModal.collection } : initialProjectFinalContractCollectionParameter);
  }, [finalContractCollectionModal]);

  useEffect(() => {
    closeStatus(requestFinalContractCollectionUpdate,
      () => {
        if (projectId) {
          dispatch(projectContractAction.getFinalContract(projectId));
        }
      },
      () => {
        dispatch(projectContractAction.requestFinalContractCollectionUpdate('idle'));
      });
  }, [requestFinalContractCollectionUpdate]);

  return (
    <FormikProvider value={formik}>
      <ProjectFinalContractCollectionModal
        open={!!finalContractCollectionModal}
        onClose={onClose}
        finalContract={finalContractCollectionModal}
      />
    </FormikProvider>
  );
}

