import React, {
  useCallback,
  useEffect,
} from 'react';
import ProjectDocumentAddModal from 'project_document/view/AddModal';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectDocumentAction } from 'project_document/action';
import {
  FormikProvider,
  useFormik
} from 'formik';
import {
  initialProjectDocumentParameter,
  ProjectDocumentParameter
} from 'project_document/parameter';
import { closeStatus } from 'components/DataFieldProps';

export default function ProjectDocumentAddModalRoute() {

  const dispatch = useDispatch();
  const { projectId, addModal, requestAdd } = useSelector((root: RootState) => root.projectDocument);

  const onClose = useCallback(() => dispatch(projectDocumentAction.addModal(undefined)), [dispatch]);
  const onAdd = useCallback((params: ProjectDocumentParameter) => dispatch(projectDocumentAction.add(params)), [dispatch]);

  const formik = useFormik<ProjectDocumentParameter>({
    initialValues: initialProjectDocumentParameter,
    onSubmit:      (values) => {
      onAdd(values);
    }
  });

  useEffect(() => {
    if (!addModal) {
      formik.setValues(initialProjectDocumentParameter);
    }
  }, [addModal]);

  useEffect(() => {
    closeStatus(requestAdd, () => {
      dispatch(projectDocumentAction.setProjectId(projectId));
    }, () => {
      formik.setSubmitting(false);
      dispatch(projectDocumentAction.addModal(undefined));
    });
  }, [requestAdd]);

  return (
    <FormikProvider value={formik}>
      <ProjectDocumentAddModal
        open={!!addModal}
        onClose={onClose}
        onAdd={() => {
          formik.handleSubmit();
        }}
      />
    </FormikProvider>
  );
}
