import ProjectSystemEstimateModal from 'project_estimate/view/SystemModal';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import useDialog from 'dialog/hook';
import {
  FormikProvider,
  useFormik
} from 'formik';
import {
  initialProjectSystemEstimateParameter,
  ProjectSystemEstimateParameter
} from 'project_estimate/parameter';
import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import { projectEstimateAction } from 'project_estimate/action';
import { closeStatus } from 'components/DataFieldProps';
import ProjectComplexBuildingFileModal from 'project_complex/view/BuildingFileModal';
import { ProjectComplexBuildingId } from 'project_complex/domain';
import { projectComplexAction } from 'project_complex/action';
import { projectDocumentAction } from 'project_document/action';
import { estimateTemplateAction } from 'admin/estimate/template/action';
import { initialEstimateTemplateQuery } from 'admin/estimate/template/query';
import { estimateContentAction } from 'admin/estimate/content/action';
import { initialEstimateContentQuery } from 'admin/estimate/content/query';
import {
  FileUtil,
  generateFile
} from 'util/FileUtil';
import { projectContractAction } from 'project_contract/action';
import { ProjectSystemEstimateVO } from 'project_estimate/domain';
import { ProjectEstimateVariable, } from 'project_estimate/util/variable';

export default function ProjectSystemEstimateModalRoute() {
  const dispatch = useDispatch();
  const { projectId, systemModal, systemDetail, requestAddSystem, requestChangeSystem, requestDeleteSystem } = useSelector((root: RootState) => root.projectEstimate);
  const { detail: project } = useSelector((root: RootState) => root.project);
  const { buildingList: buildingFileList } = useSelector((root: RootState) => root.projectDocument);
  const { siteList, buildingList } = useSelector((root: RootState) => root.projectComplex);
  const { list: templateList } = useSelector((root: RootState) => root.estimateTemplate);
  const { list: contentList } = useSelector((root: RootState) => root.estimateContent);
  const { variableList } = useSelector((root: RootState) => root.estimateContent);
  const { error, rollback } = useDialog();
  const [buildingSeq, setBuildingSeq] = useState<number>();
  const onValidateFile = useCallback((estimate: ProjectSystemEstimateParameter) => dispatch(projectEstimateAction.validateFile(estimate)), [dispatch]);

  const closeBuildingFileModal = () => {
    setBuildingSeq(undefined);
  };
  const onAdd = useCallback((params: ProjectSystemEstimateParameter) => dispatch(projectEstimateAction.addSystem(params)), [dispatch]);
  const onChange = useCallback((params: ProjectSystemEstimateParameter) => dispatch(projectEstimateAction.changeSystem(params)), [dispatch]);
  const onClose = useCallback(() => dispatch(projectEstimateAction.setSystemModal(undefined)), [dispatch]);
  const onDelete = useCallback(() => dispatch(projectEstimateAction.deleteSystem()), [dispatch]);
  const openContractAddModal = useCallback((values: ProjectSystemEstimateVO) => dispatch(projectContractAction.setModal(values)), [dispatch]);
  const formik = useFormik<ProjectSystemEstimateParameter>({
    initialValues: initialProjectSystemEstimateParameter(project?.isLh ?? false),
    onSubmit:      (values) => {
      if (systemModal) {
        generateFile(new FileUtil(
          values,
          (values) => {
            onChange(values as ProjectSystemEstimateParameter);
          },
          project!,
          'estimate_template',
          'estimate',
          ProjectEstimateVariable.list(variableList, values) ?? []));
        return;
      }
      if (systemModal === null) {
        generateFile(new FileUtil(
          values,
          (values) => {
            onAdd(values as ProjectSystemEstimateParameter);
          },
          project!,
          'estimate_template',
          'estimate',
          ProjectEstimateVariable.list(variableList, values) ?? []));
        return;
      }
      error('????????? ???????????? ???????????? ???????????????.');
    }
  });

  useEffect(() => {
    if (typeof systemModal !== 'undefined') {
      dispatch(projectDocumentAction.setProjectId(projectId));
      formik.setValues(initialProjectSystemEstimateParameter(project?.isLh ?? false));
    }
    if (systemModal === null) {
      dispatch(projectComplexAction.setId(projectId));
      dispatch(estimateTemplateAction.setFilter(initialEstimateTemplateQuery));
      dispatch(estimateContentAction.setFilter(initialEstimateContentQuery));
      dispatch(estimateContentAction.requestVariableList());
      formik.setValues(initialProjectSystemEstimateParameter(project?.isLh ?? false));
    }
  }, [systemModal]);

  useEffect(() => {
    if (systemModal && systemDetail) {
      formik.setValues({
        ...systemDetail,
        siteList:     systemDetail.siteList ?? [],
        buildingList: systemDetail.buildingList ?? [],
        templateList: systemDetail.templateList ?? [],
        contentList:  systemDetail.contentList ?? [],
        edit:         false,
      } as unknown as ProjectSystemEstimateParameter);
      dispatch(estimateContentAction.requestVariableList());
    }
  }, [systemModal, systemDetail]);

  useEffect(() => {
    if (systemModal === null) {
      formik.setFieldValue('siteList', siteList?.map(({ modifiedAt, ...site }) => ({
        ...site,
        managerId: site.manager?.id,
      })) ?? [{}]);
    }
  }, [siteList]);

  useEffect(() => {
    if (systemModal === null) {
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
  }, [buildingList]);

  useEffect(() => {
    if (systemModal === null) {
      formik.setFieldValue('templateList', templateList ?? []);
    }
  }, [templateList]);

  useEffect(() => {
    if (systemModal === null) {
      formik.setFieldValue('contentList',
        (!contentList || contentList.length === 0)
          ? []
          : contentList.map(content => content.detailList)
                       .reduce((a,
                                b
                       ) => [...a, ...b], []));
    }
  }, [contentList]);

  useEffect(() => {
    closeStatus(requestAddSystem, () => {
      dispatch(projectEstimateAction.setProjectId(projectId ?? undefined));
      dispatch(projectEstimateAction.setSystemModal(undefined));
    }, () => {
      formik.setSubmitting(false);
      dispatch(projectEstimateAction.requestAddSystem('idle'));
    });
  }, [requestAddSystem]);

  useEffect(() => {
    closeStatus(requestChangeSystem, () => {
      dispatch(projectEstimateAction.setProjectId(projectId ?? undefined));
      dispatch(projectEstimateAction.setSystemModal(systemDetail!.id));
    }, () => {
      formik.setSubmitting(false);
      dispatch(projectEstimateAction.requestChangeSystem('idle'));
    });
  }, [requestChangeSystem]);

  useEffect(() => {
    closeStatus(requestDeleteSystem, () => {
      dispatch(projectEstimateAction.setProjectId(projectId ?? undefined));
      dispatch(projectEstimateAction.setSystemModal(undefined));
    }, () => {
      dispatch(projectEstimateAction.requestDeleteSystem('idle'));
    });
  }, [requestDeleteSystem]);

  return (
    <FormikProvider value={formik}>
      <ProjectSystemEstimateModal
        open={typeof systemModal !== 'undefined'}
        onClose={onClose}
        onValidateFile={onValidateFile}
        onCancel={() => {
          rollback(() => {
            if (systemModal === null) {
              formik.setValues(initialProjectSystemEstimateParameter(project?.isLh ?? false));
              dispatch(projectEstimateAction.setSystemModal(undefined));
            }
            else {
              formik.setValues({
                ...systemDetail,
                siteList:     systemDetail?.siteList ?? [],
                buildingList: systemDetail?.buildingList ?? [],
                templateList: systemDetail?.templateList ?? [],
                contentList:  systemDetail?.contentList ?? [],
                edit:         false,
              } as unknown as ProjectSystemEstimateParameter);
            }
          });
        }}
        onDelete={onDelete}
        openDocumentModal={setBuildingSeq}
        openContractAddModal={openContractAddModal}
        variableList={variableList}
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

