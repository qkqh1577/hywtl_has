import React, { useContext } from 'react';
import {
  Box,
  MenuItem
} from '@mui/material';
import DepartmentSelector from 'components/DepartmentSelector';
import {
  DepartmentCategory,
  departmentCategoryList,
  departmentCategoryName,
} from 'department/domain';
import { FormikContext } from 'formik';
import { ColorPalette } from 'assets/theme';
import TextBox from 'layouts/Text';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';
import Select from 'layouts/Select';

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
                readOnly={!edit}
                key={formik.values.name}
                defaultValue={formik.values.name ?? ''}
                onBlur={(e) => {
                  if (!edit) {
                    return;
                  }
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
                readOnly={!edit}
                value={formik.values.category ?? ''}
                onChange={(e) => {
                  if (!edit) {
                    return;
                  }
                  const value = e.target.value || undefined;
                  if (formik.values.category !== value) {
                    formik.setFieldValue('category', value);
                    if (value === DepartmentCategory.COMPANY) {
                      formik.setFieldValue('parentId', '');
                    }
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
            <DataFieldWithLabel required={edit && formik.values.category !== DepartmentCategory.COMPANY} label="상위 조직">
              <DepartmentSelector
                readOnly={!edit}
                disabled={!DepartmentCategory.COMPANY}
                value={formik.values.parentId ?? ''}
                onChange={(e) => {
                  if (!edit) {
                    return;
                  }
                  const value = e.target.value || undefined;
                  if (formik.values.parentId !== value) {
                    formik.setFieldValue('parentId', value);
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
            <DataFieldWithLabel label="설명">
              <Input
                readOnly={!edit}
                key={formik.values.note}
                defaultValue={formik.values.note ?? ''}
                onBlur={(e) => {
                  if (!edit) {
                    return;
                  }
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