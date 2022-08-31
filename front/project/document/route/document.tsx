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
  initialProjectDocumentVO,
  ProjectDocumentId,
  ProjectDocumentType,
  ProjectDocumentVO,
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

  const addDocument = useCallback((formikProps: FormikSubmit<FormikPartial<ProjectDocumentParameter>>) =>
      dispatch(projectDocumentAction.add({
        ...formikProps,
        values: toValues(formikProps.values) as ProjectDocumentParameter,
      })),
    [dispatch]);

  const addModalFormik = useFormik<FormikPartial<ProjectDocumentParameter>>(
    {
      initialValues: initialProjectDocumentParameter,
      onSubmit:      (values,
                      helper
                     ) => {
        console.log('click시 보여준다.');
        if (!id) {
          error('프로젝트가 선택되지 않았습니다.');
          helper.setSubmitting(false);
          return;
        }
        if (!addModalOpen) {
          error('자료 형식이 선택되지 않았습니다.');
          helper.setSubmitting(false);
          return;
        }

        addDocument({
          values: {
            ...values,
            projectId: ProjectId(id),
            type:      addModalOpen,
          },
          ...helper
        });
      }
    }
  );

  const getDetail = useCallback((id: ProjectDocumentId) => {
    return dispatch(projectDocumentAction.setId(id));
  }, [dispatch]);

  const detailFormik = useFormik<FormikPartial<ProjectDocumentVO>>({
    enableReinitialize: true,
    initialValues:      initialProjectDocumentVO,
    onSubmit:           (values,
                         helper
                        ) => {

    }
  });

  const [addModalOpen, setAddModalOpen] = useState<ProjectDocumentType>();
  const [detailModalOpen, setDetailModalOpen] = useState<boolean>(false);

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
        onAddModalOpen={(type: ProjectDocumentType) => {
          setAddModalOpen(type);
        }}
        addModalProps={{
          open:     typeof addModalOpen !== 'undefined',
          onClose:  () => {
            setAddModalOpen(undefined);
          },
          onSubmit: () => {
            addModalFormik.handleSubmit();
          },
          formik:   addModalFormik,
        }}
        onDetailModalOpen={(id: ProjectDocumentId) => {
          getDetail(id);
          setDetailModalOpen(true);
        }}
        detailModalProps={{
          open:     detailModalOpen,
          onClose:  () => {
            setDetailModalOpen(false);
          },
          onEdit:   () => {
            console.log('수정 버튼 클릭');
          },
          onDelete: () => {
            console.log('삭제 버튼 클릭');
          },
          detail:   detail
        }}
      />
    </ProjectContainer>
  );
}

const projectDocumentRoute
        :
        AppRoute = {
  path:    '/project/sales-management/:id/document',
  element: <Element />
};

export default projectDocumentRoute;
