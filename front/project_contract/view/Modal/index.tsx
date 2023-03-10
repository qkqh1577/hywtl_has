import ModalLayout from 'layouts/ModalLayout';
import { DefaultFunction } from 'type/Function';
import React, { useContext } from 'react';
import { FormikContext } from 'formik';
import { Box } from '@mui/material';
import Top from './Top';
import Left from './Left';
import Right from './Right';
import { ContractConditionVariableVO } from 'admin/contract/condition/domain';
import { ProjectContractParameter } from 'project_contract/parameter';

interface Props {
  open: boolean;
  onClose: DefaultFunction;
  onCancel: DefaultFunction;
  onDelete: DefaultFunction;
  variableList?: ContractConditionVariableVO[];
  onValidateFile: (contract: ProjectContractParameter) => void
}

export default function ProjectContractModal(props: Props) {

  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  const id = formik.values.id;
  return (
    <ModalLayout
      title={edit ? (id ? '계약서 수정' : '계약서 등록') : '계약서 상세'}
      width="90vw"
      open={props.open}
      onClose={props.onClose}
    >
      <Box sx={{
        width:    '100%',
        display:  'flex',
        flexWrap: 'wrap',
      }}>
        <Top
          onCancel={props.onCancel}
          onDelete={props.onDelete}
          onValidateFile={props.onValidateFile}
        />
        <Left />
        <Right variableList={props.variableList}/>
      </Box>
    </ModalLayout>
  );
}
