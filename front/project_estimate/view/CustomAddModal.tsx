import React from 'react';
import ModalLayout from 'layouts/ModalLayout';
import {
  ProjectEstimateType,
  projectEstimateTypeName
} from 'project_estimate/domain';
import DetailFormFooter from 'layouts/DetailFormFooter';
import { FormikLayoutProps } from 'layouts/PageLayout';
import { Box } from '@mui/material';
import { FormikProvider } from 'formik';
import SelectField from 'components/SelectField';
import { DefaultFunction } from 'type/Function';

interface Props
  extends FormikLayoutProps<any> {
  onClose: DefaultFunction;
}

export default function ProjectCustomEstimateAddModal(props: Props) {
  const { formik, onClose } = props;
  const type: ProjectEstimateType | '' | undefined = formik.values.type;
  const open = typeof type !== 'undefined' && type !== '';

  return (
    <ModalLayout
      width="25vw"
      open={open}
      title={`${open ? projectEstimateTypeName(type!) : ''} 견적서 등록`}
      onClose={onClose}
      children={
        <FormikProvider value={formik}>
          <Box sx={{
            width:    '100%',
            display:  'flex',
            flexWrap: 'wrap',
          }}>
            <Box sx={{
              width:        '100%',
              paddingRight: '50%',
              display:      'flex',
              flexWrap:     'nowrap',
            }}>
              <SelectField
                name="isSentSelect"
                label="송부 여부"
                options={['Y', 'N']}
                onChange={() => {
                  const value = formik.values.isSentSelect;
                  if (value === 'Y') {
                    formik.setFieldValue('isSent', true);
                  }
                  else {
                    formik.setFieldValue('isSent', false);
                  }
                }}
              />
            </Box>
            <Box sx={{
              width:    '100%',
              display:  'flex',
              flexWrap: 'nowrap',
            }}>

            </Box>
          </Box>
        </FormikProvider>
      }
      footer={
        <DetailFormFooter
          onSubmit={() => {
            formik.handleSubmit();
          }}
          onClose={onClose}
        />
      }
    />
  );
}