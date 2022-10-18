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
  useEffect
} from 'react';
import { projectContractAction } from 'project_contract/action';
import { ProjectContractId } from 'project_contract/domain';
import useDialog from 'components/Dialog';
import {
  initialProjectContractParameter,
  ProjectContractParameter
} from 'project_contract/parameter';
import ProjectContractEstimateSelectModal from 'project_contract/view/EstimateModal';
import { ProjectEstimateId } from 'project_estimate/domain';

export default function ProjectContractModalRoute() {

  const dispatch = useDispatch();
  const { error, rollback, alert, confirm } = useDialog();
  const { modal, detail, estimate, basic, collection, conditionList } = useSelector((root: RootState) => root.projectContract);
  const { list: estimateList } = useSelector((root: RootState) => root.projectEstimate);
  const onClose = useCallback(() => dispatch(projectContractAction.setModal(undefined)), [dispatch]);
  const onDelete = useCallback((id: ProjectContractId) => dispatch(projectContractAction.deleteOne(id)), [dispatch]);
  const onAdd = useCallback((params: ProjectContractParameter) => dispatch(projectContractAction.add(params)), [dispatch]);
  const onChange = useCallback((params: ProjectContractParameter) => dispatch(projectContractAction.change(params)), [dispatch]);
  const getEstimate = useCallback((id: ProjectEstimateId | undefined) => dispatch(projectContractAction.getEstimate(id)), [dispatch]);
  const formik = useFormik<ProjectContractParameter>({
    initialValues: initialProjectContractParameter,
    onSubmit:      (values) => {
      if (modal && values.id && modal === values.id) {
        onChange(values);
      }
      else if (modal === null) {
        onAdd(values);
      }
    }
  });

  useEffect(() => {
    if (!modal) {
      formik.setValues(initialProjectContractParameter);
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
    }

  }, [detail]);

  return (
    <FormikProvider value={formik}>
      <ProjectContractModal
        open={typeof modal !== 'undefined'}
        onClose={onClose}
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
            error('계약서가 선택되지 않았습니다.');
            return;
          }
          confirm({
            children:     '계약서를 삭제하시겠습니까?',
            status:       'warn',
            confirmText:  '삭제',
            afterConfirm: () => {onDelete(modal);}
          });
        }}
      />
      <ProjectContractEstimateSelectModal
        list={estimateList}
        getEstimate={getEstimate}
      />
    </FormikProvider>
  );
}