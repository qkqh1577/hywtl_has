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
import useDialog from 'dialog/hook';

export default function ProjectDocumentAddModalRoute() {

  const { error } = useDialog();
  const dispatch = useDispatch();
  const { projectId, addModal } = useSelector((root: RootState) => root.projectDocument);

  const onClose = useCallback(() => dispatch(projectDocumentAction.addModal(undefined)), [dispatch]);
  const onAdd = useCallback((params: ProjectDocumentParameter) => dispatch(projectDocumentAction.add(params)), [dispatch]);

  const formik = useFormik<ProjectDocumentParameter>({
    initialValues: initialProjectDocumentParameter,
    onSubmit:      (values) => {
      if (!projectId) {
        error('프로젝트가 선택되지 않았습니다.');
        formik.setSubmitting(false);
        return;
      }
      if (!addModal) {
        error('자료 형식이 선택되지 않았습니다.');
        formik.setSubmitting(false);
        return;
      }
      onAdd(values);
      formik.setSubmitting(false);
    }
  });

  useEffect(() => {
    if (!addModal) {
      formik.setValues(initialProjectDocumentParameter);
    }
  }, [addModal]);

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
