import React, {
  useCallback,
  useMemo
} from 'react';
import ProjectDocumentDetailModal from 'project_document/view/DetailModal';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectDocumentAction } from 'project_document/action';
import { useFormik } from 'formik';
import {
  FormikEditable,
  FormikPartial,
  FormikSubmit,
  toPartial,
  toValues
} from 'type/Form';
import {
  initialProjectDocumentVO,
  ProjectDocumentId,
  ProjectDocumentVO
} from 'project_document/domain';
import { ProjectDocumentChangeParameter } from 'project_document/parameter';

export type DetailModalFormik = FormikEditable<FormikPartial<ProjectDocumentVO>>;

export default function ProjectDocumentDetailModalRoute() {

  const dispatch = useDispatch();
  const { detail } = useSelector((root: RootState) => root.projectDocument);

  const onClose = useCallback(() => dispatch(projectDocumentAction.setOne(undefined)), [dispatch]);

  const change = useCallback((formikProps: FormikSubmit<ProjectDocumentChangeParameter>) =>
    dispatch(projectDocumentAction.change(formikProps)), [dispatch]);
  const initialValues: DetailModalFormik = useMemo(() => ({
    ...toPartial(detail, initialProjectDocumentVO),
    edit: false
  }), [detail]);

  const formik = useFormik<DetailModalFormik>({
    enableReinitialize: true,
    initialValues,
    onSubmit:           (formikValues,
                         helper
                        ) => {
      const values = toValues(formikValues);

      change({
        values: {
          id:        values.id!,
          note:      values.note,
          recipient: values.recipient!,
          mailFile:  values.mailFile,
        },
        ...helper
      });
    }
  });

  const remove = useCallback((id: ProjectDocumentId) => dispatch(projectDocumentAction.delete(id)), [dispatch]);

  const onDelete = () => {
    if (detail) {
      remove(detail.id);
    }
  };

  return (
    <ProjectDocumentDetailModal
      open={typeof detail !== 'undefined'}
      onClose={onClose}
      formik={formik}
      onDelete={onDelete}
    />
  );
}
