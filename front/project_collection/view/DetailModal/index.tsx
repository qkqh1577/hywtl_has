import { DefaultFunction } from 'type/Function';
import ModalLayout from 'layouts/ModalLayout';
import React, { useContext } from 'react';
import { Box } from '@mui/material';
import Footer from './Footer';
import Form from './Form';
import Version from './Version';
import Status from './Status';
import { FormikContext } from 'formik';
import { ProjectCollectionStageVersionVO } from 'project_collection/domain';


interface Props {
  open: boolean;
  onClose: DefaultFunction;
  onDelete: DefaultFunction;
  onCancel: DefaultFunction;
  totalAmount: number | undefined;
  versionList: ProjectCollectionStageVersionVO[] | undefined;
}

export default function ProjectCollectionStageDetailModal(props: Props) {
  const formik = useContext(FormikContext);
  const edit = formik.values.edit;

  return (
    <ModalLayout
      open={props.open}
      title="기성 단계 상세"
      width="60vw"
      onClose={props.onClose}
      children={
        <Box sx={{
          width:    '100%',
          display:  'flex',
          flexWrap: 'wrap',
        }}>
          <Form totalAmount={props.totalAmount} />
          {!edit && (
            <Version
              versionList={props.versionList}
              totalAmount={props.totalAmount}
            />
          )}
          <Status />
        </Box>
      }
      footer={
        <Footer
          onDelete={props.onDelete}
          onCancel={props.onCancel}
          onClose={props.onClose}
        />
      }
    />
  );
}