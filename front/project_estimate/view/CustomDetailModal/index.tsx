import React, { useContext } from 'react';
import ModalLayout from 'layouts/ModalLayout';
import { DefaultFunction } from 'type/Function';
import DetailFooter from 'project_estimate/view/CustomDetailModal/DetailFooter';
import { Box } from '@mui/material';
import SelectField from 'components/SelectField';
import TextField from 'components/TextField';
import BusinessSelector from 'components/BusinessSelector';
import UploadField from 'components/UploadField';
import { FieldStatus } from 'components/DataFieldProps';
import { FormikContext } from 'formik';
import { ProjectEstimateId } from 'project_estimate/domain';

interface Props {
  open: boolean;
  onClose: DefaultFunction;
  onChangeCancel: DefaultFunction<ProjectEstimateId>;
}

export default function ProjectCustomEstimateDetailModal(props: Props) {

  const { onClose, onChangeCancel, open } = props;
  const formik = useContext(FormikContext);
  const edit = formik.values.edit === true;

  return (
    <ModalLayout
      width="30vw"
      open={open}
      title={edit ? '커스텀 견적서 수정' : '커스텀 견적서 상세'}
      onClose={onClose}
      footer={
        <DetailFooter onClose={onClose} onChangeCancel={onChangeCancel} />
      }
    >
      <Box sx={{
        width:          '100%',
        display:        'flex',
        flexWrap:       'wrap',
        justifyContent: 'space-between'
      }}>
        <Box sx={{
          width:    '40%',
          display:  'flex',
          flexWrap: 'nowrap',
        }}>
          <TextField
            labelPosition="top"
            status={edit ? FieldStatus.Disabled : FieldStatus.ReadOnly}
            name="typeName"
            label="견적 구분"
          />
        </Box>
        <Box sx={{
          width:    '40%',
          display:  'flex',
          flexWrap: 'nowrap',
        }}>
          <TextField
            labelPosition="top"
            status={edit ? FieldStatus.Disabled : FieldStatus.ReadOnly}
            name="code"
            label="견적 번호"
          />
        </Box>
        <Box sx={{
          width:    '40%',
          display:  'flex',
          flexWrap: 'nowrap',
        }}>
          <SelectField
            required
            status={edit ? undefined : FieldStatus.ReadOnly}
            name="isSentSelect"
            label="송부 여부"
            labelPosition="top"
            options={['Y', 'N']}
            onChange={(e) => {
              if (edit) {
                const value = e.target.value;
                if (value === 'Y') {
                  formik.setFieldValue('isSent', true);
                }
                else {
                  formik.setFieldValue('isSent', false);
                }
              }
            }}
          />
        </Box>
        <Box sx={{
          width:    '40%',
          display:  'flex',
          flexWrap: 'nowrap',
        }}>
          <TextField
            labelPosition="top"
            status={edit ? FieldStatus.Disabled : FieldStatus.ReadOnly}
            name="isFinal"
            label="최종 여부"
          />
        </Box>
        <Box sx={{
          width:    '40%',
          display:  'flex',
          flexWrap: 'nowrap',
        }}>
          <TextField
            name="recipient"
            label="송신처"
            labelPosition="top"
          />
        </Box>
        <Box sx={{
          width:    '40%',
          display:  'flex',
          flexWrap: 'nowrap',
        }}>
          <BusinessSelector
            required
            allowMyBusiness
            name="business"
            label="견적 업체"
            labelPosition="top"
          />
        </Box>
        <Box sx={{
          width:    '90%',
          display:  'flex',
          flexWrap: 'nowrap',
        }}>
          <TextField
            name="note"
            label="비고"
            labelPosition="top"
          />
        </Box>
        <Box sx={{
          width:    '90%',
          display:  'flex',
          flexWrap: 'nowrap',
        }}>
          <UploadField
            name="file"
            status={edit ? undefined : FieldStatus.ReadOnly}
            label="파일"
            labelPosition="top"
          />
        </Box>
      </Box>
    </ModalLayout>
  );
}