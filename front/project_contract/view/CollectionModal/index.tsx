import React, { useContext } from 'react';
import ModalLayout from 'layouts/ModalLayout';
import ProjectFinalContractCollectionForm from 'project_contract/view/CollectionModal/Form';
import { DefaultFunction } from 'type/Function';
import { ProjectFinalContractVO } from 'project_contract/domain';
import { Box } from '@mui/material';
import Button from 'layouts/Button';
import { FormikContext } from 'formik';

interface Props {
  open: boolean;
  onClose: DefaultFunction;
  finalContract?: ProjectFinalContractVO;
}

export default function ProjectFinalContractCollectionModal(props: Props) {
  const formik = useContext(FormikContext);
  return (
    <ModalLayout
      title={'최종 기성 단계 등록'}
      width="50vw"
      open={props.open}
      onClose={props.onClose}
      children={<ProjectFinalContractCollectionForm
        finalContract={props.finalContract}
      />}
      footer={
        <Box sx={{
          width:          '100%',
          margin:         '20px 0',
          display:        'flex',
          justifyContent: 'center',
          alignItems:     'center',
        }}>
          <Button
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

