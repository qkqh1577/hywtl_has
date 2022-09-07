import React, {
  useCallback,
  useEffect
} from 'react';
import ProjectDocumentAddModal from 'project_document/view/AddModal';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectDocumentAction } from 'project_document/action';
import { useFormik } from 'formik';
import {
  FormikPartial,
  toValues
} from 'type/Form';
import {
  initialProjectDocumentParameter,
  ProjectDocumentParameter
} from 'project_document/parameter';
import useId from 'services/useId';
import useDialog from 'components/Dialog';
import { ProjectId } from 'project/domain';

export default function ProjectDocumentAddModalRoute() {

  const projectId = useId();
  const { error } = useDialog();
  const dispatch = useDispatch();
  const { addModal } = useSelector((root: RootState) => root.projectDocument);

  const onClose = useCallback(() => dispatch(projectDocumentAction.addModal('close')), [dispatch]);

  const formik = useFormik<FormikPartial<ProjectDocumentParameter>>({
    enableReinitialize: true,
    initialValues:      initialProjectDocumentParameter,
    onSubmit:           (formikValues,
                         helper
                        ) => {
      if (!projectId) {
        error('프로젝트가 선택되지 않았습니다.');
        helper.setSubmitting(false);
        return;
      }
      if (addModal == 'close' || addModal === 'request' || addModal === 'response') {
        error('자료 형식이 선택되지 않았습니다.');
        helper.setSubmitting(false);
        return;
      }
      dispatch(projectDocumentAction.add(toValues({ ...formikValues, projectId: ProjectId(projectId), type: addModal })));
    }
  });
  useEffect(() => {
    if (addModal === 'response') {
      onClose();
    }
  }, [addModal]);

  return (
    <ProjectDocumentAddModal
      open={addModal !== 'close'}
      onClose={onClose}
      formik={formik}
    />
  );
}
