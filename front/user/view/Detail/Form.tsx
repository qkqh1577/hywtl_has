import React, { useContext } from 'react';
import {
  Box,
  MenuItem
} from '@mui/material';
import {
  userRoleList,
  userRoleName
} from 'user/domain';
import DepartmentSelector from 'components/DepartmentSelector';
import { FormikContext } from 'formik';
import { ColorPalette } from 'app/view/App/theme';
import TextBox from 'layouts/Text';
import DataFieldWithLabel from 'components/DataFieldLabel';
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
            <DataFieldWithLabel required={edit} label="아이디">
              <Input
                disabled
                value={formik.values.username ?? ''}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{
            display:      'flex',
            flexWrap:     'nowrap',
            width:        '100%',
            marginBottom: '15px',
          }}>
            <DataFieldWithLabel required={edit} label="이름">
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
            <DataFieldWithLabel required={edit} label="이메일">
              <Input
                disabled={!edit}
                value={formik.values.email ?? ''}
                onChange={(e) => {
                  const value = e.target.value || undefined;
                  if (formik.values.email !== value) {
                    formik.setFieldValue('email', value);
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
            <DataFieldWithLabel required={edit} label="권한">
              <Select
                disabled={!edit}
                value={formik.values.role ?? ''}
                onChange={(e) => {
                  const value = e.target.value || undefined;
                  if (formik.values.role !== value) {
                    formik.setFieldValue('role', value);
                  }
                }}
              >
                {userRoleList.map(item => (
                  <MenuItem key={item} value={item}>{userRoleName(item)}</MenuItem>
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
            <DataFieldWithLabel required={edit} label="소속 조직">
              <DepartmentSelector
                required
                disableLabel
                name="departmentId"
                label="소속 조직"
              />
            </DataFieldWithLabel>
          </Box>
        </Box>
      </Box>
    </Box>
  );

}