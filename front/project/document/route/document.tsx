import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import { AppRoute } from 'services/routes';
import useId from 'services/useId';
import ProjectContainer from 'project/route/container';
import ProjectDocument from 'project/document/view';
import {
  projectDocumentAction,
} from 'project/document/action';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { useFormik } from 'formik';
import {
  FormikEditable,
  FormikPartial,
  FormikSubmit,
  toValues
} from 'type/Form';
import {
  initialProjectDocumentParameter,
  ProjectDocumentParameter
} from 'project/document/parameter';
import useDialog from 'components/Dialog';
import {
  DocumentType,
  DocumentVO,
  initialDocumentVO
} from 'project/document/domain';
import { ProjectId } from 'project/domain';

function Element() {
  const id = useId();
  const { error } = useDialog();
  const dispatch = useDispatch();
  const {
          receivedList,
          sentList,
          buildingList,
          detail
        } = useSelector((root: RootState) => root.projectDocument);

  const addDocument = useCallback((formikProps: FormikSubmit<FormikPartial<ProjectDocumentParameter>>,
                                   projectId: ProjectId,
                                   type: DocumentType
    ) =>
      dispatch(projectDocumentAction.add({
        formik: {
          ...formikProps,
          values: toValues(formikProps.values) as ProjectDocumentParameter,
        },
        projectId,
        type
      })),
    [dispatch]);

  const formik = useFormik<FormikEditable<FormikPartial<DocumentVO>>>({
    enableReinitialize: true,
    initialValues:      detail ? { edit: false, ...detail } : { edit: true, ...initialDocumentVO },
    onSubmit:           (values,
                         helper
                        ) => {
      if (!values.edit) {
        error('수정 상태가 아닙니다.');
        helper.setSubmitting(false);
        return;
      }
    }
  });

  const addModalFormik = useFormik<FormikPartial<ProjectDocumentParameter>>(
    {
      initialValues: initialProjectDocumentParameter,
      onSubmit:      (values,
                      helper
                     ) => {
        console.log({ values, id });
        if (!id) {
          error('프로젝트가 선택되지 않았습니다.');
          helper.setSubmitting(false);
          return;
        }
        if (!modalOpen) {
          error('자료 형식이 선택되지 않았습니다.');
          helper.setSubmitting(false);
          return;
        }

        addDocument({
            values,
            ...helper
          },
          ProjectId(id),
          modalOpen
        );
      }
    }
  );

  const [modalOpen, setModalOpen] = useState<DocumentType>();

  useEffect(() => {
    if (id) {
      dispatch(projectDocumentAction.setAllList(id));
    }
  }, [id]);


  return (
    <ProjectContainer>
      <ProjectDocument
        receivedList={receivedList}
        sentList={sentList}
        buildingList={buildingList}
        onModalOpen={(type: DocumentType) => {
          setModalOpen(type);
        }}
        modalProps={{
          open:     typeof modalOpen !== 'undefined',
          onClose:  () => {
            setModalOpen(undefined);
          },
          onSubmit: () => {
            addModalFormik.handleSubmit();
          },
          formik:   addModalFormik,
        }}
      />
    </ProjectContainer>
  );
}

const projectDocumentRoute: AppRoute = {
  path:    '/project/sales-management/:id/document',
  element: <Element />
};

export default projectDocumentRoute;
