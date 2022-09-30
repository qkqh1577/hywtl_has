import { Box, } from '@mui/material';
import React, { useContext } from 'react';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import {
  testTypeList,
  testTypeName
} from 'admin/estimate/template/domain';
import DetailList from './DetailList';
import { ColorPalette } from 'app/view/App/theme';
import TextBox from 'layouts/Text';
import { Divider } from 'personnel/view/Detail/Form';
import { FormikContext } from 'formik';
import { FieldStatus } from 'components/DataFieldProps';

export default function () {

  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  return (
    <Box sx={{
      display:      'flex',
      flexWrap:     'wrap',
      width:        '100%',
      padding:      '30px',
      border:       `1px solid ${ColorPalette._e4e9f2}`,
      borderRadius: '5px',
    }}>
      <Box sx={{
        display:  'flex',
        flexWrap: 'nowrap',
        width:    '100%',
        margin:   '10px 0px',
        padding:  '10px',
      }}>
        <Box sx={{
          display:        'flex',
          flexWrap:       'nowrap',
          width:          '13%',
          justifyContent: 'flex-start',
          alignItems:     'flex-start'
        }}>
          <TextBox variant="body7">항목 정보</TextBox>
        </Box>
        <Box sx={{
          display:        'flex',
          flexWrap:       'wrap',
          width:          '80%',
          justifyContent: 'flex-start',
          alignItems:     'flex-start'
        }}>
          <Box sx={{
            display:      'flex',
            flexWrap:     'nowrap',
            width:        '100%',
            marginBottom: '15px',
          }}>
            <TextField
              required={edit}
              name="title"
              label="용역 항목"
              status={edit ? undefined : FieldStatus.ReadOnly}
            />
          </Box>
          <Box sx={{
            display:      'flex',
            flexWrap:     'nowrap',
            width:        '100%',
            marginBottom: '15px',
          }}>
            <SelectField
              required={edit}
              status={edit ? undefined : FieldStatus.ReadOnly}
              name="testType"
              label="실험 타입"
              options={testTypeList.map((item) => ({
                key:  item as string,
                text: testTypeName(item)
              }))}
            />
          </Box>
        </Box>
      </Box>

      <Divider />

      <Box sx={{
        display:  'flex',
        flexWrap: 'nowrap',
        width:    '100%',
        margin:   '10px 0px',
        padding:  '10px',
      }}>
        <Box sx={{
          display:        'flex',
          flexWrap:       'nowrap',
          width:          '13%',
          justifyContent: 'flex-start',
          alignItems:     'flex-start'
        }}>
          <TextBox variant="body7">세부 항목</TextBox>
        </Box>
        <Box sx={{
          display:        'flex',
          flexWrap:       'wrap',
          width:          '80%',
          justifyContent: 'flex-start',
          alignItems:     'flex-start'
        }}>
          <DetailList />
        </Box>
      </Box>
    </Box>
  );
}