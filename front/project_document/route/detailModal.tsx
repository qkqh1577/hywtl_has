import React, {
  useCallback,
  useEffect,
} from 'react';
import ProjectDocumentDetailModal from 'project_document/view/DetailModal';
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
import { ProjectDocumentId, } from 'project_document/domain';
import {
  initialProjectDocumentChangeParameter,
  ProjectDocumentChangeParameter
} from 'project_document/parameter';
import useDialog from 'components/Dialog';


export default function ProjectDocumentDetailModalRoute() {

  const dispatch = useDispatch();
  const { rollback, error } = useDialog();
  const { detail } = useSelector((root: RootState) => root.projectDocument);

  const onClose = useCallback(() => dispatch(projectDocumentAction.setOne(undefined)), [dispatch]);

  const change = useCallback((params: ProjectDocumentChangeParameter) => dispatch(projectDocumentAction.change(params)), [dispatch]);

  const remove = useCallback((id: ProjectDocumentId) => dispatch(projectDocumentAction.delete(id)), [dispatch]);

  const onCancel = () => {
    if (!detail) {
      error('자료가 선택되지 않았습니다.');
      return;
    }
    rollback(() => {
      formik.setValues(detail as ProjectDocumentChangeParameter);
    });
  };

  const onDelete = () => {
    if (!detail) {
      error('자료가 선택되지 않았습니다.');
      return;
    }
    remove(detail.id);
  };

  const formik = useFormik<ProjectDocumentChangeParameter>({
    initialValues: initialProjectDocumentChangeParameter,
    onSubmit:      (values) => {
      change(values);
    }
  });

  useEffect(() => {
    if (detail) {
      formik.setValues(detail as ProjectDocumentChangeParameter);
    }
    else {
      formik.setValues(initialProjectDocumentChangeParameter);
    }
  }, [detail]);

  return (
    <FormikProvider value={formik}>
      <ProjectDocumentDetailModal
        open={typeof detail !== 'undefined'}
        onClose={onClose}
        onChange={() => {
          formik.handleSubmit();
        }}
        onCancel={onCancel}
        onDelete={onDelete}
      />
    </FormikProvider>
  );
}
