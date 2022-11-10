import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import React, { useContext } from 'react';
import {
  TestType,
  testTypeName
} from 'type/TestType';
import DetailList from './DetailList';
import { ColorPalette } from 'assets/theme';
import TextBox from 'layouts/Text';
import Divider from 'layouts/Divider';
import { FormikContext } from 'formik';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';

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
            <DataFieldWithLabel label="용역 항목" required={edit}>
              <Input
                readOnly={!edit}
                key={formik.values.title}
                defaultValue={formik.values.title ?? ''}
                onBlur={(e) => {
                  if (!edit) {
                    return;
                  }
                  const value = e.target.value || undefined;
                  if (formik.values.title !== value) {
                    formik.setFieldValue('title', value);
                  }
                }}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{
            display:      'flex',
            flexWrap:     'nowrap',
            width:        '100%',
            marginBottom: '15px',
          }}>
            <DataFieldWithLabel label="실험 타입" required={edit}>
              <RadioGroup
                row
                value={formik.values.testType ?? ''}
                defaultValue={TestType.COMMON}
                onChange={(e) => {
                  if (!edit) {
                    return;
                  }
                  const value = e.target.value || undefined;
                  if (formik.values.testType !== value) {
                    formik.setFieldValue('testType', value);
                  }
                }}
              >
                <FormControlLabel
                  label={testTypeName(TestType.COMMON)}
                  value={TestType.COMMON}
                  control={
                    <Radio/>
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
                  value={TestType.REVIEW}
                  control={
                    <Radio/>
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
                  value={TestType.F}
                  control={
                    <Radio/>
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
                  value={TestType.P}
                  control={
                    <Radio/>
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
                  value={TestType.A}
                  control={
                    <Radio/>
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
                  value={TestType.E}
                  control={
                    <Radio/>
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
              </RadioGroup>
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
