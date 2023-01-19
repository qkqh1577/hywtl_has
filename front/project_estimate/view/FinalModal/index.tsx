import ModalLayout from 'layouts/ModalLayout';
import { DefaultFunction } from 'type/Function';
import { Box } from '@mui/material';
import React, { useContext } from 'react';
import Button from 'layouts/Button';
import { FormikContext } from 'formik';
import { ProjectEstimateVO } from 'project_estimate/domain';
import ProjectEstimateFinalModalForm from 'project_estimate/view/FinalModal/Form';

interface Props {
  open: boolean;
  onClose: DefaultFunction;
  list: ProjectEstimateVO[] | undefined;
}

export default function ProjectEstimateFinalModal(props: Props) {
  const formik = useContext(FormikContext);
  return (
    <ModalLayout
      width="55vw"
      open={props.open}
      title="견적서 확정 여부 선택"
      onClose={props.onClose}
      children={
        <ProjectEstimateFinalModalForm list={props.list} />
      }
      footer={
        <Box sx={{
          width:          '100%',
          margin:         '20px 0',
          display:        'flex',
          justifyContent: 'center',
          alignItems:     'center',
        }}>
          <Button
            disabled={!formik.values.idList || !props.list || props.list.length === 0}
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
