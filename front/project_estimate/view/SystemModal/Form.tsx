import { Box } from '@mui/material';
import React from 'react';
import { DefaultFunction } from 'type/Function';
import TopForm from 'project_estimate/view/SystemModal/TopForm';
import LeftForm from 'project_estimate/view/SystemModal/LeftForm';
import RightForm from 'project_estimate/view/SystemModal/RightForm';
import { ProjectSystemEstimateVO } from 'project_estimate/domain';
import { EstimateContentVariableVO } from 'admin/estimate/content/domain';
import { ProjectSystemEstimateParameter } from 'project_estimate/parameter';

interface Props {
  onClose: DefaultFunction;
  onCancel: DefaultFunction;
  onDelete: DefaultFunction;
  openDocumentModal: DefaultFunction<number>;
  openContractAddModal: (values: ProjectSystemEstimateVO) => void;
  variableList?: EstimateContentVariableVO[];
  onValidateFile: (estimate: ProjectSystemEstimateParameter) => void;
}

export default function ProjectSystemEstimateModalForm(props: Props) {

  return (
    <Box sx={{
      width:          '100%',
      height:         '75vh',
      display:        'flex',
      flexWrap:       'wrap',
      justifyContent: 'space-between',
      alignContent:   'flex-start'
    }}>
      <TopForm
        onCancel={props.onCancel}
        onDelete={props.onDelete}
        onContractAdd={props.openContractAddModal}
        onClose={props.onClose}
        onValidateFile={props.onValidateFile}
      />
      <Box sx={{
        width:    '100%',
        display:  'flex',
        height:   'calc(100% - 40px)',
        flexWrap: 'nowrap',
      }}>
        <LeftForm openDocumentModal={props.openDocumentModal} />
        <RightForm variableList={props.variableList}/>
      </Box>
    </Box>
  );
}
