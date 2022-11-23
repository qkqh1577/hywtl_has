import { DefaultFunction } from 'type/Function';
import React, { useContext } from 'react';
import { FormikContext, } from 'formik';
import ModalLayout from 'layouts/ModalLayout';
import ProjectSystemEstimateModalForm from 'project_estimate/view/SystemModal/Form';
import { ProjectSystemEstimateVO } from 'project_estimate/domain';
import { EstimateContentVariableVO } from 'admin/estimate/content/domain';

interface Props {
  open: boolean;
  onClose: DefaultFunction;
  onCancel: DefaultFunction;
  onDelete: DefaultFunction;
  openDocumentModal: DefaultFunction<number>;
  openContractAddModal: (values: ProjectSystemEstimateVO) => void;
  variableList?: EstimateContentVariableVO[];
}

export default function ProjectSystemEstimateModal(props: Props) {
  const formik = useContext(FormikContext);
  const edit = formik.values.edit;

  return (
    <ModalLayout
      width="95vw"
      open={props.open}
      title={formik.values.id ? (edit ? '시스템 견적서 수정' : '시스템 견적서 상세') : '시스템 견적서 등록'}
      onClose={props.onClose}
      children={
        <ProjectSystemEstimateModalForm
          onClose={props.onClose}
          onCancel={props.onCancel}
          onDelete={props.onDelete}
          openDocumentModal={props.openDocumentModal}
          openContractAddModal = {props.openContractAddModal}
          variableList={props.variableList}
        />
      }
    />
  );

}
