import ProjectContractModal from 'project_contract/view/Modal';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import { RootState } from 'services/reducer';
import {
  FormikProvider,
  useFormik
} from 'formik';
import React, {
  useCallback,
  useEffect,
} from 'react';
import { projectContractAction } from 'project_contract/action';
import { ProjectContractId } from 'project_contract/domain';
import useDialog from 'dialog/hook';
import {
  initialProjectContractParameter,
  ProjectContractParameter
} from 'project_contract/parameter';
import ProjectContractEstimateSelectModal from 'project_contract/view/EstimateModal';
import { ProjectEstimateId } from 'project_estimate/domain';
import { DialogStatus } from 'dialog/domain';
import { closeStatus } from 'components/DataFieldProps';
import {
  FileUtil,
  generateFile
} from 'util/FileUtil';
import { contractConditionAction } from 'admin/contract/condition/action';
import { ProjectContractVariable } from 'project_contract/util/variable';
import { Progress } from 'components/Progress';

export default function ProjectContractModalRoute() {

  const dispatch = useDispatch();
  const { error, rollback, confirm } = useDialog();
  const {
          projectId,
          modal,
          detail,
          estimate,
          basic,
          collection,
          conditionList,
          requestAdd,
          requestChange,
          requestDelete,
          detailBasedEstimate
        } = useSelector((root: RootState) => root.projectContract);
  const { list: estimateList } = useSelector((root: RootState) => root.projectEstimate);
  const onClose = useCallback(() => dispatch(projectContractAction.setModal(undefined)), [dispatch]);
  const onDelete = useCallback((id: ProjectContractId) => dispatch(projectContractAction.deleteOne(id)), [dispatch]);
  const onAdd = useCallback((params: ProjectContractParameter) => dispatch(projectContractAction.add(params)), [dispatch]);
  const onChange = useCallback((params: ProjectContractParameter) => dispatch(projectContractAction.change(params)), [dispatch]);
  const onValidateFile = useCallback((contract: ProjectContractParameter) => dispatch(projectContractAction.validateFile(contract)), [dispatch]);
  const getEstimate = useCallback((id: ProjectEstimateId | undefined) => dispatch(projectContractAction.getEstimate(id)), [dispatch]);
  const { variableList } = useSelector((root: RootState) => root.contractCondition);
  const formik = useFormik<ProjectContractParameter>({
    initialValues: initialProjectContractParameter,
    onSubmit:      (values) => {
      if (modal && values.id && modal === values.id) {
        generateFile(new FileUtil(
          values,
          (values) => {
            onChange(values as ProjectContractParameter);
          },
          null,
          'contract_template',
          'contract',
          ProjectContractVariable.list(variableList, values)
        ));
      }
      else if (modal === null || typeof modal === 'object') {
        generateFile(new FileUtil(
          values,
          (values) => {
            onAdd(values as ProjectContractParameter);
          },
          null,
          'contract_template',
          'contract',
          ProjectContractVariable.list(variableList, values)
        ));
      }
    }
  });

  useEffect(() => {
    if (!modal) {
      formik.setValues(initialProjectContractParameter);
      dispatch(contractConditionAction.requestVariableList());
    }
  }, [modal]);

  useEffect(() => {
    formik.setFieldValue('basic', basic);
  }, [basic]);

  useEffect(() => {
    formik.setFieldValue('collection', collection);
  }, [collection]);

  useEffect(() => {
    formik.setFieldValue('conditionList', conditionList);
  }, [conditionList]);

  useEffect(() => {
    formik.setFieldValue('estimate', estimate);
  }, [estimate]);

  useEffect(() => {
    if (detail) {
      formik.setValues({
        ...detail,
        estimateId: detail.estimate.id,
        edit:       false
      } as unknown as ProjectContractParameter);
      dispatch(contractConditionAction.requestVariableList());
    }
  }, [detail]);

  useEffect(() => {
    if (detailBasedEstimate) {
      formik.setValues({
        isSent:     detailBasedEstimate.isSent,
        recipient:  detailBasedEstimate.recipient,
        note:       detailBasedEstimate.note,
        estimate:   detailBasedEstimate,
        estimateId: detailBasedEstimate.id,
        edit:       true
      } as unknown as ProjectContractParameter);
    }
  }, [detailBasedEstimate]);

  useEffect(() => {
    closeStatus(requestAdd, () => {
      dispatch(projectContractAction.setModal(undefined));
      dispatch(projectContractAction.setProjectId(projectId));
    }, () => {
      formik.setSubmitting(false);
      dispatch(projectContractAction.requestAdd('idle'));
    });
  }, [requestAdd]);

  useEffect(() => {
    closeStatus(requestChange, () => {
      dispatch(projectContractAction.setModal(modal));
      dispatch(projectContractAction.setProjectId(projectId));
    }, () => {
      formik.setSubmitting(false);
      dispatch(projectContractAction.requestChange('idle'));
    });
  }, [requestChange]);

  useEffect(() => {
    closeStatus(requestDelete, () => {
      dispatch(projectContractAction.setModal(undefined));
      dispatch(projectContractAction.setProjectId(projectId));
    }, () => {
      formik.setSubmitting(false);
      dispatch(projectContractAction.requestDelete('idle'));
    });
  }, [requestDelete]);

  return (
    <>
      <FormikProvider value={formik}>
        <ProjectContractModal
          open={typeof modal !== 'undefined'}
          onClose={onClose}
          onValidateFile={onValidateFile}
          onCancel={() => {
            rollback(() => {
              if (modal === null) {
                onClose();
              }
              else if (detail) {
                formik.setValues({
                  ...detail,
                  estimateId: detail.estimate.id,
                  edit:       false
                } as unknown as ProjectContractParameter);
              }
            });
          }}
          onDelete={() => {
            if (!modal) {
              error('???????????? ???????????? ???????????????.');
              return;
            }
            confirm({
              children:     '???????????? ?????????????????????????',
              status:       DialogStatus.WARN,
              confirmText:  '??????',
              afterConfirm: () => {onDelete(modal);}
            });
          }}
          variableList={variableList}
        />
        <ProjectContractEstimateSelectModal
          list={estimateList}
          getEstimate={getEstimate}
        />
      </FormikProvider>
      <Progress />
    </>
  );
}
