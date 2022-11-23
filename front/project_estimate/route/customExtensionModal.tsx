import ProjectCustomEstimateExtensionModal from 'project_estimate/view/CustomExtensionModal';
import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import { projectEstimateAction } from 'project_estimate/action';
import {
  FormikProvider,
  useFormik
} from 'formik';
import { ProjectComplexBuildingId } from 'project_complex/domain';
import ProjectComplexBuildingFileModal from 'project_complex/view/BuildingFileModal';
import { closeStatus } from 'components/DataFieldProps';
import {
  initialProjectCustomEstimateExtensionParameter,
  ProjectCustomEstimateExtensionParameter
} from 'project_estimate/parameter';
import { projectComplexAction } from 'project_complex/action';

export default function ProjectCustomEstimateExtensionModalRoute() {

  const dispatch = useDispatch();
  const { projectId, customExtensionModal, customDetail, requestExtensionCustom } = useSelector((root: RootState) => root.projectEstimate);
  const { detail: project } = useSelector((root: RootState) => root.project);
  const { buildingList: buildingFileList } = useSelector((root: RootState) => root.projectDocument);
  const { siteList, buildingList } = useSelector((root: RootState) => root.projectComplex);
  const [buildingSeq, setBuildingSeq] = useState<number>();
  const onClose = useCallback(() => dispatch(projectEstimateAction.setCustomExtensionModal(undefined)), [dispatch]);
  const onChange = useCallback((params: ProjectCustomEstimateExtensionParameter) => dispatch(projectEstimateAction.extensionCustom(params)), [dispatch]);
  const closeBuildingFileModal = () => {
    setBuildingSeq(undefined);
  };
  const formik = useFormik<ProjectCustomEstimateExtensionParameter>({
    initialValues: initialProjectCustomEstimateExtensionParameter(project?.isLh ?? false),
    onSubmit:      (values) => {
      onChange({
        id:           values.id,
        plan:         {...values.plan, hasExperimentInfo: true},
        siteList:     values.siteList,
        buildingList: values.buildingList,
      });
    }
  });

  useEffect(() => {
    if (customExtensionModal) {
      formik.setFieldValue('id', customExtensionModal);
      if (!customDetail?.plan) {
        formik.setFieldValue('plan', {isLh: project?.isLh ?? false});
      }
      else {
        formik.setFieldValue('plan', customDetail.plan);
      }
      if (
        !Array.isArray(customDetail?.siteList)
        || customDetail!.siteList.length === 0
        || !Array.isArray(customDetail?.buildingList)
        || customDetail!.buildingList.length === 0
      ) {
        dispatch(projectComplexAction.setId(projectId));
      }
      else {
        formik.setFieldValue('siteList', customDetail!.siteList);
        formik.setFieldValue('buildingList', customDetail!.buildingList);
      }
    }
    else {
      formik.setValues(initialProjectCustomEstimateExtensionParameter(project?.isLh ?? false));
    }
  }, [customExtensionModal]);

  useEffect(() => {
    if (customExtensionModal && customDetail && siteList) {
      if (!Array.isArray(customDetail.siteList) || customDetail.siteList.length === 0) {
        formik.setFieldValue('siteList', siteList?.map(({ modifiedAt, ...site }) => ({
          ...site,
          managerId: site.manager?.id,
        })) ?? [{}]);
      }
    }
  }, [customExtensionModal, siteList]);

  useEffect(() => {
    if (customExtensionModal && customDetail && buildingList) {
      if (!Array.isArray(customDetail.buildingList) || customDetail.buildingList.length === 0) {
        formik.setFieldValue('buildingList', buildingList?.map(({ modifiedAt, ...building }) => {
          const siteSeqList = siteList?.map((site,
                                             j
          ) => {
            if (site.id === building.site?.id) {
              return j;
            }
            return undefined;
          })
                                      .filter(siteSeq => typeof siteSeq === 'number');
          return {
            ...building,
            siteSeq: Array.isArray(siteSeqList) && siteSeqList.length === 1 ? siteSeqList[0] : undefined,
          };
        }) ?? [{}]);
      }
    }
  }, [customExtensionModal, buildingList]);

  useEffect(() => {
    closeStatus(requestExtensionCustom, () => {
      onClose();
      dispatch(projectEstimateAction.setCustomDetailModal(customExtensionModal));
      dispatch(projectEstimateAction.setProjectId(projectId));

    }, () => {
      formik.setSubmitting(false);
      dispatch(projectEstimateAction.requestExtensionCustom('idle'));
    });
  }, [requestExtensionCustom]);

  return (
    <FormikProvider value={formik}>
      <ProjectCustomEstimateExtensionModal
        open={typeof customExtensionModal !== 'undefined'}
        onClose={onClose}
        openDocumentModal={setBuildingSeq}
      />
      <ProjectComplexBuildingFileModal
        buildingId={typeof buildingSeq === 'number' ? ProjectComplexBuildingId(buildingSeq) : undefined}
        fileId={typeof buildingSeq === 'number'
        && Array.isArray(formik.values.buildingList)
        && typeof formik.values.buildingList[buildingSeq] === 'object'
          ? formik.values.buildingList[buildingSeq].buildingDocumentId
          : undefined
        }
        fileList={buildingFileList}
        onClose={closeBuildingFileModal}
        onUpdate={({ id, buildingDocumentId }) => {
          if (!buildingDocumentId || buildingDocumentId <= 0) {
            formik.setFieldValue(`buildingList.${id}.buildingDocument`, undefined);
            formik.setFieldValue(`buildingList.${id}.buildingDocumentId`, undefined);
          }
          else {
            const buildingDocument = buildingFileList?.find(f => f.id === buildingDocumentId);
            formik.setFieldValue(`buildingList.${id}.buildingDocument`, buildingDocument);
            formik.setFieldValue(`buildingList.${id}.buildingDocumentId`, buildingDocumentId);
          }
          closeBuildingFileModal();
        }}
      />
    </FormikProvider>
  );
}
