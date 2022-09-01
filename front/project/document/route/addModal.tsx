import React, { useCallback } from 'react';
import ProjectDocumentAddModal from 'project/document/view/AddModal';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectDocumentAction } from 'project/document/action';
import { useFormik } from 'formik';
import {
  FormikPartial,
  FormikSubmit,
  toValues
} from 'type/Form';
import {
  initialProjectDocumentParameter,
  ProjectDocumentParameter
} from 'project/document/parameter';
import { ProjectId } from 'project/domain';
import useId from 'services/useId';
import useDialog from 'components/Dialog';

export default function ProjectDocumentAddModalRoute() {

  const projectId = useId();
  const { error } = useDialog();
  const dispatch = useDispatch();
  const { addModal } = useSelector((root: RootState) => root.projectDocument);

  const onClose = useCallback(() =>
    dispatch(projectDocumentAction.addModal(undefined)), [dispatch]);

  const add = useCallback((formikProps: FormikSubmit<FormikPartial<ProjectDocumentParameter>>) =>
      dispatch(projectDocumentAction.add({
        ...formikProps,
        values: toValues(formikProps.values) as ProjectDocumentParameter,
      })),
    [dispatch]);

  const formik = useFormik<FormikPartial<ProjectDocumentParameter>>({
    initialValues: initialProjectDocumentParameter,
    onSubmit:      (values,
                    helper
                   ) => {
      if (!projectId) {
        error('프로젝트가 선택되지 않았습니다.');
        helper.setSubmitting(false);
        return;
      }
      if (!addModal) {
        error('자료 형식이 선택되지 않았습니다.');
        helper.setSubmitting(false);
        return;
      }

      add({
        values: {
          ...values,
          projectId: ProjectId(projectId),
          type:      addModal,
        },
        ...helper
      });
    }
  });

  return (
    <ProjectDocumentAddModal
      open={!!addModal}
      onClose={onClose}
      formik={formik}
    />
  );
}
