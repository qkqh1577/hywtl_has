import ProjectComplexBuildingFileModal from 'project_complex/view/BuildingFileModal';
import { useFormik } from 'formik';
import React, {
  useCallback,
  useEffect
} from 'react';
import { projectDocumentAction } from 'project_document/action';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectComplexAction } from 'project_complex/action';
import { ProjectComplexBuildingId } from 'project_complex/domain';
import { ProjectDocumentId } from 'project_document/domain';
import { ProjectComplexBuildingParameter } from 'project_complex/parameter';
import useDialog from 'components/Dialog';
import { ApiStatus } from 'components/DataFieldProps';

export interface FormikProps {
  open: boolean;
  edit: boolean;
  buildingId?: ProjectComplexBuildingId;
  fileId?: ProjectDocumentId;
}

export default function ProjectComplexBuildingFileModalRoute() {

  const dispatch = useDispatch();
  const { id: projectId, buildingDetail, buildingFileModal, requestBuilding } = useSelector((root: RootState) => root.projectComplex);
  const { buildingList } = useSelector((root: RootState) => root.projectDocument);
  const { error, confirm } = useDialog();
  const onClose = useCallback(() => dispatch(projectComplexAction.setBuilding(undefined)), [dispatch]);

  const updateBuilding = useCallback((params: ProjectComplexBuildingParameter) => dispatch(projectComplexAction.updateBuilding(params)), [dispatch]);
  const formik = useFormik<FormikProps>({
    enableReinitialize: true,
    initialValues:      {
      open:       !!buildingDetail,
      edit:       !buildingDetail?.buildingDocument,
      buildingId: buildingFileModal,
      fileId:     buildingDetail?.buildingDocument?.id,
    },
    onSubmit:           (values) => {
      const id = values.buildingId;
      const buildingDocumentId = values.fileId;
      if (!id) {
        error('동이 선택되지 않았습니다.');
        formik.setSubmitting(false);
        return;
      }
      if (!buildingDocumentId) {

        error('자료가 선택되지 않았습니다.');
        formik.setSubmitting(false);
        return;
      }
      updateBuilding({
        ...buildingDetail,
        id,
        buildingDocumentId,
      });
    }
  });

  useEffect(() => {
    if (projectId) {
      dispatch(projectDocumentAction.setAllList(projectId));
    }
    onClose();
  }, [projectId]);

  useEffect(() => {
    if (requestBuilding === 'response') {
      dispatch(projectComplexAction.buildingFileModal(undefined));
      dispatch(projectComplexAction.setBuilding(undefined));
      formik.setSubmitting(false);
      formik.setFieldValue('edit', false);
      formik.setFieldValue('open', false);
      dispatch(projectComplexAction.requestBuilding(ApiStatus.IDLE));
    }
  }, [requestBuilding]);

  return (
    <ProjectComplexBuildingFileModal
      formik={formik}
      buildingId={buildingDetail?.id}
      fileId={buildingDetail?.buildingDocument?.id}
      fileList={buildingList}
      onChange={() => {
        formik.setFieldValue('edit', true);
      }}
      onClose={onClose}
      onUnlink={() => {
        confirm({
          status:       'warn',
          children:     '연결을 해제하시겠습니까?',
          confirmText:  '해제',
          afterConfirm: () => {
            formik.setFieldValue('buildingFileId', undefined);
            formik.handleSubmit();
          }
        });
      }}
    />
  );
}