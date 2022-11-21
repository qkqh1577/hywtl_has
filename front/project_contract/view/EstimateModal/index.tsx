import ModalLayout from 'layouts/ModalLayout';
import { Box } from '@mui/material';
import React, {
  useContext,
  useEffect,
  useState
} from 'react';
import Button from 'layouts/Button';
import {
  ProjectEstimateId,
  ProjectEstimateShortVO,
} from 'project_estimate/domain';
import Form from './Form';
import { FormikContext } from 'formik';

interface Props {
  list: ProjectEstimateShortVO[] | undefined;
  getEstimate: (id: ProjectEstimateId | undefined) => void;
}

export default function ProjectContractEstimateSelectModal(props: Props) {
  const formik = useContext(FormikContext);
  const open = formik.values.openEstimateModal || false;
  const onClose = () => {
    formik.setFieldValue('openEstimateModal', false);
  };

  const [estimateId, setEstimateId] = useState<ProjectEstimateId>();

  useEffect(() => {
    if (open) {
      setEstimateId(formik.values.estimateId);
    }
  }, [open]);

  return (
    <ModalLayout
      width="60vw"
      open={open}
      title="견적서 선택"
      onClose={onClose}
      children={
        <Form
          list={props.list}
          estimateId={estimateId}
          setEstimateId={setEstimateId}
        />
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
            disabled={!props.list || props.list.length === 0}
            sx={{
              marginRight: '10px',
            }}
            onClick={() => {
              formik.setFieldValue('estimateId', estimateId);
              props.getEstimate(estimateId);
              onClose();
            }}>
            저장
          </Button>
          <Button shape="basic2" onClick={onClose}>
            취소
          </Button>
        </Box>
      }
    />
  );
}
