import React, { useContext } from 'react';
import { Box, } from '@mui/material';
import TextField from 'components/TextField';
import {
  testTypeList,
  testTypeName
} from 'type/TestType';
import DetailList from 'admin/estimate/content/view/Detail/DetailList';
import CheckboxField from 'components/CheckboxField';
import { FormikContext, } from 'formik';
import VariableList from 'admin/estimate/content/view/Detail/VariableList';
import { EstimateContentVariableVO } from 'admin/estimate/content/domain';
import { ColorPalette } from 'app/view/App/theme';
import TextBox from 'layouts/Text';
import { Divider } from 'personnel/view/Detail/Form';

interface Props {
  variableList: EstimateContentVariableVO[] | undefined;
}

export default function Form(props: Props) {
  const formik = useContext(FormikContext);
  const edit = formik.values.edit;

  return (
    <Box sx={{
      display:        'flex',
      flexWrap:       'wrap',
      width:          '100%',
      justifyContent: 'space-between',
      alignItems:     'flex-start',
    }}>
      <Box sx={{
        display:      'flex',
        flexWrap:     'wrap',
        width:        '69%',
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
            <TextBox variant="body7">실험 정보</TextBox>
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
                required
                name="name"
                label="이름"
              />
            </Box>
            <Box sx={{
              display:      'flex',
              flexWrap:     'nowrap',
              width:        '100%',
              marginBottom: '15px',
            }}>
              <CheckboxField
                required
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
            <TextBox variant="body7">내용</TextBox>
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
      {edit && props.variableList && (
        <Box sx={{
          display:  'flex',
          width:    '30%',
          flexWrap: 'wrap',
        }}>
          <TextBox variant="body8">
            *내용으로 변수명을 입력 시, 해당 변수에 해당하는 데이터가 보여집니다
          </TextBox>
          <VariableList {...props} />
        </Box>
      )}
    </Box>
  );
};
