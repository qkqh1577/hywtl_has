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
import {
  initialProjectDocumentChangeParameter,
  ProjectDocumentChangeParameter
} from 'project_document/parameter';
import useDialog from 'dialog/hook';
import { closeStatus } from 'components/DataFieldProps';

export default function ProjectDocumentDetailModalRoute() {

  const dispatch = useDispatch();
  const { rollback } = useDialog();
  const { projectId, detail, requestChange, requestDelete } = useSelector((root: RootState) => root.projectDocument);

  const onClose = useCallback(() => dispatch(projectDocumentAction.setId(undefined)), [dispatch]);
  const change = useCallback((params: ProjectDocumentChangeParameter) => dispatch(projectDocumentAction.change(params)), [dispatch]);
  const deleteOne = useCallback(() => dispatch(projectDocumentAction.deleteOne()), [dispatch]);

  const formik = useFormik<ProjectDocumentChangeParameter>({
    initialValues: initialProjectDocumentChangeParameter,
    onSubmit:      (values) => {
      change(values);
    }
  });

  useEffect(() => {
    if (detail) {
      formik.setValues({ ...detail, edit: false } as ProjectDocumentChangeParameter);
    }
    else {
      formik.setValues(initialProjectDocumentChangeParameter);
    }
  }, [detail]);

  useEffect(() => {
    closeStatus(requestChange, () => {
      dispatch(projectDocumentAction.setProjectId(projectId));

      onClose();
    }, () => {
      formik.setSubmitting(false);
      dispatch(projectDocumentAction.requestChange('idle'));
    });
  }, [requestChange]);

  useEffect(() => {
    closeStatus(requestDelete, () => {
      dispatch(projectDocumentAction.setProjectId(projectId));
      onClose();
    }, () => {
      dispatch(projectDocumentAction.requestDelete('idle'));
    });

  }, [requestDelete]);

  return (
    <FormikProvider value={formik}>
      <ProjectDocumentDetailModal
        open={typeof detail !== 'undefined'}
        onClose={onClose}
        onChange={() => {
          formik.handleSubmit();
        }}
        onCancel={() => {
          rollback(() => {
            formik.setValues({ ...detail, edit: false } as ProjectDocumentChangeParameter);
          });
        }}
        onDelete={deleteOne}
      />
    </FormikProvider>
  );
}
