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
import { FormValues } from 'business/view/Detail';
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
  DocumentVO,
  initialDocumentVO
} from 'project/document/domain';
import { initialProjectAddParameter } from 'project/parameter';

function Element() {
  const id = useId();
  const { error } = useDialog();
  const dispatch = useDispatch();
  const { receivedList, sentList, buildingList, detail } = useSelector((root: RootState) => root.projectDocument);

  const addDocument = useCallback((formikProps: FormikSubmit<FormikPartial<ProjectDocumentParameter>>) =>
      dispatch(projectDocumentAction.add({
        ...formikProps,
        values: toValues(formikProps.values) as ProjectDocumentParameter,
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
      onSubmit: (values, helper) => {
        addDocument({ values, ...helper });
      }
    }
  )

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
      if (id) {
        dispatch(projectDocumentAction.setAllList(id));
      }
    }, [id]
  );


  return (
    <ProjectContainer>
      <ProjectDocument
        receivedList={receivedList}
        sentList={sentList}
        buildingList={buildingList}
        onModalOpen={() => {
          setModalOpen(true);
        }}
        modalProps={{
          open:     modalOpen,
          onClose:  () => {
            setModalOpen(false);
          },
          onSubmit: () => {
          },
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
