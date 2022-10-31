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
  blobToFile,
  getBlob,
  loadFile
} from 'util/FileUtil';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import apiClient from 'services/api';

export default function ProjectSystemEstimateModalRoute() {
  const dispatch = useDispatch();
  const { projectId, systemModal, systemDetail, requestAddSystem, requestChangeSystem, requestDeleteSystem, list } = useSelector((root: RootState) => root.projectEstimate);
  const { detail } = useSelector((root: RootState) => root.project);
  const { buildingList: buildingFileList } = useSelector((root: RootState) => root.projectDocument);
  const { siteList, buildingList } = useSelector((root: RootState) => root.projectComplex);
  const { list: templateList } = useSelector((root: RootState) => root.estimateTemplate);
  const { list: contentList } = useSelector((root: RootState) => root.estimateContent);
  const { error, rollback } = useDialog();
  const [buildingSeq, setBuildingSeq] = useState<number>();
  /* 견적번호 가져오기 관련 문제 */
  // console.log("list : ", Array.isArray(list) && list[list.length-1].code);
  // console.log('detail : ', detail);
  const closeBuildingFileModal = () => {
    setBuildingSeq(undefined);
  };
  const onAdd = useCallback((params: ProjectSystemEstimateParameter) => dispatch(projectEstimateAction.addSystem(params)), [dispatch]);
  const onChange = useCallback((params: ProjectSystemEstimateParameter) => dispatch(projectEstimateAction.changeSystem(params)), [dispatch]);
  const onClose = useCallback(() => dispatch(projectEstimateAction.setSystemModal(undefined)), [dispatch]);
  const onDelete = useCallback(() => dispatch(projectEstimateAction.deleteSystem()), [dispatch]);
  const formik = useFormik<ProjectSystemEstimateParameter>({
    initialValues: initialProjectSystemEstimateParameter,
    onSubmit:      (values) => {
      if (systemModal) {
        onChange(values);
        return;
      }
      if (systemModal === null) {
        onAdd(values);
        return;
      }
      error('시스템 견적서가 선택되지 않았습니다.');
    }
  });

  useEffect(() => {
    if (typeof systemModal !== 'undefined') {
      dispatch(projectDocumentAction.setProjectId(projectId));
      formik.setValues(initialProjectSystemEstimateParameter);
    }
    if (systemModal === null) {
      dispatch(projectComplexAction.setId(projectId));
      dispatch(estimateTemplateAction.setFilter(initialEstimateTemplateQuery));
      dispatch(estimateContentAction.setFilter(initialEstimateContentQuery));
      formik.setValues(initialProjectSystemEstimateParameter);
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
        onCancel={() => {
          rollback(() => {
            if (systemModal === null) {
              formik.setValues(initialProjectSystemEstimateParameter);
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
        onUpload={generate}
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

async function generate(values: ProjectSystemEstimateParameter) {
  loadFile(
    'http://localhost:8080/file-item/template?fileName=estimate_template.docx',
    async function (error, content) {
      if(error) { throw error; }
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks:    true,
      });
      const data = {
        recipient: values.recipient!,
        projectName: 'project 이름',
        estimateDate: values.plan.estimateDate,
        expectedServiceDate: values.plan.expectedServiceDate,
        manager1Id: values.plan.manager1Id,
        manager2Id: values.plan.manager2Id,
        contentList: getContentList(values.contentList)
      }
      console.log('data : ', data);
      doc.setData(data);
      doc.render(data);

      const formData = new FormData();
      formData.append('file', blobToFile(getBlob(doc), '계약서.docx'));
      console.log("formData : ", formData);
      await apiClient.post('/file-item/conversion', formData);
    }
  )
}

const getContentList = (list: string[]) => {
  return list.map((content) => {
    return {
      content: content,
    };
  });
}
