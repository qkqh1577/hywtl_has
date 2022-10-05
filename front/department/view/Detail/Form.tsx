import React, {
  useContext,
  useEffect
} from 'react';
import {
  Box,
  MenuItem
} from '@mui/material';
import DepartmentSelector from 'components/DepartmentSelector';
import {
  departmentCategoryList,
  departmentCategoryName,
  DepartmentVO
} from 'department/domain';
import {
  FormikContext,
  FormikContextType
} from 'formik';
import { FieldStatus } from 'components/DataFieldProps';
import { ColorPalette } from 'app/view/App/theme';
import TextBox from 'layouts/Text';
import DataFieldWithLabel from 'components/DataFieldLabel';
import Input from 'layouts/Input';
import Select from 'layouts/Select';


function DepartmentParentSelector() {
  const formikContext: FormikContextType<DepartmentVO> = useContext(FormikContext);
  const status = formikContext?.values.category === 'COMPANY' ? FieldStatus.Disabled : undefined;
  const required = formikContext?.values.category !== 'COMPANY';
  const values = formikContext?.values ?? {};

  useEffect(() => {
    if (values.category === 'COMPANY') {
      formikContext.setFieldValue('parentId', '');
    }
  }, [values.category]);

  return (
    <DepartmentSelector
      name="parentId"
      label="상위 조직"
      status={status}
      required={required}
    />
  );
}

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
          <TextBox variant="body7">기본 정보</TextBox>
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
            <DataFieldWithLabel required={edit} label="조직명">
              <Input
                disabled={!edit}
                value={formik.values.name ?? ''}
                onChange={(e) => {
                  const value = e.target.value || undefined;
                  if (formik.values.name !== value) {
                    formik.setFieldValue('name', value);
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
            <DataFieldWithLabel required={edit} label="조직 유형">
              <Select
                disabled={!edit}
                value={formik.values.category ?? ''}
                onChange={(e) => {
                  const value = e.target.value || undefined;
                  if (formik.values.category !== value) {
                    formik.setFieldValue('category', value);
                  }
                }}>
                {departmentCategoryList.map((category) => (
                  <MenuItem key={category} value={category}>{departmentCategoryName(category)}</MenuItem>
                ))}
              </Select>
            </DataFieldWithLabel>
          </Box>
          <Box sx={{
            display:      'flex',
            flexWrap:     'nowrap',
            width:        '100%',
            marginBottom: '15px',
          }}>
            <DepartmentParentSelector />
          </Box>
          <Box sx={{
            display:      'flex',
            flexWrap:     'nowrap',
            width:        '100%',
            marginBottom: '15px',
          }}>
            <DataFieldWithLabel label="설명">
              <Input
                disabled={!edit}
                value={formik.values.note ?? ''}
                onChange={(e) => {
                  const value = e.target.value || undefined;
                  if (formik.values.note !== value) {
                    formik.setFieldValue('note', value);
                  }
                }}
              />
            </DataFieldWithLabel>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}