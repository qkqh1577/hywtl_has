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
import { ColorPalette } from 'assets/theme';
import TextBox from 'layouts/Text';
import DataFieldWithLabel from 'layouts/DataFieldLabel';
import Input from 'layouts/Input';
import Select from 'layouts/Select';

export default function () {
  const formik = useContext(FormikContext);
  const edit = formik.values.edit;
  const isNew = !formik.values.id;

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
            <DataFieldWithLabel label="아이디">
              <Input
                readOnly={true}
                placeholder={isNew?'초대 메일을 통해 설정할 수 있습니다':'수정불가'}
                key={formik.values.username}
                defaultValue={formik.values.username ?? ''}
              />
            </DataFieldWithLabel>
          </Box>
          <Box sx={{
            display:      'flex',
            flexWrap:     'nowrap',
            width:        '100%',
            marginBottom: '15px',
          }}>
            <DataFieldWithLabel required={edit || isNew} label="이름">
              <Input
                readOnly={!edit && !isNew}
                key={formik.values.name}
                defaultValue={formik.values.name ?? ''}
                onBlur={(e) => {
                  if (!edit && !isNew) {
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
            <DataFieldWithLabel required={edit || isNew} label="이메일">
              <Input
                readOnly={!edit && !isNew}
                key={formik.values.email}
                defaultValue={formik.values.email ?? ''}
                onBlur={(e) => {
                  if (!edit && !isNew) {
                    return;
                  }
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
            <DataFieldWithLabel required={edit || isNew} label="권한">
              <Select
                readOnly={!edit && !isNew}
                value={formik.values.role ?? ''}
                onChange={(e) => {
                  if (!edit && !isNew) {
                    return;
                  }
                  const value = e.target.value || undefined;
                  if (formik.values.role !== value) {
                    formik.setFieldValue('role', value);
                  }
                }}>
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
            <DataFieldWithLabel required={edit || isNew} label="소속 조직">
              <DepartmentSelector
                readOnly={!edit && !isNew}
                value={formik.values.departmentId ?? ''}
                onChange={(e) => {
                  if (!edit && !isNew) {
                    return;
                  }
                  const value = e.target.value || undefined;
                  if (formik.values.departmentId !== value) {
                    formik.setFieldValue('departmentId', value);
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
