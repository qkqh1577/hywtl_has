import ModalLayout from 'layouts/ModalLayout';
import { DefaultFunction } from 'type/Function';
import React, { useContext } from 'react';
import { FormikContext } from 'formik';
import { Box } from '@mui/material';
import Button from 'layouts/Button';
import { ProjectContractShortVO } from 'project_contract/domain';
import ProjectContractFinalModalForm from 'project_contract/view/FinalModal/Form';

interface Props {
  open: boolean;
  onClose: DefaultFunction;
  list: ProjectContractShortVO[] | undefined;
}

export default function ProjectContractFinalModal(props: Props) {

  const formik = useContext(FormikContext);

  return (
    <ModalLayout
      title="계약서 최종 선택"
      open={props.open}
      onClose={props.onClose}
      children={<ProjectContractFinalModalForm list={props.list} />}
      footer={
        <Box sx={{
          width:          '100%',
          margin:         '20px 0',
          display:        'flex',
          justifyContent: 'center',
          alignItems:     'center',
        }}>
          <Button
            disabled={!formik.values.id || !props.list || props.list.length === 0}
            sx={{
              marginRight: '10px',
            }}
            onClick={() => {
              formik.handleSubmit();
            }}>
            저장
          </Button>
          <Button shape="basic2" onClick={props.onClose}>
            취소
          </Button>
        </Box>
      }
    />
  );
}