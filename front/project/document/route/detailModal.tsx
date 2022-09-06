import React, {
  useCallback,
  useMemo
} from 'react';
import ProjectDocumentDetailModal from 'project/document/view/DetailModal';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectDocumentAction } from 'project/document/action';
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
} from 'project/document/domain';
import { ProjectDocumentUpdateParameter } from 'project/document/parameter';

export type DetailModalFormik = FormikEditable<FormikPartial<ProjectDocumentVO>>;

export default function ProjectDocumentDetailModalRoute() {

  const dispatch = useDispatch();
  const { detail } = useSelector((root: RootState) => root.projectDocument);

  const onClose = useCallback(() => dispatch(projectDocumentAction.setOne(undefined)), [dispatch]);

  const update = useCallback((formikProps: FormikSubmit<ProjectDocumentUpdateParameter>) =>
    dispatch(projectDocumentAction.update(formikProps)), [dispatch]);
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

      update({
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
