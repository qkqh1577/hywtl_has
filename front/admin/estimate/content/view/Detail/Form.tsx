import React, { useContext } from 'react';
import {
  Box,
  FormControlLabel,
  FormGroup,
} from '@mui/material';
import TextField from 'components/TextField';
import {
  TestType,
  testTypeList,
  testTypeName
} from 'type/TestType';
import DetailList from 'admin/estimate/content/view/Detail/DetailList';
import { FormikContext, } from 'formik';
import VariableList from 'admin/estimate/content/view/Detail/VariableList';
import { EstimateContentVariableVO } from 'admin/estimate/content/domain';
import { ColorPalette } from 'app/view/App/theme';
import TextBox from 'layouts/Text';
import Divider from 'layouts/Divider';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Checkbox from 'layouts/Checkbox';
import { initialEstimateContentParameter } from 'admin/estimate/content/parameter';

interface Props {
  variableList: EstimateContentVariableVO[] | undefined;
}

export default function Form(props: Props) {
  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  const testTypeList = formik.values.testTypeList ?? initialEstimateContentParameter.testTypeList;

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
              <DataFieldWithLabel label="실험 타입">
                <FormGroup row>
                  <FormControlLabel
                    label={testTypeName(TestType.COMMON)}
                    control={
                      <Checkbox
                        disabled
                        checked={testTypeList.includes(TestType.COMMON)}
                        defaultValue={TestType.COMMON}
                      />
                    }
                    sx={{
                      marginRight:                   '20px',
                      alignItems:                    'center',
                      '& > span.MuiTypography-root': {
                        marginLeft: '6px',
                        fontWeight: 'normal',
                        fontSize:   '13px',
                        lineHeight: '20px',
                        color:      ColorPalette._252627,
                      }
                    }}
                  />
                  <FormControlLabel

                    label={testTypeName(TestType.REVIEW)}
                    control={
                      <Checkbox
                        disabled
                        checked={testTypeList.includes(TestType.REVIEW)}
                        defaultValue={TestType.REVIEW}
                      />
                    }
                    sx={{
                      marginRight:                   '20px',
                      alignItems:                    'center',
                      '& > span.MuiTypography-root': {
                        marginLeft: '6px',
                        fontWeight: 'normal',
                        fontSize:   '13px',
                        lineHeight: '20px',
                        color:      ColorPalette._252627,
                      }
                    }}
                  />
                  <FormControlLabel
                    label={testTypeName(TestType.F)}
                    control={
                      <Checkbox
                        disabled={!edit}
                        defaultValue={TestType.F}
                        checked={testTypeList.includes(TestType.F)}
                        onChange={() => {
                          if (testTypeList.includes(TestType.F)) {
                            formik.setFieldValue('testTypeList', testTypeList.filter(t => t !== TestType.F));
                          }
                          else {
                            formik.setFieldValue('testTypeList', [...testTypeList, TestType.F]);
                          }
                        }}
                      />
                    }
                    sx={{
                      marginRight:                   '20px',
                      alignItems:                    'center',
                      '& > span.MuiTypography-root': {
                        marginLeft: '6px',
                        fontWeight: 'normal',
                        fontSize:   '13px',
                        lineHeight: '20px',
                        color:      ColorPalette._252627,
                      }
                    }}
                  />
                  <FormControlLabel
                    label={testTypeName(TestType.P)}
                    control={
                      <Checkbox
                        disabled={!edit}
                        defaultValue={TestType.P}
                        checked={testTypeList.includes(TestType.P)}
                        onChange={() => {
                          if (testTypeList.includes(TestType.P)) {
                            formik.setFieldValue('testTypeList', testTypeList.filter(t => t !== TestType.P));
                          }
                          else {
                            formik.setFieldValue('testTypeList', [...testTypeList, TestType.P]);
                          }
                        }}
                      />
                    }
                    sx={{
                      marginRight:                   '20px',
                      alignItems:                    'center',
                      '& > span.MuiTypography-root': {
                        marginLeft: '6px',
                        fontWeight: 'normal',
                        fontSize:   '13px',
                        lineHeight: '20px',
                        color:      ColorPalette._252627,
                      }
                    }}
                  />
                  <FormControlLabel
                    label={testTypeName(TestType.A)}
                    control={
                      <Checkbox
                        disabled={!edit}
                        defaultValue={TestType.A}
                        checked={testTypeList.includes(TestType.A)}
                        onChange={() => {
                          if (testTypeList.includes(TestType.A)) {
                            formik.setFieldValue('testTypeList', testTypeList.filter(t => t !== TestType.A));
                          }
                          else {
                            formik.setFieldValue('testTypeList', [...testTypeList, TestType.A]);
                          }
                        }}
                      />
                    }
                    sx={{
                      marginRight:                   '20px',
                      alignItems:                    'center',
                      '& > span.MuiTypography-root': {
                        marginLeft: '6px',
                        fontWeight: 'normal',
                        fontSize:   '13px',
                        lineHeight: '20px',
                        color:      ColorPalette._252627,
                      }
                    }}
                  />
                  <FormControlLabel
                    label={testTypeName(TestType.E)}
                    control={
                      <Checkbox
                        disabled={!edit}
                        defaultValue={TestType.E}
                        checked={testTypeList.includes(TestType.E)}
                        onChange={() => {
                          if (testTypeList.includes(TestType.E)) {
                            formik.setFieldValue('testTypeList', testTypeList.filter(t => t !== TestType.E));
                          }
                          else {
                            formik.setFieldValue('testTypeList', [...testTypeList, TestType.E]);
                          }
                        }}
                      />
                    }
                    sx={{
                      marginRight:                   '20px',
                      alignItems:                    'center',
                      '& > span.MuiTypography-root': {
                        marginLeft: '6px',
                        fontWeight: 'normal',
                        fontSize:   '13px',
                        lineHeight: '20px',
                        color:      ColorPalette._252627,
                      }
                    }}
                  />
                </FormGroup>
              </DataFieldWithLabel>
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
