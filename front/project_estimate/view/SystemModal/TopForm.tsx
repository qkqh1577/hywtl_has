import { Box } from '@mui/material';
import { ColorPalette } from 'assets/theme';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';
import Button from 'layouts/Button';
import React, { useContext } from 'react';
import { FormikContext, } from 'formik';
import { DefaultFunction } from 'type/Function';
import { ProjectSystemEstimateVO } from 'project_estimate/domain';
import { ProjectSystemEstimateParameter } from 'project_estimate/parameter';

interface Props {
  onCancel: DefaultFunction;
  onDelete: DefaultFunction;
  onContractAdd: (values: ProjectSystemEstimateVO) => void;
  onClose: DefaultFunction;
  onValidateFile: (estimate: ProjectSystemEstimateParameter) => void;
}

export default function ProjectSystemEstimateModalTopForm(props: Props) {

  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  const isDetail = !edit && formik.values.id;

  return (
    <Box
      sx={{
        width:          '100%',
        display:        'flex',
        flexWrap:       'nowrap',
        justifyContent: isDetail ? 'space-between' : 'flex-end',
        height:         '50px',
        paddingBottom:  '10px',
        borderBottom:   `1px solid ${ColorPalette._e4e9f2}`
      }}>
      {isDetail && (
        <Box sx={{
          display:        'flex',
          flexWrap:       'nowrap',
          width:          '60%',
          justifyContent: 'space-between',
          alignItems:     'center',
        }}>
          <Box sx={{ width: '30%' }}>
            <DataFieldWithLabel label="견적 구분">
              <Input
                disabled
                defaultValue="시스템"
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{ width: '30%' }}>
            <DataFieldWithLabel label="견적 번호">
              <Input
                disabled
                value={formik.values.code ?? ''}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{ width: '30%' }}>
            <DataFieldWithLabel label="확정 여부">
              <Input
                disabled
                value={formik.values.confirmed ? 'Y' : 'N'}
              />
            </DataFieldWithLabel>
          </Box>
        </Box>
      )}
      <Box sx={{
        display:                      'flex',
        justifyContent:               'flex-end',
        alignItems:                   'center',
        '&> button:not(:last-child)': {
          marginRight: '10px',
        }
      }}>
        {edit && (
          <Button onClick={() => {
            formik.handleSubmit();
          }}>
            저장
          </Button>
        )}
        {edit && (
          <Button shape="basic2" onClick={props.onCancel}>취소</Button>
        )}
        {isDetail && (
          <Button shape="basic3" onClick={props.onDelete}>삭제</Button>
        )}
        {isDetail && (
          <Button shape="basic3" onClick={() => {
            formik.setFieldValue('edit', true);
          }}>
            수정
          </Button>
        )}
        {isDetail && (
          <Button onClick={() => {
            props.onValidateFile(formik.values);
          }}>
            PDF 다운로드
          </Button>
        )}
        {isDetail && (
          <Button
            shape="basic4"
            onClick={() => {
              props.onContractAdd(formik.values);
              props.onClose();
            }}
          >
            계약서 등록
          </Button>
        )}
      </Box>
    </Box>
  );
}
