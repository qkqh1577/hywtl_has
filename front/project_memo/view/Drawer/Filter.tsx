import {
  Box,
  MenuItem,
} from '@mui/material';
import {
  projectMemoCategoryList,
  projectMemoCategoryName
} from 'project_memo/domain';
import React, {
  useContext,
  useEffect
} from 'react';
import Select from 'layouts/Select';
import Input from 'layouts/Input';
import { FormikContext } from 'formik';

export default function ProjectMemoDrawerFilter() {
  const formik = useContext(FormikContext);

  useEffect(() => {
    formik.handleSubmit();
  }, [formik.values.keyword]);

  return (
    <Box sx={{
      width:          '100%',
      padding:        '0 10px',
      display:        'flex',
      justifyContent: 'space-between',
      flexWrap:       'unwrap',
      flex:           1,
      alignItems:     'center',
    }}>
      <Box sx={{
        display:     'flex',
        width:       '120px',
        marginRight: '10px',
      }}>
        <Select
          variant="outlined"
          value={formik.values.category ?? ''}
          onChange={(e) => {
            const value = e.target.value || undefined;
            if (formik.values.category !== value) {
              formik.setFieldValue('category', value);
            }
          }}>
          {projectMemoCategoryList.map(item => (
            <MenuItem key={item} value={item}>
              {projectMemoCategoryName(item)}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Input
        key={formik.values.keyword}
        defaultValue={formik.values.keyword ?? ''}
        variant="outlined"
        placeholder="검색어 입력 후 엔터"
        onKeyDown={(e) => {
          if (e.key.toLowerCase() === 'enter') {
            const value = (e.target as HTMLInputElement).value || undefined;
            if (formik.values.keyword !== value) {
              formik.setFieldValue('keyword', value);
            }
          }
        }}
      />
    </Box>
  );
}